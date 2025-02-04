import AddProductDialog from './components/add-dialog';
import CustomersTable from './components/product-table';

export default function TaskPage() {
  return (
    <div className="flex flex-col px-4 h-full">
      <div className="w-full h-[86px] py-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-700">Daftar Produk</h1>
        <AddProductDialog />
      </div>
      <CustomersTable />
    </div>
  );
}
