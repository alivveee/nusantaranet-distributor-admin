import { BiSolidEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';

export default function ActionMenu() {
  return (
    <div className="flex gap-1">
      <button className='text-gray-600'>
        <BiSolidEdit size={18}/>
      </button>
      <button className='text-gray-600'>
        <MdDelete size={18}/>
      </button>
    </div>
  );
}
