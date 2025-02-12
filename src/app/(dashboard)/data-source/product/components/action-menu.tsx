'use client';
import { IProduct } from '@/lib/types';
import { BiSolidEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import EditProductDialog from './edit-dialog';
import { AlertDialogDelete } from './alert-dialog';

export default function ActionMenu({ product }: { product: IProduct }) {
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
      <AlertDialogDelete
        id={product.id}
        Trigger={
          <button className="text-gray-600">
            <MdDelete size={18} />
          </button>
        }
      />
    </div>
  );
}
