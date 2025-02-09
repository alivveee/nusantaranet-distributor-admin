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
    phone: '087812203910',
    receiver: 'Rizky',
    product: 'Router',
    status: 'done',
  },
  {
    id: 2,
    type: 'Kanvassing',
    customerName: 'Bpk Agus Mustofa',
    phone: '087812203910',
    receiver: 'Agus',
    product: 'Splicer',
    status: 'pending',
  },
];

export default function UsersTable() {
  return (
    <Table className="border-[1px] border-gray-200">
      <TableHeader>
        <TableRow>
          <TableHead>Username</TableHead>
          <TableHead>Nama Karyawan</TableHead>
          <TableHead>Nomor Telepon</TableHead>
          <TableHead>Password</TableHead>
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
              {item.phone}
            </TableCell>
            <TableCell>{'karyawan1'}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
