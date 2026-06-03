'use server';
import { createClient } from '../../../lib/supabase/server';

type FormData = {
  email: string;
  password: string;
};

export async function login(formData: FormData) {
  const supabase = await createClient();

  const result = await supabase.auth.signInWithPassword(formData);
  return JSON.stringify(result);
}
