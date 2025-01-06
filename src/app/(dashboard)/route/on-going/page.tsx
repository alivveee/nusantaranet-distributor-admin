import ItemTaskOnGoing from './item-task-ongoing';

export default function OnGoingRoutePage() {
  return (
    <div className="w-full min-h-full flex">
      <div className="w-[310px] p-4 flex flex-col">
        <header className="mb-3">
          <h1 className="text-lg font-semibold">Total Kunjungan (8)</h1>
        </header>
        <main className="flex-1">
          <ItemTaskOnGoing />
        </main>
      </div>
      <div className="flex-1 bg-slate-300">On Going</div>
    </div>
  );
}
