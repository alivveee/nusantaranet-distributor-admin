import { FaMapMarkerAlt } from 'react-icons/fa';

interface ItemTaskProps {
  order: number;
  custName: string;
}

export default function ItemTaskToDo({ order, custName }: ItemTaskProps) {
  return (
    <button className="w-full h-[42px] px-4 flex flex-row items-center border-t-[1.5px] hover:bg-gray-100">
      <div className="flex flex-1 items-center">
        <div className="h-[22px] w-[26px] bg-blue-500 text-white text-sm text-center flex items-center justify-center">
          {order}
        </div>
        <div className="ml-3 text-sm max-w-[204px] truncate">
          {custName}
        </div>
      </div>
      <div className="text-green-600 flex items-center">
        <FaMapMarkerAlt size={18} />
      </div>
    </button>
  );
}
