import ProductViewButton from '@/components/product-view-button';
import { Badge } from '@/components/ui/badge';
import { TaskInfo } from '@/lib/types';
import { cn, openGoogleMaps } from '@/lib/utils';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import React from 'react';

interface TaskDetailProps {
  task: TaskInfo;
  order: number;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task, order }) => {
  return (
    <div className="flex flex-col gap-2 border-[1px] border-gray-400 py-2 px-3 ">
      <div className="flex items-center">
        <div
          className={cn(
            'h-[22px] w-[26px] text-white text-sm text-center',
            task.task_info.status === 'berhasil'
              ? 'bg-green-500 hover:bg-green-600'
              : task.task_info.status === 'dibuat'
                ? 'bg-yellow-500 hover:bg-yellow-600'
                : task.task_info.status === 'berjalan'
                  ? 'bg-blue-500 hover:bg-blue-600'
                  : 'bg-red-500 hover:bg-red-600'
          )}
        >
          {order}
        </div>
        <div className="ml-3">{task.task_info.customer.name}</div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-1 w-[200px]">
          <InfoItem title="Alamat">
            <p className="text-sm">{task.task_info.customer.address}</p>
          </InfoItem>
          <InfoItem title="Jenis">
            <p className="text-sm">{task.task_info.type}</p>
          </InfoItem>
        </div>
        <div className="flex flex-col gap-1">
          <InfoItem title="Status">
            <Badge
              className={`${
                task.task_info.status === 'berhasil'
                  ? 'bg-green-500 hover:bg-green-600'
                  : task.task_info.status === 'dibuat'
                    ? 'bg-yellow-500 hover:bg-yellow-600'
                    : task.task_info.status === 'berjalan'
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'bg-red-500 hover:bg-red-600'
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
            <p className="text-sm">
              {task.completed_at
                ? format(new Date(task.completed_at), 'dd MMMM yyyy HH:mm', {
                    locale: id,
                  })
                : '-'}
            </p>
          </InfoItem>
          <InfoItem title="Koordinat Selesai">
            {task.completed_coord ? (
              <a
                className="text-blue-500 text-sm hover:underline"
                rel="stylesheet"
                onClick={() => {
                  openGoogleMaps(task.completed_coord);
                }}
              >
                lihat di maps
              </a>
            ) : (
              <p>-</p>
            )}
          </InfoItem>
        </div>
        <div className="flex flex-col gap-1">
          <InfoItem title="Penerima">
            <p className="text-sm">{task.recipient ? task.recipient : '-'}</p>
          </InfoItem>
          <InfoItem title="Keterangan">
            <p className="text-sm">
              {task.note ? task.note : '-'}
            </p>
          </InfoItem>
          <InfoItem title="Daftar Produk">
            <div>
              <ProductViewButton products={task.products} />
            </div>
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
