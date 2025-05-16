'use server';
import { createClient } from '@/lib/supabase/server';
import { unstable_noStore } from 'next/cache';

export async function readRoutes() {
  unstable_noStore();

  const supabase = await createClient();
  const result = await supabase
    .from('routes')
    .select(
      `
    *, 
    tasks:reports(
      task_info:tasks(*,customer:customers(name, coordinate, address)), 
      recipient, 
      completed_at,
      completed_coord,
      task_order
    )
    `
    )
    .order('created_at', { ascending: false })
    .filter('completed_at', 'is', null);

  if (result.data) {
    result.data.forEach((route) => {
      route.tasks = route.tasks.sort(
        (a: { task_order: number }, b: { task_order: number }) =>
          a.task_order - b.task_order
      );
    });
  }

  return result;
}

export async function readWaypoints(route_id: string) {
  unstable_noStore();

  const supabase = await createClient();
  const result = await supabase
    .from('reports')
    .select('tasks(status, customer:customers(name, coordinate))')
    .eq('route_id', route_id)
    .order('task_order', { ascending: true });

  const waypoints = result.data?.map((data) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [lat, lon] = data.tasks.customer.coordinate.split(',').map(Number);
    return {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      name: data.tasks.customer.name,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      status: data.tasks.status,
      lat,
      lon,
    };
  });

  return waypoints; 
}
