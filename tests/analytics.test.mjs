import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

function transpile(file, extra = {}) {
  return ts.transpileModule(readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, ...extra },
  }).outputText;
}

const code = transpile('lib/analytics.ts');

function setup(id = 'G-TEST123456') {
  const context = { exports: {}, window: {}, process: { env: { NEXT_PUBLIC_GA_ID: id } } };
  vm.runInNewContext(code, context);
  return context;
}

/** Simuliert document.cookie: Lesen liefert "a=1; b=2", Schreiben mit Max-Age=0 löscht. */
function cookieDokument(host, namen) {
  const vorhanden = new Set(namen);
  const geschrieben = [];
  const document = {
    get cookie() { return [...vorhanden].map((n) => `${n}=1`).join('; '); },
    set cookie(wert) {
      geschrieben.push(wert);
      if (/Max-Age=0/.test(wert)) vorhanden.delete(wert.split('=')[0]);
    },
  };
  return { document, vorhanden, geschrieben, window: { location: { hostname: host } } };
}

/** Rendert components/GoogleTag.tsx mit einem React-Stub und liefert die Elemente. */
function googleTag(id) {
  const einwilligung = { exports: {} };
  vm.runInNewContext(transpile('lib/einwilligung.ts'), { exports: einwilligung.exports });
  const React = {
    Fragment: 'Fragment',
    createElement: (type, props, ...children) => ({ type, props: props ?? {}, children }),
  };
  const context = {
    exports: {},
    React,
    process: { env: { NEXT_PUBLIC_GA_ID: id } },
    require: (name) => {
      if (name === '@/lib/einwilligung') return einwilligung.exports;
      throw new Error(`unerwarteter Import ${name}`);
    },
  };
  vm.runInNewContext(transpile('components/GoogleTag.tsx', { jsx: ts.JsxEmit.React }), context);
  return { baum: context.exports.default(), schluessel: einwilligung.exports.SPEICHERSCHLUESSEL };
}

/** Führt das Inline-Skript aus und liefert die Befehle in dataLayer. */
function inlineAusfuehren(skript, gespeichert) {
  const speicher = gespeichert === 'gesperrt'
    ? { getItem() { throw new Error('gesperrt'); } }
    : { getItem: (k) => gespeichert?.[k] ?? null };
  const fenster = { localStorage: speicher, Date };
  fenster.window = fenster;
  vm.runInNewContext(skript, fenster);
  // JSON-Umweg: Objekte aus dem vm-Kontext haben fremde Prototypen.
  return JSON.parse(JSON.stringify(fenster.dataLayer.map((eintrag) => Array.from(eintrag))));
}

test('Consent commands use the Arguments format accepted by gtag.js', () => {
  const c = setup();
  c.exports.googleBefehl('consent', 'default', { analytics_storage: 'denied' });
  const command = c.window.dataLayer[0];
  assert.equal(Object.prototype.toString.call(command), '[object Arguments]');
  assert.equal(command[0], 'consent');
  assert.equal(command[2].analytics_storage, 'denied');
});

test('A lead carries only the explicit non-personal parameters', () => {
  const c = setup();
  c.exports.messeKontaktanfrage('wohnungen');
  assert.equal(c.window.dataLayer.length, 1);
  const event = Array.from(c.window.dataLayer[0]);
  assert.equal(event[0], 'event');
  assert.equal(event[1], 'generate_lead');
  assert.deepEqual(JSON.parse(JSON.stringify(event[2])), {
    send_to: 'G-TEST123456', form_name: 'kontaktformular', form_source: 'wohnungen',
  });
});

test('Consent mode: the lead is queued with and without consent; consent only governs cookies', () => {
  // Ohne Zustimmung geht das Ereignis als cookieloses Signal raus. Der frühere
  // Schalter ga-disable-<ID> würde auch diese Signale verhindern und wird
  // daher nicht mehr ausgewertet.
  const c = setup();
  c.window['ga-disable-G-TEST123456'] = true;
  c.exports.messeKontaktanfrage('startseite');
  c.window['ga-disable-G-TEST123456'] = false;
  c.exports.messeKontaktanfrage('wohnungen');
  assert.equal(c.window.dataLayer.length, 2);
  assert.ok(c.window.dataLayer.every((e) => e[0] === 'event' && e[1] === 'generate_lead'));
});

test('Missing measurement ID and server rendering produce no event', () => {
  const c = setup('');
  c.exports.messeKontaktanfrage('wohnungen');
  assert.equal(c.window.dataLayer, undefined);
  delete c.window;
  assert.doesNotThrow(() => c.exports.messeKontaktanfrage('wohnungen'));
  assert.doesNotThrow(() => c.exports.googleBefehl('consent', 'default', {}));
  assert.doesNotThrow(() => c.exports.analyseCookiesLoeschen());
});

test('Meta lead goes only to a loaded pixel and without form contents', () => {
  const c = setup('');
  c.exports.messeKontaktanfrage('wohnungen');
  const calls = [];
  c.window.fbq = (...args) => calls.push(args);
  c.exports.messeKontaktanfrage('wohnungen');
  assert.equal(calls.length, 1);
  assert.deepEqual(JSON.parse(JSON.stringify(calls[0])), [
    'track', 'Lead', { content_name: 'kontaktformular', content_category: 'wohnungen' },
  ]);
});

test('Revocation deletes _ga and _ga_<ID> on the host and its parent domains only', () => {
  const c = setup();
  const d = cookieDokument('www.saegihof-therwil.ch', ['_ga', '_ga_TEST123456', '_fbp', 'andere']);
  c.document = d.document;
  c.window = d.window;
  c.exports.analyseCookiesLoeschen();
  assert.deepEqual([...d.vorhanden].sort(), ['_fbp', 'andere']);
  assert.ok(d.geschrieben.includes('_ga=; Max-Age=0; path=/; domain=.saegihof-therwil.ch'));
  assert.ok(d.geschrieben.includes('_ga_TEST123456=; Max-Age=0; path=/; domain=.www.saegihof-therwil.ch'));
  assert.ok(!d.geschrieben.some((w) => w.includes('domain=.ch')));
});

test('Without a measurement ID the Google tag is not rendered (previews, local)', () => {
  assert.equal(googleTag('').baum, null);
  assert.equal(googleTag(undefined).baum, null);
});

test('Google tag: gtag.js plus consent default before config, ads always denied', () => {
  const { baum, schluessel } = googleTag('G-TEST123456');
  const [inline, lader] = baum.children;
  assert.equal(lader.type, 'script');
  assert.equal(lader.props.async, true);
  assert.equal(lader.props.src, 'https://www.googletagmanager.com/gtag/js?id=G-TEST123456');

  const befehle = inlineAusfuehren(inline.props.dangerouslySetInnerHTML.__html, {});
  assert.deepEqual(befehle.map((b) => b[0]), ['consent', 'js', 'config']);
  assert.equal(befehle[0][1], 'default');
  assert.deepEqual(befehle[0][2], {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500,
  });
  assert.deepEqual(befehle[2], ['config', 'G-TEST123456']);
  assert.equal(schluessel, 'saegihof-einwilligung-v2');
});

test('Google tag takes over a stored choice at once; only "alle" grants analytics', () => {
  const { baum, schluessel } = googleTag('G-TEST123456');
  const skript = baum.children[0].props.dangerouslySetInnerHTML.__html;
  const zustand = (gespeichert) => inlineAusfuehren(skript, gespeichert)[0][2];

  assert.equal(zustand({ [schluessel]: 'alle' }).analytics_storage, 'granted');
  assert.equal(zustand({ [schluessel]: 'alle' }).ad_storage, 'denied');
  assert.equal(zustand({ [schluessel]: 'notwendig' }).analytics_storage, 'denied');
  assert.equal(zustand({ 'saegihof-einwilligung': 'alle' }).analytics_storage, 'denied');
  assert.equal(zustand('gesperrt').analytics_storage, 'denied');
});
