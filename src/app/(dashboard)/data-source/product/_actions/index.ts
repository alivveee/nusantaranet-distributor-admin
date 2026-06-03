'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath, unstable_noStore } from 'next/cache';

export default async function addProduct(data: { name: string }) {
  const supabase = await createClient();
  const result = await supabase.from('products').insert(data);

  revalidatePath('data-source/product');
  return JSON.stringify(result);
}

export async function updateProduct(id: string, data: { name: string }) {
  const supabase = await createClient();
  const result = await supabase.from('products').update(data).eq('id', id);

  revalidatePath('data-source/product');
  return JSON.stringify(result);
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  const result = await supabase.from('products').delete().eq('id', id);

  revalidatePath('data-source/product');
  return JSON.stringify(result);
}

export async function readProducts() {
  unstable_noStore();

  const supabase = await createClient();
  const result = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: true });

  return result;
}
