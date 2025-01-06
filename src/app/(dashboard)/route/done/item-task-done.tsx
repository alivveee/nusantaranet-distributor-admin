export default function ItemTaskDone() {
    return (
      <button className="w-full h-[64px] flex items-center justify-between border-t-[1.5px] hover:bg-gray-100">
        <div className="flex flex-col ">
          <h1 className="text-gray-700 text-sm">Selasa, 17 Agustus 2018</h1>
          <p className="text-sm text-gray-500 text-start">Jhon Snow</p>
        </div>
        <p className="text-sm font-semibold text-green-500">Berhasil 3/6</p>
      </button>
    );
  }
  