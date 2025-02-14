'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath, unstable_noStore } from 'next/cache';

export default async function addTask(data: {
  name: string;
  phone: string;
  coordinate: string;
  address: string;
}) {
  const supabase = await createClient();
  const result = await supabase.from('Tasks').insert(data);

  revalidatePath('data-source/Task');
  return JSON.stringify(result);
}

export async function updateTask(
  id: string,
  data: {
    name: string;
    phone: string;
    coordinate: string;
    address: string;
  }
) {
  const supabase = await createClient();
  const result = await supabase.from('Tasks').update(data).eq('id', id);

  revalidatePath('data-source/Task');
  return JSON.stringify(result);
}

export async function deleteTask(id: string) {
  const supabase = await createClient();
  const result = await supabase.from('Tasks').delete().eq('id', id);

  revalidatePath('data-source/Task');
  return JSON.stringify(result);
}

export async function readTasks() {
  unstable_noStore();

  const supabase = await createClient();
  const result = await supabase
    .from('Tasks')
    .select('*')
    .order('created_at', { ascending: true });

  return result;
}

export async function readProductOptions() {
  unstable_noStore();

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('products')
    .select('id, name')
    .order('name', { ascending: true }); // Urutkan berdasarkan name (A-Z)

  if (error) {
    console.error('Error fetching products:', error);
  } else {
    const options = data.map((product) => ({
      value: product.id,
      label: product.name,
    }));

    return options; // [{ value: 1, label: "Product A" }, { value: 2, label: "Product B" }]
  }
}
export async function readCustomerOptions() {
  unstable_noStore();

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('customers')
    .select('id, name')
    .order('name', { ascending: true }); // Urutkan berdasarkan name (A-Z)

  if (error) {
    console.error('Error fetching customers:', error);
  } else {
    const options = data.map((customer) => ({
      value: customer.id,
      label: customer.name,
    }));

    return options; // [{ value: 1, label: "Customer A" }, { value: 2, label: "Customer B" }]
  }
}
