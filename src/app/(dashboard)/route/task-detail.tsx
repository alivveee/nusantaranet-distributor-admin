import { Badge } from '@/components/ui/badge';
import { TaskInfo } from '@/lib/types';
import { openGoogleMaps } from '@/lib/utils';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import React from 'react';

interface TaskDetailProps {
  task: TaskInfo;
  order: number;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task, order }) => {
  return (
    <div className="flex flex-col gap-2 w-max-[500px] border-[1px] border-gray-400 py-2 px-3 ">
      <div className="flex items-center">
        <div className="h-[22px] w-[26px] bg-blue-500 text-white text-sm text-center">
          {order}
        </div>
        <div className="ml-3">{task.task_info.customer.name}</div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-3 w-[200px]">
          <InfoItem title="Alamat">
            <span className="text-sm">{task.task_info.customer.address}</span>
          </InfoItem>
        </div>
        <div className="flex flex-col gap-1">
          <InfoItem title="Jenis">
            <span className="text-sm">{task.task_info.type}</span>
          </InfoItem>
          <InfoItem title="Status">
            <Badge
              className={`${
                task.task_info.status === 'berhasil'
                  ? 'bg-green-500'
                  : task.task_info.status === 'dibuat'
                    ? 'bg-yellow-500'
                    : task.task_info.status === 'berjalan'
                      ? 'bg-blue-500'
                      : 'bg-red-500'
              } w-[80px] flex justify-center`}
            >
              {task.task_info.status === 'berhasil'
                ? 'Berhasil'
                : task.task_info.status === 'dibuat'
                  ? 'Menunggu'
                  : task.task_info.status === 'berjalan'
                    ? 'Berjalan'
                    : 'Gagal'}
            </Badge>
          </InfoItem>
          <InfoItem title="Pukul">
            <span>
              {task.completed_at
                ? format(new Date(task.completed_at), 'dd MMMM yyyy HH:mm', {
                    locale: id,
                  })
                : '-'}
            </span>
          </InfoItem>
        </div>
        <div className="flex flex-col gap-1">
          <InfoItem title="Koordinat Selesai">
            <span className="text-blue-500 cursor-pointer text-sm">
              <a
                rel="stylesheet"
                onClick={() => {
                  openGoogleMaps(task.task_info.customer.coordinate);
                }}
              >
                lihat di maps
              </a>
            </span>
          </InfoItem>
          <InfoItem title="Penerima">
            <span>{task.recipient ? task.recipient : '-'}</span>
          </InfoItem>
        </div>
      </div>
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
