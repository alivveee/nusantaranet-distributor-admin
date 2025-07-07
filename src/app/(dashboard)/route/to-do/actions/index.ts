'use server';

import { createClient } from '@/lib/supabase/server';
import { Waypoint } from '@/lib/types';
import { format } from 'date-fns';
import { revalidatePath, unstable_noStore } from 'next/cache';

export default async function addRoute(
  data: { asignee_id: string },
  route: Waypoint[]
) {
  const supabase = await createClient();

  // tasks dikirim sebagai JSONB
  const tasks = route.map((waypoint, idx) => ({
    task_id: waypoint.task_id,
    task_order: idx + 1,
  }));

  // Panggil stored procedure dengan Supabase RPC
  const { data: result, error } = await supabase.rpc(
    'insert_route_with_tasks',
    {
      asignee_id: data.asignee_id,
      tasks_param: tasks, // Kirim sebagai JSONB, bukan string
    }
  );

  if (error) {
    return JSON.stringify({ error });
  }

  revalidatePath('route');
  return JSON.stringify(result);
}

export async function readWaypoints() {
  unstable_noStore();

  const supabase = await createClient();
  const today = format(new Date(), 'yyyy-MM-dd');
  const result = await supabase
    .from('tasks')
    .select('id, customer:customers(name, coordinate)')
    .eq('date', today)
    .eq('status', 'dibuat');

  const waypoints = result.data?.map((data) => {
    // @ts-ignore
    const [lat, lon] = data.customer.coordinate.split(',').map(Number);
    return {
      // @ts-ignore
      name: data.customer.name,
      task_id: data.id,
      lat,
      lon,
    };
  });

  return waypoints;
}

export async function readAsigneeOptions() {
  unstable_noStore();

  const supabase = await createClient();
  const { data, error } = await supabase
    .from('users')
    .select('id, name')
    .order('name', { ascending: true }); // Urutkan berdasarkan name (A-Z)

  if (error) {
    console.error('Error fetching users:', error);
  } else {
    const options = data.map((user) => ({
      value: user.id,
      label: user.name,
    }));

    return options; // [{ value: 1, label: "Product A" }, { value: 2, label: "Product B" }]
  }
}
