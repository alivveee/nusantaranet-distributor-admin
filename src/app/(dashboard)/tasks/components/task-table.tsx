import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { readTasks } from '../actions';
import { ITask } from '@/lib/types';
import { cn, formatDate } from '@/lib/utils';
import ProductViewButton from '../../../../components/product-view-button';
import ActionMenu from './action-menu';

export default async function TaskTable() {
  const { data: tasks } = await readTasks();

  return (
    <Table className="border-[1px] border-gray-200">
      <TableHeader>
        <TableRow>
          <TableHead>Jenis</TableHead>
          <TableHead>Nama Customer</TableHead>
          <TableHead>Alamat</TableHead>
          <TableHead>Tanggal</TableHead>
          <TableHead>Produk</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.isArray(tasks) && tasks?.length > 0 ? (
          (tasks as ITask[])?.map((task) => (
            <TableRow key={task.id}>
              <TableCell>{task.type}</TableCell>
              <TableCell>{task.customer.name}</TableCell>
              <TableCell>{task.customer.address}</TableCell>
              <TableCell>{formatDate(task.date)}</TableCell>
              <TableCell>
                <ProductViewButton products={task.products} />
              </TableCell>
              <TableCell>
                <Badge
                  className={cn(
                    task.status === 'berhasil'
                      ? 'bg-green-500 hover:bg-green-600'
                      : task.status === 'dibuat'
                        ? 'bg-yellow-500 hover:bg-yellow-600'
                        : task.status === 'berjalan'
                          ? 'bg-blue-500 hover:bg-blue-600'
                          : 'bg-red-500 hover:bg-red-600',
                    'w-[80px] flex justify-center'
                  )}
                >
                  {task.status === 'berhasil'
                    ? 'Selesai'
                    : task.status === 'dibuat'
                      ? 'Dibuat'
                      : task.status === 'berjalan'
                        ? 'Berjalan'
                        : 'Gagal'}
                </Badge>
              </TableCell>
              <TableCell>
                <ActionMenu task={task} />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              Belum ada data
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
