import MainContainer from '../../main-container';
import AddUserDialog from './components/add-dialog';
import UsersTable from './components/users-table';

export default function UsersPage() {
  return (
    <MainContainer>
      <div className="w-full h-[86px] py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-700">Daftar Akun Karyawan</h1>
        <AddUserDialog />
      </div>
      <UsersTable />
    </MainContainer>
  );
}
