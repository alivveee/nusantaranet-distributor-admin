import CoordinateButton from '@/components/coordinate-button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ICustomer } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { readCustomers } from '../actions';
import ActionMenu from './action-menu';

export default async function CustomersTable() {
  const { data: customers } = await readCustomers();

  return (
    <Table className="border-[1px] border-gray-200">
      <TableHeader>
        <TableRow>
          <TableHead>Nomor</TableHead>
          <TableHead>Nama Customer</TableHead>
          <TableHead>Nomor Telepon</TableHead>
          <TableHead>Alamat</TableHead>
          <TableHead>Koordinat</TableHead>
          <TableHead>Tanggal Ditambahkan</TableHead>
          <TableHead>Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(customers as ICustomer[])?.map((customer, idx) => (
          <TableRow key={customer.id}>
            <TableCell className="w-2">{idx + 1}</TableCell>
            <TableCell className="truncate max-w-[150px]">
              {customer.name}
            </TableCell>
            <TableCell className="text-sm ">{customer.phone}</TableCell>
            <TableCell>{customer.address}</TableCell>
            <TableCell>
              <CoordinateButton coordinate={customer.coordinate} />
            </TableCell>
            <TableCell>{formatDate(customer.created_at)}</TableCell>
            <TableCell>
              <ActionMenu customer={customer} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
