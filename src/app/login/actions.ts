'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '../../../utils/supabase/server';

type FormData = {
  email: string;
  password: string;
};

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const fData = {
    email: formData.email,
    password: formData.password,
  };

  const { error } = await supabase.auth.signInWithPassword(fData);

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/tasks');
}
