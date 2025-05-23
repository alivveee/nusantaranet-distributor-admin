'use client';
import { ICustomer } from '@/lib/types';
import { BiSolidEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { DeleteAlertDialog } from './alert-dialog';
import EditCustomerDialog from './edit-dialog';

export default function ActionMenu({ customer }: { customer: ICustomer }) {
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

      <DeleteAlertDialog
        Trigger={
          <button className="text-gray-600">
            <MdDelete size={18} />
          </button>
        }
        id={customer.id}
      />
    </div>
  );
}
