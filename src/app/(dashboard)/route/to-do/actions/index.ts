'use server';

import { createClient } from '@/lib/supabase/server';
import { format } from 'date-fns';
import { revalidatePath, unstable_noStore } from 'next/cache';
import { Waypoint } from '../../_store/slicing/route.slice';

export default async function addRoute(
  data: { asignee_id: string },
  route: Waypoint[]
) {
  const supabase = await createClient();

  // Pastikan tasks dikirim sebagai JSONB, bukan string JSON
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
    .select('id,customer:customers(name, coordinate)')
    .eq('date', today)
    .eq('status', 'dibuat');

  // Pastikan hanya data yang memiliki customers & coordinate yang diolah
  const waypoints = result.data?.map((task) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [lat, lon] = task.customer.coordinate.split(',').map(Number);
    return {
      task_id: task.id,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      name: task.customer.name,
      lat,
      lon,
    };
  });

  return waypoints; // Pastikan return array kosong jika tidak ada data
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
