'use server';

import { createClient } from '@/lib/supabase/server';
import { ITaskProduct } from '@/lib/types';
import { revalidatePath, unstable_noStore } from 'next/cache';

export default async function addTask(
  data: {
    type: 'pengiriman' | 'kanvassing';
    customer_id: string;
    date: string;
  },
  products: ITaskProduct[]
) {
  const supabase = await createClient();
  const newTask = {
    ...data,
    status: 'dibuat',
  };

  const createTaskResult = await supabase
    .from('tasks')
    .insert(newTask)
    .select('id')
    .single();

  if (createTaskResult.error?.message) {
    return JSON.stringify(createTaskResult);
  } else {
    // memasukkan setiap produk ke task_products
    const taskProducts = products.map((product) => ({
      ...product,
      task_id: createTaskResult.data?.id,
    }));

    const createTaskProductsResult = await supabase
      .from('task_products')
      .insert(taskProducts);

    revalidatePath('task');
    return JSON.stringify(createTaskProductsResult);
  }
}

export async function updateTask(
  id: string,
  data: {
    type: 'pengiriman' | 'kanvassing';
    customer_id: string;
    date: string;
  },
  products: ITaskProduct[]
) {
  const supabase = await createClient();

  // tasks update
  const createTaskResult = await supabase
    .from('tasks')
    .update(data)
    .eq('id', id);

  if (createTaskResult.error?.message) {
    return JSON.stringify(createTaskResult);
  } else {
    // Upsert task_products (insert atau update jika sudah ada)
    const upsertTaskProductsResult = await supabase
      .from('task_products')
      .upsert(
        products.map((product) => ({
          ...product,
          task_id: id, // Pastikan task_id selalu di-set
        })),
        { onConflict: 'task_id, product_id' } // Pastikan berdasarkan primary key atau unique constraint
      );
    revalidatePath('task');
    return JSON.stringify(upsertTaskProductsResult);
  }
}

export async function deleteTask(id: string) {
  const supabase = await createClient();
  const result = await supabase.from('tasks').delete().eq('id', id);

  revalidatePath('task');
  return JSON.stringify(result);
}

export async function readTasks() {
  unstable_noStore();

  const supabase = await createClient();
  const result = await supabase
    .from('tasks')
    .select(
      `
      *, 
      products:task_products(product_id, product_name, quantity), 
      asignee:users(id, name, phone), 
      customer:customers(id, name, address)
      `
    )
    .order('date', { ascending: true });
  return result;
}

//read options
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
