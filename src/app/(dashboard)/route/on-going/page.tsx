'use client';
import { useEffect, useMemo, useState } from 'react';
import ItemRouteOnGoing from './item-route-ongoing';
import useRouteStore from '../_store/useRouteStore';

// Sample data - in a real app, this would come from an API or database
const routes = [
  {
    id: '1',
    date: 'Selasa, 17 Agustus 2018',
    recipient: 'Jhon Snow',
    customer: {
      id: '5',
      name: 'Customer 5',
      type: 'Karyawisng',
    },
    startTime: '08:00',
    endTime: '09:30',
    duration: '-',
    address:
      'Jl. Kendalsari No.06, Jatimulyo, Kec. Lowokwaru, Kota Malang, Jawa Timur 65141',
    coordinates: 'lihat di maps',
    status: 'Berhasil' as const,
    type: 'Pengiriman',
  },
  // Add more routes as needed
];

export default function OnGoingRoutePage() {
  const { selectedRoute, setSelectedRoute, setWaypoints } = useRouteStore();
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);

  const tSelectedRoute = useMemo(
    () => routes.find((route) => route.id === selectedRouteId) || null,
    [selectedRouteId]
  );
  useEffect(
    () => setSelectedRoute(tSelectedRoute),
    [tSelectedRoute, setSelectedRoute]
  );

  useEffect(() => {
    if (selectedRoute === null) {
      setSelectedRouteId(null);
    }
  }, [selectedRoute]);

  useEffect(() => setWaypoints(null), [setWaypoints]);

  return (
    <>
      <header className="p-4 ">
        <h1 className="text-lg font-semibold">
          Total Kunjungan ({routes.length})
        </h1>
      </header>
      {/* Main content of the sidebar with scroll */}
      <main className="flex-1 overflow-y-auto">
        <div className="h-max">
          {routes.map((route) => (
            <ItemRouteOnGoing
              key={route.id}
              route={route}
              onSelect={setSelectedRouteId}
            />
          ))}
        </div>
      </main>
    </>
  );
}
