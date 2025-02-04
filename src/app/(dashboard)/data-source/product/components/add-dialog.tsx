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
import { useTransition } from 'react';
import addProduct from '../actions';
import { toast } from 'sonner';

const productchema = z.object({
  name: z.string().nonempty('Nama produk harus diisi'),
});

type TaskForm = z.infer<typeof productchema>;

export default function AddProductDialog() {
  const [isPending, startTransition] = useTransition();
  const methods = useForm<TaskForm>({
    resolver: zodResolver(productchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = (data: TaskForm) => {
    startTransition(async () => {
      const result = await addProduct(data);
      const { error } = JSON.parse(result);

      if (error) {
        toast('Gagal menambahkan produk', {
          description: error.message,
        });
      } else {
        toast('Berhasil menambahkan produk');
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 text-white">Tambah Produk</Button>
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
                name="name"
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
                  disabled={isPending}
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
