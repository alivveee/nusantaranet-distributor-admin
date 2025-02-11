import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { readUsers } from '../actions';
import { IUser } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import ActionMenu from './action-menu';

export default async function UsersTable() {
  const { data: users } = await readUsers();

  return (
    <Table className="border-[1px] border-gray-200">
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Nama User</TableHead>
          <TableHead>Nomor Telepon</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Tanggal Dibuat</TableHead>
          <TableHead>Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(users as IUser[])?.map((user, idx) => (
          <TableRow key={user.id}>
            <TableCell className="w-2">{idx + 1}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.phone}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{formatDate(user.created_at)}</TableCell>
            <TableCell>
              <ActionMenu user={user} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
