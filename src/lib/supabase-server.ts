import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * Server-side Supabase client using the service role key.
 * This client bypasses RLS and should only be used in API routes
 * for admin operations (approving profiles, managing events, etc.).
 *
 * NEVER expose this client or the service role key to the browser.
 */
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
