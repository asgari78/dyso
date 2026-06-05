import { createClient } from '@supabase/supabase-js';
const supabaseUrl = "https://swzfjkdmbrpznrtodcnq.supabase.co"
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3emZqa2RtYnJwem5ydG9kY25xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5NzczMTYsImV4cCI6MjA5NTU1MzMxNn0.O7aE6V8-DrljHILfxFpUENlkuW77ig8DwilljExIDR0eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN3emZqa2RtYnJwem5ydG9kY25xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk5NzczMTYsImV4cCI6MjA5NTU1MzMxNn0.O7aE6V8-DrljHILfxFpUENlkuW77ig8DwilljExIDR0';
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("هشدار: متغیرهای محیطی Supabase یافت نشدند. این موضوع ممکن است باعث بروز خطا در سمت کلاینت شود.");
}
export const supabase = createClient(supabaseUrl, supabaseAnonKey);