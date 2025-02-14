import MainContainer from '../main-container';
import AddTaskDialog from './components/add-dialog';
import TaskTable from './components/task-table';

export default function TaskPage() {
  return (
    <MainContainer>
      <div className="w-full h-[86px] py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-700">Daftar Tugas</h1>
        <AddTaskDialog />
      </div>
      <TaskTable />
    </MainContainer>
  );
}
