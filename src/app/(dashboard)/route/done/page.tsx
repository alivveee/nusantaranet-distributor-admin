'use client';
import { useEffect, useMemo, useState } from 'react';
import ItemRouteDone from './item-route-done';
import useRouteStore from '../_store/useRouteStore';

// Sample data - in a real app, this would come from an API or database
const routes = [
  {
    id: '12',
    date: 'Selasa, 17 Agustus 2018',
    recipient: 'Jhon Snow',
    customer: {
      id: '5',
      name: 'Customer 5',
      type: 'Karyawan',
    },
    startTime: '08:00',
    endTime: '09:30',
    duration: '1 Jam 30 Menit',
    address:
      'Jl. Kendalsari No.06, Jatimulyo, Kec. Lowokwaru, Kota Malang, Jawa Timur 65141',
    coordinates: 'lihat di maps',
    status: 'Berhasil' as const,
    type: 'Pengiriman',
  },
  {
    id: '1',
    date: 'Selasa, 17 Agustus 2018',
    recipient: 'Jhon Snow',
    customer: {
      id: '5',
      name: 'Customer 5',
      type: 'Karyawan',
    },
    startTime: '08:00',
    endTime: '09:30',
    duration: '1 Jam 30 Menit',
    address:
      'Jl. Kendalsari No.06, Jatimulyo, Kec. Lowokwaru, Kota Malang, Jawa Timur 65141',
    coordinates: 'lihat di maps',
    status: 'Berhasil' as const,
    type: 'Pengiriman',
  },
  {
    id: '2',
    date: 'Rabu, 18 Agustus 2018',
    recipient: 'Arya Stark',
    customer: {
      id: '6',
      name: 'Customer 6',
      type: 'Individu',
    },
    startTime: '10:00',
    endTime: '11:15',
    duration: '1 Jam 15 Menit',
    address: 'Jl. Ijen No.12, Kota Malang, Jawa Timur 65119',
    coordinates: 'lihat di maps',
    status: 'Berjalan' as const,
    type: 'Kunjungan',
  },
  {
    id: '3',
    date: 'Kamis, 19 Agustus 2018',
    recipient: 'Sansa Stark',
    customer: {
      id: '7',
      name: 'Customer 7',
      type: 'Perusahaan',
    },
    startTime: '14:00',
    endTime: '15:45',
    duration: '1 Jam 45 Menit',
    address: 'Jl. Soekarno-Hatta No.15, Kota Malang, Jawa Timur 65142',
    coordinates: 'lihat di maps',
    status: 'Berhasil' as const,
    type: 'Pengiriman',
  },
  {
    id: '4',
    date: 'Jumat, 20 Agustus 2018',
    recipient: 'Tyrion Lannister',
    customer: {
      id: '8',
      name: 'Customer 8',
      type: 'Karyawan',
    },
    startTime: '09:00',
    endTime: '10:20',
    duration: '1 Jam 20 Menit',
    address: 'Jl. Veteran No.9, Kota Malang, Jawa Timur 65144',
    coordinates: 'lihat di maps',
    status: 'Berjalan' as const,
    type: 'Kunjungan',
  },
  {
    id: '5',
    date: 'Sabtu, 21 Agustus 2018',
    recipient: 'Daenerys Targaryen',
    customer: {
      id: '9',
      name: 'Customer 9',
      type: 'Individu',
    },
    startTime: '13:00',
    endTime: '14:30',
    duration: '1 Jam 30 Menit',
    address: 'Jl. Bandung No.3, Kota Malang, Jawa Timur 65111',
    coordinates: 'lihat di maps',
    status: 'Berhasil' as const,
    type: 'Pengiriman',
  },
  {
    id: '6',
    date: 'Minggu, 22 Agustus 2018',
    recipient: 'Bran Stark',
    customer: {
      id: '10',
      name: 'Customer 10',
      type: 'Perusahaan',
    },
    startTime: '15:00',
    endTime: '16:15',
    duration: '1 Jam 15 Menit',
    address: 'Jl. Gajayana No.7, Kota Malang, Jawa Timur 65141',
    coordinates: 'lihat di maps',
    status: 'Berjalan' as const,
    type: 'Kunjungan',
  },
];

export default function DoneRoutePage() {
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
            <ItemRouteDone
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
