'use client';
import InputField from '@/components/input-field';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogMainContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import addProduct from '../actions';

const productchema = z.object({
  name: z.string().nonempty('Nama produk harus diisi'),
});

type TaskForm = z.infer<typeof productchema>;

export default function AddProductDialog() {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const methods = useForm<TaskForm>({
    resolver: zodResolver(productchema),
    defaultValues: {
      name: '',
    },
  });

  const onAddSubmit = (data: TaskForm) => {
    startTransition(async () => {
      const result = await addProduct(data);
      const { error } = JSON.parse(result);

      if (error) {
        toast('Gagal menambahkan produk', {
          description: error.message,
        });
      } else {
        toast('Berhasil menambahkan produk');
        methods.reset(); // Reset form setelah berhasil menambahkan customer
        setIsOpen(false); // Tutup dialog
      }
    });
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      methods.reset(); // Reset form ketika dialog tertutup
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 text-white">Tambah Produk</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[680px]">
        <DialogHeader className="border-b border-gray-300">
          <DialogTitle>Tambah Produk</DialogTitle>
        </DialogHeader>
        <DialogMainContent>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onAddSubmit)}
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
                    className="btn-cancel"
                  >
                    Batal
                  </Button>
                </DialogClose>

                <Button
                  type="submit"
                  className="btn-submit"
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
