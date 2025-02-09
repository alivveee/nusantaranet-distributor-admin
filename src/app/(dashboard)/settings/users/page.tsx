import AddCustomerDialog from './components/add-dialog';
import CustomersTable from './components/users-table';

export default function UsersPage() {
  return (
    <div className="flex flex-col px-5 h-full">
      <div className="w-full h-[86px] py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-700">
          Daftar User
        </h1>
        <AddCustomerDialog />
      </div>
      <CustomersTable />
    </div>
  );
}
