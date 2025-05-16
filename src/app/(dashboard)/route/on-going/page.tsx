'use client';
import { IRoute } from '@/lib/types';
import { useEffect, useMemo, useState } from 'react';
import useRouteStore from '../_store/useRouteStore';
import { readRoutes, readWaypoints } from './actions';
import ItemRouteOnGoing from './components/item-route-ongoing';
import { createClient } from '@/lib/supabase/client';
import { RealtimePostgresChangesPayload } from '@supabase/supabase-js';

export default function OnGoingRoutePage() {
  const [fetchedRoutes, setFetchedRoutes] = useState<IRoute[]>([]);
  const [hasSelectedInitialRoute, setHasSelectedInitialRoute] = useState(false);
  const {
    selectedRouteId,
    setSelectedRoute,
    setSelectedRouteId,
    setWaypoints,
  } = useRouteStore();

  const supabase = createClient();

  const dSelectedRoute = useMemo(
    () => fetchedRoutes?.find((route) => route.id === selectedRouteId) || null,
    [selectedRouteId, fetchedRoutes]
  );

  useEffect(() => {
    // fetch awal
    fetchRoutes();

    // subscribe ke perubahan di tabel reports
    const channel = supabase
      .channel('realtime-reports')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'reports',
        },
        (payload: RealtimePostgresChangesPayload<never>) => {
          console.log('🔄 Realtime payload:', payload);
          fetchRoutes(); // refetch data jika ada perubahan

          // If we have a selected route, also update its waypoints
          if (selectedRouteId) {
            fetchWaypoints(selectedRouteId);
          }
        }
      )
      .subscribe();

    // unsubscribe saat komponen di-unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedRouteId]);

  useEffect(() => {
    setSelectedRoute(dSelectedRoute);
  }, [dSelectedRoute, setSelectedRoute]);

  useEffect(() => setWaypoints([]), [setWaypoints]);

  // Fetch routes from the database
  // This function is called when the component mounts
  const fetchRoutes = async () => {
    const { data: routes } = await readRoutes();
    if (routes) {
      setFetchedRoutes(routes);

      // Jika belum pernah set initial route, lakukan hanya sekali saat pertama load
      if (!hasSelectedInitialRoute && routes.length > 0) {
        const firstRoute = routes[0];
        setSelectedRouteId(firstRoute.id);
        fetchWaypoints(firstRoute.id);
        setHasSelectedInitialRoute(true);
      }
    }
  };

  // Fetch waypoints for a specific route
  // This function is called when a route is selected
  const fetchWaypoints = async (routeId: string) => {
    const waypointsData = await readWaypoints(routeId);
    if (waypointsData) {
      setWaypoints(waypointsData);
    }
  };

  // Handle route selection
  // This function is called when a route is selected from the list
  const handleRouteSelect = (routeId: string) => {
    setWaypoints([]);
    setSelectedRouteId(routeId);
    fetchWaypoints(routeId);
  };

  return (
    <>
      <header className="p-4 ">
        <h1 className="text-lg font-semibold">
          Total Rute ({fetchedRoutes?.length})
        </h1>
      </header>
      {/* Main content of the sidebar with scroll */}
      <main className="flex-1 overflow-y-auto scrollbar">
        <div className="h-max">
          {fetchedRoutes.length > 0 ? (
            fetchedRoutes?.map((route) => (
              <ItemRouteOnGoing
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
