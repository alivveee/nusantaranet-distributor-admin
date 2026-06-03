import { IRoute } from '@/lib/types';
import { id } from 'date-fns/locale';
import { format, parseISO } from 'date-fns';

interface ItemTaskOnGoingProps {
  route: IRoute;
  onSelect: (id: string) => void;
  isActive?: boolean;
}

export default function ItemRouteOnGoing({
  route,
  onSelect,
  isActive = false,
}: ItemTaskOnGoingProps) {
  const totalDone = route.tasks.filter(
    (task) =>
      task.task_info.status === 'berhasil' || task.task_info.status === 'gagal'
  ).length;

  return (
    <button
      onClick={() => {
        onSelect(route.id);
      }}
      className={`w-full h-[64px] px-4 flex items-center justify-between border-t-[1.5px] 
      ${isActive ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'hover:bg-gray-100'}`}
    >
      <div className="flex flex-col">
        <h1
          className={`text-sm font-bold ${isActive ? 'text-blue-700' : 'text-gray-700'}`}
        >
          {format(parseISO(route.created_at), 'EEEE, d MMMM yyyy', {
            locale: id,
          })}
        </h1>
        <p className="text-sm text-gray-500 text-start">{route.asignee_name}</p>
      </div>
      <p className={`text-sm font-semibold ${isActive && 'text-blue-500'}`}>
        {`Selesai ${totalDone}/${route.tasks.length}`}
      </p>
    </button>
  );
}
