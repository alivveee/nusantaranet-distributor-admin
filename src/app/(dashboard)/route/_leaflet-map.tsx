'use client';

import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MdHomeFilled } from 'react-icons/md';
import useRouteStore from './_store/useRouteStore';
import { cn } from '@/lib/utils';
import { renderToString } from 'react-dom/server';

const pointColor: Record<string, string> = {
  berjalan: 'bg-blue-500',
  berhasil: 'bg-green-500',
  gagal: 'bg-red-500',
  dibuat: 'bg-yellow-500',
};

const createHomeIcon = () => {
  return L.divIcon({
    html: renderToString(
      <div className="flex items-center justify-center text-white p-1 border-[1.5px] border-white bg-blue-500 rounded-full h-[30px] w-[30px]">
        <MdHomeFilled size={18} />
      </div>
    ),
    className: 'bg-transparent border-none',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

const createWaypointIcon = (idx: number, status?: string) => {
  return L.divIcon({
    html: renderToString(
      <div
        className={cn(
          'flex items-center justify-center h-[26px] w-[26px] text-white text-sm text-center rounded-full border-[1.5px] border-white font-bold',
          status ? pointColor[status] : 'bg-blue-500'
        )}
      >
        {idx + 1}
      </div>
    ),
    className: 'bg-transparent border-none',
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  });
};

export default function LeafletMapComponent() {
  // Warehouse position
  const position: L.LatLngExpression = [-7.777375888682844, 113.45324294849655];

  const { waypoints } = useRouteStore();

  // Filter out invalid waypoints to prevent Leaflet from crashing
  const validWaypoints = waypoints?.filter((waypoint) => {
    const lat = Number(waypoint.lat);
    const lon = Number(waypoint.lon);
    return (
      !isNaN(lat) &&
      !isNaN(lon) &&
      lat >= -90 &&
      lat <= 90 &&
      lon >= -180 &&
      lon <= 180
    );
  }) || [];

  return (
    <MapContainer center={position} zoom={12} className="w-full h-full z-0">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={createHomeIcon()} />
      {validWaypoints.map((waypoint, idx) => (
        <Marker
          key={idx}
          position={[waypoint.lat, waypoint.lon]}
          icon={createWaypointIcon(idx, waypoint.status)}
        />
      ))}
    </MapContainer>
  );
}
