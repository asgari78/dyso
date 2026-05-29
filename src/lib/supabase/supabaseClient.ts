import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("هشدار: متغیرهای محیطی Supabase یافت نشدند. این موضوع ممکن است باعث بروز خطا در سمت کلاینت شود.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);