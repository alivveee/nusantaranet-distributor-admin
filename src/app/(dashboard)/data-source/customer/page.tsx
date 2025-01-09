import AddCustomerDialog from './add-dialog';
import CustomersTable from './customers-table';

export default function TaskPage() {
  return (
    <div className="flex flex-col px-5 h-full">
      <div className="w-full h-[86px] py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-700">Daftar Customer</h1>
        <AddCustomerDialog />
      </div>
      <CustomersTable />
    </div>
  );
}
