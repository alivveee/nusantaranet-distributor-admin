'use client';
import { ICustomer} from '@/lib/types';
import { BiSolidEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import EditCustomerDialog from './edit-dialog';
import { useTransition } from 'react';
import { deleteCustomer } from '../actions';
import { toast } from 'sonner';

export default function ActionMenu({ customer }: { customer: ICustomer }) {
  const [isPending, startTransition] = useTransition();

  const onSubmit = () => {
    startTransition(async () => {
      const result = await deleteCustomer(customer.id);
      const { error } = JSON.parse(result);

      if (error) {
        toast('Gagal menghapus customer', {
          description: error.message,
        });
      } else {
        toast('Berhasil menghapus customer');
      }
    });
  };
  return (
    <div className="flex gap-1">
      <EditCustomerDialog
        customer={customer}
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
