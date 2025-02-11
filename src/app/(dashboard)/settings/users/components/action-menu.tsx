'use client';
import { IUser } from '@/lib/types';
import { BiSolidEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { AlertDialogDelete } from './alert-dialog';
import EditUserDialog from './edit-dialog';

export default function ActionMenu({ user }: { user: IUser }) {
  
  return (
    <div className="flex gap-1">
      <EditUserDialog
        user={user}
        Trigger={
          <button className="text-gray-600">
            <BiSolidEdit size={18} />
          </button>
        }
      />
      <AlertDialogDelete
        id={user.id}
        Trigger={
          <button
            className="text-gray-600"
          >
            <MdDelete size={18} />
          </button>
        }
      />
    </div>
  );
}
