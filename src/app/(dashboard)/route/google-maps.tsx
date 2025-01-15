import { AdvancedMarker, APIProvider, Map } from '@vis.gl/react-google-maps';
import { MdHomeFilled } from 'react-icons/md';

export default function GoogleMapComponent() {
  // Default position
  const position = { lat: -7.777375888682844, lng: 113.45324294849655 };

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
      <Map defaultCenter={position} defaultZoom={12} mapId="DEMO_MAP_ID">
        <AdvancedMarker position={position}>
          <div className="text-white p-1 border-[1.5px] border-white bg-blue-500 rounded-full">
            <MdHomeFilled size={18} />
          </div>
        </AdvancedMarker>
        <AdvancedMarker position={{ lat: -7.723, lng: 113.459 }}>
          <div className="h-[22px] w-[26px] bg-blue-500 text-white text-sm text-center">
            3
          </div>
        </AdvancedMarker>
      </Map>
    </APIProvider>
  );
}
