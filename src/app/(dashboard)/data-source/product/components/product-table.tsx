import ActionMenu from '@/components/action-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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

export default function CustomersTable() {
  return (
    <Table className="border-[1px] border-gray-200">
      <TableHeader>
        <TableRow>
          <TableHead>Nomor</TableHead>
          <TableHead>Nama Produk</TableHead>
          <TableHead>Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {task.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{`00${item.id}`}</TableCell>
            <TableCell className="w-full">
              {item.customerName}
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
