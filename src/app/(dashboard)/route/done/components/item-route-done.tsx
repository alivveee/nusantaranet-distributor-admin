import { IRoute, Waypoint } from '@/lib/types';
import useRouteStore from '../../_store/useRouteStore';
import { useEffect, useState } from 'react';
import { readWaypoints } from '../actions';
import { id } from 'date-fns/locale';
import { format, parseISO } from 'date-fns';

interface ItemTaskDoneProps {
  route: IRoute;
  onSelect: (id: string) => void;
}

export default function ItemRouteDone({ route, onSelect }: ItemTaskDoneProps) {
  const [fetchedWaypoints, setFetchedWaypoints] = useState<Waypoint[]>([]);
  const { setWaypoints } = useRouteStore();

  useEffect(() => {
    const fetchWaypoints = async () => {
      const waypointsData = await readWaypoints(route.id);
      if (waypointsData) {
        setFetchedWaypoints(waypointsData);
      } else {
        setFetchedWaypoints([]);
      }
    };
    fetchWaypoints();
  }, [route.id]);

  return (
    <button
      onClick={() => {
        onSelect(route.id);
        setWaypoints(fetchedWaypoints);
      }}
      className="w-full h-[64px] px-4 flex items-center justify-between border-t-[1.5px] hover:bg-gray-100"
    >
      <div className="flex flex-col">
        <h1 className="text-gray-700 text-sm font-bold">
          {format(parseISO(route.created_at), 'EEEE, d MMMM yyyy', {
            locale: id,
          })}
        </h1>
        <p className="text-sm text-gray-500 text-start">{route.asignee_name}</p>
      </div>
      <p className="text-sm font-semibold text-red-500">Selesai 3/6</p>
    </button>
  );
}
