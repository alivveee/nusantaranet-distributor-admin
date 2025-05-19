'use client';
import { useEffect, useMemo, useState } from 'react';
import ItemRouteDone from './components/item-route-done';
import useRouteStore from '../_store/useRouteStore';
import { IRoute } from '@/lib/types';
import { readRoutes, readWaypoints } from './actions';

export default function DoneRoutePage() {
  const [fetchedRoutes, setFetchedRoutes] = useState<IRoute[]>([]);
  const {
    selectedRouteId,
    setSelectedRoute,
    setSelectedRouteId,
    setWaypoints,
  } = useRouteStore();

  const dSelectedRoute = useMemo(
    () => fetchedRoutes?.find((route) => route.id === selectedRouteId) || null,
    [selectedRouteId, fetchedRoutes]
  );

  useEffect(() => {
    fetchRoutes();
  }, []);

  useEffect(
    () => setSelectedRoute(dSelectedRoute),
    [dSelectedRoute, setSelectedRoute]
  );

  useEffect(() => setWaypoints([]), [setWaypoints]);

  const fetchRoutes = async () => {
    const { data: routes } = await readRoutes();
    if (routes) {
      setFetchedRoutes(routes);
    }
  };

  const fetchWaypoints = async (routeId: string) => {
    const waypointsData = await readWaypoints(routeId);
    if (waypointsData) {
      setWaypoints(waypointsData);
    }
  };

  const handleRouteSelect = (routeId: string) => {
    setWaypoints([]);
    setSelectedRouteId(routeId);
    fetchWaypoints(routeId);
  };

  return (
    <>
      <header className="p-4 ">
        <h1 className="text-lg font-semibold">
          Total Rute ({fetchedRoutes.length})
        </h1>
      </header>
      {/* Main content of the sidebar with scroll */}
      <main className="flex-1 overflow-y-auto scrollbar">
        <div className="h-max">
          {fetchedRoutes.length > 0 ? (
            fetchedRoutes?.map((route) => (
              <ItemRouteDone
                key={route.id}
                route={route}
                onSelect={handleRouteSelect}
                isActive={selectedRouteId === route.id}
              />
            ))
          ) : (
            <p className="text-sm text-gray-500 px-4">
              Tidak ada rute aktif untuk hari ini
            </p>
          )}
        </div>
      </main>
    </>
  );
}
