'use client';
import { ITask } from '@/lib/types';
import { BiSolidEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { DeleteAlertDialog } from './alert-dialog';
import EditTaskDialog from './edit-dialog';

export default function ActionMenu({ task }: { task: ITask }) {
  return (
    <div className="flex gap-1">
      <EditTaskDialog
        task={task}
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
        id={task.id}
      />
    </div>
  );
}
