import AddCustomerDialog from './add-dialog';
import CustomersTable from './product-table';

export default function TaskPage() {
  return (
    <div className="flex flex-col px-4 h-full">
      <div className="w-full h-[86px] py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-700">Daftar Tugas</h1>
        <AddCustomerDialog />
      </div>
      <CustomersTable />
    </div>
  );
}
