// lib/supabase.ts
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_KEY } from "@env";

const supabaseUrl =
  process.env.SUPABASE_URL || "https://xviwhwveghoianyaerqz.supabase.co";
const supabaseAnonKey = process.env.SUPABASE_EY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
