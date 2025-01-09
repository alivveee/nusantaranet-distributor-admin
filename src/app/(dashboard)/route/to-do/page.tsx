import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ItemTaskToDo from './item-task-todo';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function ToDoRoutePage() {
  return (
    <div className="w-full h-full flex relative">
      {/* Sidebar */}
      <div className="w-[310px] h-full flex flex-col border-r">
        <header className="p-4 ">
          <h1 className="text-lg font-semibold">
            Total Kunjungan (4)
          </h1>
        </header>
        {/* Main content of the sidebar with scroll */}
        <main className="flex-1 overflow-y-auto">
          <div className="h-max">
            <ItemTaskToDo />
            <ItemTaskToDo />
            <ItemTaskToDo />
          </div>
        </main>
        <footer className="flex flex-col gap-2 p-4 bg-white">
          <div className="flex flex-col w-full gap-1">
            <Label className="text-sm text-gray-700">Penerima Tugas</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button>Optimalkan</Button>
        </footer>
      </div>
      <div className="flex-1 bg-slate-300">To Do</div>
    </div>
  );
}
