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
import { useRef, useTransition } from 'react';
import { updateCustomer } from '../actions';
import { toast } from 'sonner';
import { ICustomer } from '@/lib/types';

const taskSchema = z.object({
  name: z.string().nonempty('Nama customer harus diisi'),
  phone: z.string().nonempty('Nomor telepon harus diisi'),
  coordinate: z.string().nonempty('Koordinat harus diisi'),
  address: z.string().nonempty('Alamat harus diisi'),
});

type TaskForm = z.infer<typeof taskSchema>;

export default function AddCustomerDialog({
  Trigger,
  customer,
}: {
  Trigger: React.ReactNode;
  customer: ICustomer;
}) {
  const [isPending, startTransition] = useTransition();
  const dialogRef = useRef<HTMLButtonElement>(null);

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
        dialogRef.current?.click();
      }
    });
  };

  return (
    <Dialog>
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
                    ref={dialogRef}
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
