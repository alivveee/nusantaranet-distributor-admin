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
import { IProduct } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { updateProduct } from '../actions';

const productchema = z.object({
  name: z.string().nonempty('Nama produk harus diisi'),
});

type TaskForm = z.infer<typeof productchema>;

export default function EditProductDialog({
  Trigger,
  product,
}: {
  Trigger: React.ReactNode;
  product: IProduct;
}) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const methods = useForm<TaskForm>({
    resolver: zodResolver(productchema),
    defaultValues: {
      name: product.name,
    },
  });

  const onSubmit = (data: TaskForm) => {
    startTransition(async () => {
      const result = await updateProduct(product.id, data);
      const { error } = JSON.parse(result);

      if (error) {
        toast('Gagal mengupdate produk', {
          description: error.message,
        });
      } else {
        toast('Berhasil mengupdate produk');
        methods.reset(); // Reset form
        setIsOpen(false); // Close dialog
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
      <DialogTrigger asChild>{Trigger}</DialogTrigger>
      <DialogContent className="max-w-[680px]">
        <DialogHeader className="border-b border-gray-300">
          <DialogTitle>Edit Produk</DialogTitle>
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
