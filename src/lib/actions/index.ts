'use server';
import { createClientReadOnly } from '../supabase/server';

export default async function readUserSession() {
  const supabase = await createClientReadOnly();

  return supabase.auth.getSession();
}
