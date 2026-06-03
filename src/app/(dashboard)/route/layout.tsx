'use client';

import useRouteStore from './_store/useRouteStore';
import dynamic from 'next/dynamic';
import { RouteDetails } from './_route-detail';

const LeafletMapComponent = dynamic(() => import('./_leaflet-map'), { ssr: false });

interface RouteLayoutProps {
  children: React.ReactNode; // sidebar
}

export default function RouteLayout({ children }: RouteLayoutProps) {
  const { selectedRoute, setSelectedRoute, setSelectedRouteId, setWaypoints } =
    useRouteStore();
  return (
    <div className="w-full h-full flex relative overflow-hidden">
      {/* Sidebar */}
      <div className="w-[310px] h-full flex flex-col border-r">{children}</div>

      {/* Main content area */}
      <div className="flex-1 bg-slate-300 z-0">
        <LeafletMapComponent />
      </div>
      {/* Footer or additional content */}
      <div className="absolute bottom-0 left-0 right-0">
        <RouteDetails
          route={selectedRoute}
          onClose={() => {
            setWaypoints([]);
            setSelectedRoute(null);
            setSelectedRouteId(null);
          }}
        />
      </div>
    </div>
  );
}
