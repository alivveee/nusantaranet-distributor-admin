interface ItemTaskDoneProps {
  route: {
    id: string;
    date: string;
    recipient: string;
  };
  onSelect: (id: string) => void;
}

export default function ItemRouteDone({ route, onSelect }: ItemTaskDoneProps) {
  return (
    <button
      onClick={() => onSelect(route.id)}
      className="w-full h-[64px] px-4 flex items-center justify-between border-t-[1.5px] hover:bg-gray-100"
    >
      <div className="flex flex-col">
        <h1 className="text-gray-700 text-sm">{route.date}</h1>
        <p className="text-sm text-gray-500 text-start">{route.recipient}</p>
      </div>
      <p className="text-sm font-semibold text-green-500">Berhasil 3/6</p>
    </button>
  );
}
