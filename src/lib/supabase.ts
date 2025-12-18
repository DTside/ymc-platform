import { createClient } from '@supabase/supabase-js';

// Эти данные ты берешь в настройках своего проекта Supabase (Settings -> API)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);