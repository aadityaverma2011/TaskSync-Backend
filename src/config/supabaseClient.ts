import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;
console.log("Supabase ENV URL:", process.env.SUPABASE_URL);
console.log("Supabase ENV KEY:", process.env.SUPABASE_ANON_KEY);
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
