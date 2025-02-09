import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { readProducts } from '../actions';
import { IProduct } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import ActionMenu from './action-menu';

export default async function CustomersTable() {
  const { data: products } = await readProducts();

  return (
    <Table className="border-[1px] border-gray-200">
      <TableHeader>
        <TableRow>
          <TableHead>Nomor</TableHead>
          <TableHead>Nama Produk</TableHead>
          <TableHead>Tanggal Ditambahkan</TableHead>
          <TableHead>Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(products as IProduct[])?.map((product, idx) => (
          <TableRow key={product.id}>
            <TableCell className='w-2'>{idx + 1}</TableCell>
            <TableCell >{product.name}</TableCell>
            <TableCell >{formatDate(product.created_at)}</TableCell>
            <TableCell>
              <ActionMenu product={product} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
