import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    _supabase = createClient(url, key);
  }
  return _supabase;
}

// Re-export for backward compatibility
export const supabase = typeof window !== "undefined"
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
    )
  : (null as unknown as SupabaseClient);

export async function signInWithMagicLink(email: string) {
  const client = getSupabase();
  const { error } = await client.auth.signInWithOtp({ email });
  if (error) throw error;
}
