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
      products:report_products(product_info:products(name), quantity), 
      recipient,
      completed_at,
      completed_coord
    )
    `
    )
    .order('created_at', { ascending: false })
    .not('completed_at', 'is', null);

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

  //   Pastikan hanya data yang memiliki customers & coordinate yang diolah
  const waypoints = result.data
    ?.map((data) => {
      const rawData = data as any;
      if (!rawData.tasks?.customer?.coordinate) return null;
      
      const [lat, lon] = rawData.tasks.customer.coordinate.split(',').map(Number);
      if (isNaN(lat) || isNaN(lon) || lat < -90 || lat > 90 || lon < -180 || lon > 180) {
        return null;
      }
      return {
        name: rawData.tasks.customer.name,
        status: rawData.tasks.status,
        lat,
        lon,
      };
    })
    .filter((wp): wp is NonNullable<typeof wp> => wp !== null) || [];

  return waypoints; // Pastikan return array kosong jika tidak ada data
}
