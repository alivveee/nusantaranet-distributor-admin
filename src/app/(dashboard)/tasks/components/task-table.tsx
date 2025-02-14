import ActionMenu from '@/components/action-menu';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FaEye } from 'react-icons/fa';

const task = [
  {
    id: 1,
    type: 'Pengiriman',
    customerName: 'The Com',
    date: '2021-10-10',
    receiver: 'Rizky',
    product: 'Router',
    status: 'done',
  },
  {
    id: 2,
    type: 'Kanvassing',
    customerName: 'Bpk Agus Mustofa',
    date: '2021-10-10',
    receiver: 'Agus',
    product: 'Splicer',
    status: 'pending',
  },
  {
    id: 3,
    type: 'Pengiriman',
    customerName: 'PT Interkoneksi',
    date: '2021-10-10',
    receiver: 'Abdul',
    product: 'Router',
    status: 'on-going',
  },
  {
    id: 4,
    type: 'Perbaikan',
    customerName: 'PT Interkoneksi',
    date: '2021-10-10',
    receiver: 'Abdul',
    product: 'Router',
    status: 'failed',
  },
  {
    id: 5,
    type: 'Pengiriman',
    customerName: 'PT Interkoneksi',
    date: '2021-10-10',
    receiver: 'Abdul',
    product: 'Router',
    status: 'done',
  },
  {
    id: 6,
    type: 'Pengiriman',
    customerName: 'PT Interkoneksi',
    date: '2021-10-10',
    receiver: 'Abdul',
    product: 'Router',
    status: 'done',
  },
  {
    id: 7,
    type: 'Pengiriman',
    customerName: 'PT Interkoneksi',
    date: '2021-10-10',
    receiver: 'Abdul',
    product: 'Router',
    status: 'done',
  },
  {
    id: 8,
    type: 'Pengiriman',
    customerName: 'PT Interkoneksi',
    date: '2021-10-10',
    receiver: 'Abdul',
    product: 'Router',
    status: 'done',
  },
  {
    id: 9,
    type: 'Pengiriman',
    customerName: 'PT Interkoneksi',
    date: '2021-10-10',
    receiver: 'Abdul',
    product: 'Router',
    status: 'done',
  },
  {
    id: 10,
    type: 'Pengiriman',
    customerName: 'PT Interkoneksi',
    date: '2021-10-10',
    receiver: 'Abdul',
    product: 'Router',
    status: 'done',
  },
];

export default function TaskTable() {
  return (
    <Table className="border-[1px] border-gray-200">
      <TableHeader>
        <TableRow>
          <TableHead>Jenis</TableHead>
          <TableHead>Nama Customer</TableHead>
          <TableHead>Alamat</TableHead>
          <TableHead>Tanggal</TableHead>
          <TableHead>Penerima Tugas</TableHead>
          <TableHead>Produk</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {task.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.type}</TableCell>
            <TableCell className="truncate max-w-[150px]">
              {item.customerName}
            </TableCell>
            <TableCell className="text-sm truncate max-w-[200px]">
              {
                'Jl. Sudimoro Utara, Mojolangu, Kec. Lowokwaru, Kota Malang, Jawa Timur 65142'
              }
            </TableCell>
            <TableCell>{item.date}</TableCell>
            <TableCell>{item.receiver}</TableCell>
            <TableCell>
              <button className="flex items-center text-gray-600">
                <FaEye size={18} />
              </button>
            </TableCell>
            <TableCell>
              <Badge
                className={`${
                  item.status === 'done'
                    ? 'bg-green-500'
                    : item.status === 'pending'
                      ? 'bg-yellow-500'
                      : item.status === 'on-going'
                        ? 'bg-blue-500'
                        : 'bg-red-500'
                } w-[80px] flex justify-center`}
              >
                {item.status === 'done'
                  ? 'Selesai'
                  : item.status === 'pending'
                    ? 'Menunggu'
                    : item.status === 'on-going'
                      ? 'Berjalan'
                      : 'Gagal'}
              </Badge>
            </TableCell>
            <TableCell>
              <ActionMenu />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
