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
    .select('customer:customers(name, coordinate)')
    .eq('date', today);

  // Pastikan hanya data yang memiliki customers & coordinate yang diolah
  const waypoints = result.data?.map(({ customer }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const [lat, lon] = customer.coordinate.split(',').map(Number);
    return {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      name: customer.name,
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
