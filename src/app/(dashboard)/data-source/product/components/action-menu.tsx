'use client';
import { IProduct } from '@/lib/types';
import { BiSolidEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import EditProductDialog from './edit-dialog';
import { useTransition } from 'react';
import { deleteProduct } from '../actions';
import { toast } from 'sonner';

export default function ActionMenu({ product }: { product: IProduct }) {
  const [isPending, startTransition] = useTransition();

  const onSubmit = () => {
    startTransition(async () => {
      const result = await deleteProduct(product.id);
      const { error } = JSON.parse(result);

      if (error) {
        toast('Gagal menghapus produk', {
          description: error.message,
        });
      } else {
        toast('Berhasil menghapus produk');
      }
    });
  };
  return (
    <div className="flex gap-1">
      <EditProductDialog
        product={product}
        Trigger={
          <button className="text-gray-600">
            <BiSolidEdit size={18} />
          </button>
        }
      />

      <button className="text-gray-600" onClick={onSubmit} disabled={isPending}>
        <MdDelete size={18} />
      </button>
    </div>
  );
}
