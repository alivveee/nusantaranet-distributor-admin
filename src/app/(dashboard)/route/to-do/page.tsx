'use client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ItemTaskToDo from './item-task-todo';
import { useEffect } from 'react';
import calculateOptimalRoute from '../algorithm/genetic-algorithm-tsp';
import useRouteStore from '../_store/useRouteStore';

const dummyWaypoints = [
  {
    name: 'Juni Elektronik',
    lat: -7.7450635552223455,
    lon: 113.2182567592503,
  },
  {
    name: 'Sari I Elektronic Pasuruan',
    lat: -7.768547731096245,
    lon: 112.74666790270959,
  },
  {
    name: 'Jimmy Electronic',
    lat: -7.758113773966092,
    lon: 113.22837119484377,
  },
  {
    name: 'Toko Fiber Optic Network',
    lat: -7.763666050469333,
    lon: 113.41894034508513,
  },
  {
    name: 'Jago Elektronik - Pasuruan',
    lat: -7.643786399086414,
    lon: 112.8974431696384,
  },
  {
    name: 'Centro Electronic',
    lat: -7.6450904119843734,
    lon: 112.90319516656767,
  },
  {
    name: 'Ceria Elektronik Situbondo',
    lat: -7.702986808764167,
    lon: 114.00306776224795,
  },
  {
    name: 'INSAN ABADI network equipment',
    lat: -7.902684447345017,
    lon: 113.8242253811314,
  },
  // {
  //   name: 'ShidqiLed Elektronik',
  //   lat: -7.724847341131446,
  //   lon: 113.69594755132324,
  // },
  // {
  //   name: 'JAY_NETWOR LOKAL INTERNET',
  //   lat: -7.855615979545028,
  //   lon: 113.9289741183834,
  // },
  // {
  //   name: 'Rief Bajigur. Net',
  //   lat: -7.841947167247782,
  //   lon: 113.40881614026092,
  // },
  // {
  //   name: 'Nid@ Net',
  //   lat: -7.757209035459546,
  //   lon: 113.44696440104391,
  // },
  // {
  //   name: 'Miya Wifi Hotspot',
  //   lat: -7.790181028400896,
  //   lon: 113.50998153669606,
  // },
];

export default function ToDoRoutePage() {
  const { setSelectedRoute, setWaypoints, waypoints } = useRouteStore();

  useEffect(() => {
    setSelectedRoute(null);
    setWaypoints(null);
  }, [setSelectedRoute, setWaypoints]);

  useEffect(() => {
    setWaypoints(dummyWaypoints);
  }, [dummyWaypoints, setWaypoints]);

  const handleCalculateRoute = async () => {
    const { route, distance } = await calculateOptimalRoute(dummyWaypoints);
    setWaypoints(route);

    console.log('Optimal Route for Customers:', route);
    console.log('Total Distance:', distance, 'meters');
  };
  return (
    <div className="w-[310px] h-full flex flex-col border-r">
      <header className="p-4 ">
        <h1 className="text-lg font-semibold">Total Kunjungan (4)</h1>
      </header>
      {/* Main content of the sidebar with scroll */}
      <main className="flex-1 overflow-y-auto">
        <div className="h-max">
          {waypoints
            ? waypoints.map((waypoint, idx) => (
                <ItemTaskToDo
                  key={idx}
                  order={idx + 1}
                  custName={waypoint.name}
                />
              ))
            : dummyWaypoints.map((waypoint, idx) => (
                <ItemTaskToDo
                  key={idx}
                  order={idx + 1}
                  custName={waypoint.name}
                />
              ))}
        </div>
      </main>
      <footer className="flex flex-col gap-2 p-4 bg-white">
        <div className="flex flex-col w-full gap-1">
          <Label className="text-sm text-gray-700">Penerima Tugas</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Ahmad</SelectItem>
              <SelectItem value="dark">Mukhtar</SelectItem>
              <SelectItem value="system">Darma</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => handleCalculateRoute()}>Optimalkan</Button>
      </footer>
    </div>
  );
}
