'use client';
import { useState } from 'react';
import { RouteDetails } from '../route-detail';
import ItemRouteOnGoing from './item-route-ongoing';

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
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);

  const selectedRoute = routes.find((route) => route.id === selectedRouteId) || null;
  return (
    <div className="w-full h-full flex relative">
      {/* Sidebar */}
      <div className="w-[310px] h-full flex flex-col border-r">
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
      </div>

      {/* Content area */}
      <div className="flex-1 bg-slate-300">
        <div className="h-full flex items-center justify-center text-gray-500">
          On Going
        </div>
      </div>

      {/* Footer or additional content */}
      <div className="absolute bottom-0 left-0 right-0">
        <RouteDetails
          route={selectedRoute}
          onClose={() => setSelectedRouteId(null)}
        />
      </div>
    </div>
  );
}
