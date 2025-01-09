import { Badge } from '@/components/ui/badge';
import React from 'react';

interface TaskDetailProps {
  task: {
    customer: {
      type: string;
    };
    coordinates: string;
    status: string;
  };
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task }) => {
  return (
    <div className="flex w-max-[500px] border-[1px] border-gray-400 py-3 px-4 gap-4">
      <div className="flex flex-col gap-3 w-[200px]">
        <div className="flex items-center">
          <div className="h-[22px] w-[26px] bg-blue-500 text-white text-sm text-center">
            1
          </div>
          <div className="ml-3 text-md">Task 1</div>
        </div>
        <InfoItem title="Alamat">
          <span className="text-sm">
            Jl. Puncak Borobudur No.1, Mojolangu, Kec. Lowokwaru, Kota Malang,
            Jawa Timur 65142
          </span>
        </InfoItem>
      </div>
      <div className="flex flex-col gap-1">
        <InfoItem title="Jenis">
          <span>{task.customer.type}</span>
        </InfoItem>
        <InfoItem title="Status">
          <Badge
            className={`${
              task.status === 'done'
                ? 'bg-green-500'
                : task.status === 'pending'
                  ? 'bg-yellow-500'
                  : task.status === 'on-going'
                    ? 'bg-blue-500'
                    : 'bg-red-500'
            } w-[80px] flex justify-center`}
          >
            {task.status === 'done'
              ? 'Selesai'
              : task.status === 'pending'
                ? 'Menunggu'
                : task.status === 'on-going'
                  ? 'Berjalan'
                  : 'Gagal'}
          </Badge>
        </InfoItem>
        <InfoItem title="Pukul">
          <span>19.30</span>
        </InfoItem>
      </div>
      <div className="flex flex-col gap-1">
        <InfoItem title="Koordinat Selesai">
          <span className="text-blue-500 cursor-pointer">
            {task.coordinates}
          </span>
        </InfoItem>
        <InfoItem title="Penerima">
          <span>Mukhtar</span>
        </InfoItem>
      </div>
      {/* <div className="flex justify-between mb-1">
        <span className="text-gray-600">Jenis</span>
        <span>{task.customer.type}</span>
      </div>
      <div className="flex justify-between mb-1">
        <span className="text-gray-600">Koordinat</span>
        <span className="text-blue-500 cursor-pointer">{task.coordinates}</span>
      </div>
      <div className="flex justify-between mb-1">
        <span className="text-gray-600">Status</span>
        <span
          className={cn(
            'px-2 py-0.5 rounded text-sm',
            task.status === 'Berhasil'
              ? 'bg-green-100 text-green-700'
              : task.status === 'Berjalan'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700'
          )}
        >
          {task.status}
        </span>
      </div> */}
    </div>
  );
};

export default TaskDetail;

function InfoItem({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-500 text-sm">{title}</span>
      {children}
    </div>
  );
}
