'use client';
import { useEffect, useMemo, useState } from 'react';
import ItemRouteDone from './components/item-route-done';
import useRouteStore from '../_store/useRouteStore';
import { IRoute } from '@/lib/types';
import { readRoutes } from './actions';

export default function DoneRoutePage() {
  const { selectedRoute, setSelectedRoute, setWaypoints } = useRouteStore();
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const [fetchedRoute, setFetchedRoutes] = useState<IRoute[]>([]);

  const dSelectedRoute = useMemo(
    () => fetchedRoute?.find((route) => route.id === selectedRouteId) || null,
    [selectedRouteId, fetchedRoute]
  );

  useEffect(() => {
    const fetchRoutes = async () => {
      const { data: routes } = await readRoutes();
      if (routes) {
        setFetchedRoutes(routes);
      }
    };
    fetchRoutes();
  }, []);

  useEffect(
    () => setSelectedRoute(dSelectedRoute),
    [dSelectedRoute, setSelectedRoute]
  );

  useEffect(() => {
    if (selectedRoute === null) {
      setSelectedRouteId(null);
    }
  }, [selectedRoute]);

  useEffect(() => setWaypoints([]), [setWaypoints]);

  return (
    <>
      <header className="p-4 ">
        <h1 className="text-lg font-semibold">
          Total Kunjungan ({fetchedRoute.length})
        </h1>
      </header>
      {/* Main content of the sidebar with scroll */}
      <main className="flex-1 overflow-y-auto scrollbar">
        <div className="h-max">
          {fetchedRoute.map((route) => (
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
