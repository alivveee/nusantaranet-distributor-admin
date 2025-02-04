'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export default async function addProduct(data: { name: string }) {
  const supabase = await createClient();
  const result = await supabase.from('products').insert(data);
  revalidatePath('data-source/product');
  return JSON.stringify(result);
}

