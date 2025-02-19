'use server';

import { createClient } from '@/lib/supabase/server';
import { format } from 'date-fns';
import { unstable_noStore } from 'next/cache';

export async function readWaypoints() {
  unstable_noStore();

  const supabase = await createClient();
  const today = format(new Date(), 'yyyy-MM-dd');
  const result = await supabase
    .from('tasks')
    .select('customers(name, coordinate)')
    .eq('date', today);

  // Pastikan hanya data yang memiliki customers & coordinate yang diolah
  const waypoints = result.data?.flatMap((task) => {
    return task.customers?.map((customer) => {
      const [lat, lon] = customer.coordinate.split(',').map(Number); // Konversi string ke angka
      return {
        name: customer.name,
        lat,
        lon,
      };
    });
  });

  return waypoints; // Pastikan return array kosong jika tidak ada data
}
