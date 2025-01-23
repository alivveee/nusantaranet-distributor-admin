import useRouteStore from '../_store/useRouteStore';

interface ItemTaskDoneProps {
  route: {
    id: string;
    date: string;
    recipient: string;
  };
  onSelect: (id: string) => void;
}

const waypoints = [
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
    name: 'Juni Elektronik',
    lat: -7.7450635552223455,
    lon: 113.2182567592503,
  },
  {
    name: 'Toko Fiber Optic Network',
    lat: -7.763666050469333,
    lon: 113.41894034508513,
  },
  {
    name: 'INSAN ABADI network equipment',
    lat: -7.902684447345017,
    lon: 113.8242253811314,
  },
  {
    name: 'Ceria Elektronik Situbondo',
    lat: -7.702986808764167,
    lon: 114.00306776224795,
  },
];

export default function ItemRouteDone({ route, onSelect }: ItemTaskDoneProps) {
  const { setWaypoints } = useRouteStore();
  return (
    <button
      onClick={() => {
        onSelect(route.id);
        setWaypoints(waypoints);
      }}
      className="w-full h-[64px] px-4 flex items-center justify-between border-t-[1.5px] hover:bg-gray-100"
    >
      <div className="flex flex-col">
        <h1 className="text-gray-700 text-sm">{route.date}</h1>
        <p className="text-sm text-gray-500 text-start">{route.recipient}</p>
      </div>
      <p className="text-sm font-semibold text-green-500">Berhasil 3/6</p>
    </button>
  );
}
