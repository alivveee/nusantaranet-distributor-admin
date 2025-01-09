'use client';
import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogHeader,
  DialogMainContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@/components/input-field';

const productchema = z.object({
  productName: z.string().nonempty('Nama produk harus diisi'),
});

type TaskForm = z.infer<typeof productchema>;

export default function AddCustomerDialog() {
  const methods = useForm<TaskForm>({
    resolver: zodResolver(productchema),
    defaultValues: {
      productName: '',
    },
  });

  const onSubmit = (data: TaskForm) => {
    console.log('Form Submitted:', data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 text-white">Tambah Tugas</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[680px]">
        <DialogHeader className="border-b border-gray-300">
          <DialogTitle>Tambah Tugas</DialogTitle>
        </DialogHeader>
        <DialogMainContent>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-3"
            >
              <InputField
                name="productName"
                label="Nama Produk"
                type="text"
                placeholder="Masukkan nama produk"
              />
                <div className="flex gap-3 mt-2 justify-center">
                  <DialogClose asChild>
                    <Button
                      type="button"
                      className="w-[120px] outline outline-1 outline-blue-500 text-blue-500 hover:bg-blue-100 bg-white"
                    >
                      Batal
                    </Button>
                  </DialogClose>

                  <Button
                    type="submit"
                    className=" w-[120px] bg-blue-500 text-white"
                  >
                    Simpan
                  </Button>
                </div>
            </form>
          </FormProvider>
        </DialogMainContent>
      </DialogContent>
    </Dialog>
  );
}
