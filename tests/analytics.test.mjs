import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const code = ts.transpileModule(readFileSync('lib/analytics.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;

function setup(id = 'G-TEST123456') {
  const context = { exports: {}, window: {}, process: { env: { NEXT_PUBLIC_GA_ID: id } } };
  vm.runInNewContext(code, context);
  return context;
}

test('Consent commands use the Arguments format accepted by gtag.js', () => {
  const c = setup();
  c.exports.googleBefehl('consent', 'default', { analytics_storage: 'denied' });
  const command = c.window.dataLayer[0];
  assert.equal(Object.prototype.toString.call(command), '[object Arguments]');
  assert.equal(command[0], 'consent');
  assert.equal(command[2].analytics_storage, 'denied');
});

test('No lead before consent or when consent is denied', () => {
  const c = setup();
  c.exports.messeKontaktanfrage('wohnungen');
  assert.equal(c.window.dataLayer, undefined);
  c.window['ga-disable-G-TEST123456'] = true;
  c.exports.messeKontaktanfrage('wohnungen');
  assert.equal(c.window.dataLayer, undefined);
});

test('Consent permits a lead with only the explicit non-personal parameters', () => {
  const c = setup();
  c.window['ga-disable-G-TEST123456'] = false;
  c.exports.messeKontaktanfrage('wohnungen');
  assert.equal(c.window.dataLayer.length, 1);
  const event = Array.from(c.window.dataLayer[0]);
  assert.equal(event[0], 'event');
  assert.equal(event[1], 'generate_lead');
  assert.deepEqual(JSON.parse(JSON.stringify(event[2])), {
    send_to: 'G-TEST123456', form_name: 'kontaktformular', form_source: 'wohnungen',
  });
});

test('Revocation prevents a later completed request from emitting another lead', () => {
  const c = setup();
  c.window['ga-disable-G-TEST123456'] = false;
  c.exports.messeKontaktanfrage('startseite');
  c.window['ga-disable-G-TEST123456'] = true;
  c.exports.messeKontaktanfrage('wohnungen');
  assert.equal(c.window.dataLayer.length, 1);
});

test('Missing measurement ID and server rendering produce no event', () => {
  const c = setup('');
  c.exports.messeKontaktanfrage('wohnungen');
  assert.equal(c.window.dataLayer, undefined);
  delete c.window;
  assert.doesNotThrow(() => c.exports.messeKontaktanfrage('wohnungen'));
  assert.doesNotThrow(() => c.exports.googleBefehl('consent', 'default', {}));
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
