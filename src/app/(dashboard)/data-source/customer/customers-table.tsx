import ActionMenu from '@/components/action-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { FaMapMarkerAlt } from 'react-icons/fa';

const task = [
  {
    id: 1,
    type: 'Pengiriman',
    customerName: 'The Com',
    date: '087812203910',
    receiver: 'Rizky',
    product: 'Router',
    status: 'done',
  },
  {
    id: 2,
    type: 'Kanvassing',
    customerName: 'Bpk Agus Mustofa',
    date: '087812203910',
    receiver: 'Agus',
    product: 'Splicer',
    status: 'pending',
  },
  {
    id: 3,
    type: 'Pengiriman',
    customerName: 'PT Interkoneksi',
    date: '087812203910',
    receiver: 'Abdul',
    product: 'Router',
    status: 'on-going',
  },
  {
    id: 4,
    type: 'Perbaikan',
    customerName: 'PT Interkoneksi',
    date: '087812203910',
    receiver: 'Abdul',
    product: 'Router',
    status: 'failed',
  },
  {
    id: 5,
    type: 'Pengiriman',
    customerName: 'PT Interkoneksi',
    date: '087812203910',
    receiver: 'Abdul',
    product: 'Router',
    status: 'done',
  },
  {
    id: 6,
    type: 'Pengiriman',
    customerName: 'PT Interkoneksi',
    date: '087812203910',
    receiver: 'Abdul',
    product: 'Router',
    status: 'done',
  },
  {
    id: 7,
    type: 'Pengiriman',
    customerName: 'PT Interkoneksi',
    date: '087812203910',
    receiver: 'Abdul',
    product: 'Router',
    status: 'done',
  },
  {
    id: 8,
    type: 'Pengiriman',
    customerName: 'PT Interkoneksi',
    date: '087812203910',
    receiver: 'Abdul',
    product: 'Router',
    status: 'done',
  },
  {
    id: 9,
    type: 'Pengiriman',
    customerName: 'PT Interkoneksi',
    date: '087812203910',
    receiver: 'Abdul',
    product: 'Router',
    status: 'done',
  },
  {
    id: 10,
    type: 'Pengiriman',
    customerName: 'PT Interkoneksi',
    date: '087812203910',
    receiver: 'Abdul',
    product: 'Router',
    status: 'done',
  },
];

export default function CustomersTable() {
  return (
    <Table className="border-[1px] border-gray-200">
      <TableHeader>
        <TableRow>
          <TableHead>Nomor</TableHead>
          <TableHead>Nama Customer</TableHead>
          <TableHead>Alamat</TableHead>
          <TableHead>Nomor Telepon</TableHead>
          <TableHead>Koordinat</TableHead>
          <TableHead>Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {task.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{`00${item.id}`}</TableCell>
            <TableCell className="truncate max-w-[150px]">
              {item.customerName}
            </TableCell>
            <TableCell className="text-sm truncate max-w-[200px]">
              {
                'Jl. Sudimoro Utara, Mojolangu, Kec. Lowokwaru, Kota Malang, Jawa Timur 65142'
              }
            </TableCell>
            <TableCell>{item.date}</TableCell>
            <TableCell>
              <button className="flex items-center text-gray-600">
                <FaMapMarkerAlt size={18} />
              </button>
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
