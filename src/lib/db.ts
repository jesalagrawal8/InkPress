import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase environment variables are not defined");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to get Supabase client (for consistency with old API)
export const getSupabaseClient = () => {
  return supabase;
};
