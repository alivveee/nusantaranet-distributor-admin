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
import ItemTaskToDo from './components/item-task-todo';
import { useEffect, useState } from 'react';
import calculateOptimalRoute from '../algorithm/genetic-algorithm-tsp';
import useRouteStore from '../_store/useRouteStore';
import { readWaypoints } from './actions';

type waypointData = {
  name: string;
  lat: number;
  lon: number;
};

export default function ToDoRoutePage() {
  const [fetchedWaypoints, setFetchedWaypoints] = useState<waypointData[]>([]);
  const { setSelectedRoute, setWaypoints, waypoints } = useRouteStore();

  useEffect(() => {
    const fetchWaypoints = async () => {
      const waypointsData = await readWaypoints();
      if (waypointsData) {
        setFetchedWaypoints(waypointsData);
      } else {
        setFetchedWaypoints([]);
      }
    };
    fetchWaypoints();
  }, []);

  useEffect(() => {
    setSelectedRoute(null);
    setWaypoints(null);
  }, [setSelectedRoute, setWaypoints]);

  useEffect(() => {
    setWaypoints(fetchedWaypoints);
  }, [fetchedWaypoints, setWaypoints]);

  const handleCalculateRoute = async () => {
    const { route, distance } = await calculateOptimalRoute(fetchedWaypoints);
    setWaypoints(route);

    console.log('Optimal Route for Customers:', route);
    console.log('Total Distance:', distance, 'meters');
  };
  return (
    <>
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
            : fetchedWaypoints.map((waypoint, idx) => (
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
    </>
  );
}
