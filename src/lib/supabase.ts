import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type ShoppingList = {
  id: number;
  created_at: string;
  name: string;
  user_id: string;
}

export type ShoppingItem = {
  id: number;
  created_at: string;
  item_name: string;
  is_completed: boolean;
  list_id: number;
  user_id: string;
} 

export type Profile = {
  id: string;
  user_id: string;
  name: string;
}

export type Share = {
  id: number;
  created_at: string;
  list_id: number;
  from_user_id: string;
  to_user_id: string;
}