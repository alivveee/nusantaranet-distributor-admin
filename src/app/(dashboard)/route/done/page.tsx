import ItemTaskDone from "./item-task-done";

export default function DoneRoutePage() {
  return (
    <div className="w-full min-h-full flex">
      <div className="w-[310px] p-4 flex flex-col">
        <header className="mb-3">
          <h1 className="text-lg font-semibold">Total Kunjungan (8)</h1>
        </header>
        <main className="flex-1">
          <ItemTaskDone />
          <ItemTaskDone />
          <ItemTaskDone />
          <ItemTaskDone />
          <ItemTaskDone />  
        </main>
      </div>
      <div className="flex-1 bg-slate-300">Done</div>
    </div>
  );
}
