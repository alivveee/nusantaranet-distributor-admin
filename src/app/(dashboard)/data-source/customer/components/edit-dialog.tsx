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
import { ICustomer } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { LuMapPinned } from 'react-icons/lu';
import { toast } from 'sonner';
import { z } from 'zod';
import { updateCustomer } from '../actions';

const taskSchema = z.object({
  name: z.string().nonempty('Nama customer harus diisi'),
  phone: z.string().nonempty('Nomor telepon harus diisi'),
  coordinate: z.string().nonempty('Koordinat harus diisi'),
  address: z.string().nonempty('Alamat harus diisi'),
});

type TaskForm = z.infer<typeof taskSchema>;

export default function EditCustomerDialog({
  Trigger,
  customer,
}: {
  Trigger: React.ReactNode;
  customer: ICustomer;
}) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const methods = useForm<TaskForm>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      name: customer.name,
      phone: customer.phone,
      coordinate: customer.coordinate,
      address: customer.address,
    },
  });

  const onSubmit = (data: TaskForm) => {
    startTransition(async () => {
      const result = await updateCustomer(customer.id, data);
      const { error } = JSON.parse(result);

      if (error) {
        toast('Gagal mengupdate customer', {
          description: error.message,
        });
      } else {
        toast('Berhasil mengupdate customer');
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
          <DialogTitle>Tambah Customer</DialogTitle>
        </DialogHeader>
        <DialogMainContent>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
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
                onIconClick={() => alert('Search clicked!')}
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
