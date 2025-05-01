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
import { LuMapPinned } from 'react-icons/lu';
import { useTransition, useState } from 'react';
import addCustomer from '../actions';
import { toast } from 'sonner';

const taskSchema = z.object({
  name: z.string().nonempty('Nama customer harus diisi'),
  phone: z.string().nonempty('Nomor telepon harus diisi'),
  coordinate: z.string().nonempty('Koordinat harus diisi'),
  address: z.string().nonempty('Alamat harus diisi'),
});

type TaskForm = z.infer<typeof taskSchema>;

export default function AddCustomerDialog() {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const methods = useForm<TaskForm>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      name: '',
      phone: '',
      coordinate: '',
      address: '',
    },
  });

  const onAddSubmit = (data: TaskForm) => {
    startTransition(async () => {
      const result = await addCustomer(data);
      const { error } = JSON.parse(result);

      if (error) {
        toast('Gagal menambahkan customer', {
          description: error.message,
        });
      } else {
        toast('Berhasil menambahkan customer');
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
        <Button className="bg-blue-500 text-white">Tambah Customer</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[680px]">
        <DialogHeader className="border-b border-gray-300">
          <DialogTitle>Tambah Customer</DialogTitle>
        </DialogHeader>
        <DialogMainContent>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onAddSubmit)}
              className="w-full flex flex-col gap-3"
            >
              <InputField
                name="name"
                label="Nama Customer"
                type="text"
                placeholder="Masukkan nama customer"
              />
              <InputField
                name="phone"
                label="Nomor Telepon"
                type="number"
                placeholder="Masukkan nomor telepon"
              />
              <InputField
                name="coordinate"
                label="Koordinat"
                type="text"
                placeholder="Masukkan titik koordinat"
                iconButton={<LuMapPinned />}
              />
              <InputField
                name="address"
                label="Alamat"
                type="text"
                placeholder="Masukkan titik alamat"
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
