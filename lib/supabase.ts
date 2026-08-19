import { createClient } from '@supabase/supabase-js';

/**
 * Supabase-Client für den Server.
 *
 * Verwendet den service-role-Key, der die Row Level Security umgeht. Dieser
 * Key darf niemals im Browser landen — deshalb hat er kein NEXT_PUBLIC_-
 * Präfix und wird nur in API-Routen eingelesen.
 */
export function supabaseServer() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      'SUPABASE_URL oder SUPABASE_SERVICE_ROLE_KEY fehlt. ' +
        'Werte in .env.local bzw. in den Vercel-Projekteinstellungen hinterlegen.',
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
