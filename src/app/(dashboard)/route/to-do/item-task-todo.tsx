import { FaMapMarkerAlt } from 'react-icons/fa';

export default function ItemTaskToDo() {
  return (
    <button className="w-full h-[42px] flex items-center justify-between border-t-[1.5px] hover:bg-gray-100">
      <div className="flex">
        <div className="h-[22px] w-[26px] bg-blue-500 text-white text-sm text-center">
          3
        </div>
        <div className="ml-3 text-sm">Task 1</div>
      </div>
      <button className="text-green-600">
        <FaMapMarkerAlt size={18} />
      </button>
    </button>
  );
}
