'use client';
import InputField from '@/components/input-field';
import SelectField from '@/components/select-field';
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
import { IUser } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { updateUser } from '../actions';

const taskSchema = z
  .object({
    email: z.string().nonempty('Email harus diisi'),
    name: z.string().nonempty('Nama user harus diisi'),
    phone: z.string().nonempty('Nomor telepon harus diisi'),
    role: z.enum(['admin', 'karyawan']),
    password: z.string().optional(),
    confirm: z.string().optional(),
  })
  .refine(
    (data) => {
      // Jika password diisi, pastikan panjangnya minimal 6 karakter
      if (data.password && data.password.length > 0) {
        return data.password.length >= 6;
      }
      // Jika tidak diisi, dianggap valid
      return true;
    },
    {
      message: 'Password must be at least 6 characters long', // Pesan error
      path: ['password'], // Path untuk error
    }
  )
  .refine(
    (data) => data.confirm === data.password, // Validasi konfirmasi password
    {
      message: "Password doesn't match", // Pesan error
      path: ['confirm'], // Path untuk error
    }
  );

type TaskForm = z.infer<typeof taskSchema>;

export default function EditUserDialog({
  user,
  Trigger,
}: {
  user: IUser;
  Trigger: React.ReactNode;
}) {
  const [isLoading, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const methods = useForm<TaskForm>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role,
      password: '',
      confirm: '',
    },
  });

  const onSubmit = (data: TaskForm) => {
    startTransition(async () => {
      const result = await updateUser(user.id, data);

      const { error } = JSON.parse(result);

      if (error) {
        toast('Gagal mengupdate user', {
          description: error.message,
        });
      } else {
        toast('Berhasil mengupdate user');
        methods.reset(); // Reset form setelah berhasil mengupdate user
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
      <DialogTrigger asChild>{Trigger}</DialogTrigger>
      <DialogContent className="max-w-[585px]">
        <DialogHeader className="border-b border-gray-300">
          <DialogTitle>Tambah User</DialogTitle>
        </DialogHeader>
        <DialogMainContent>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-3"
            >
              <InputField
                name="email"
                label="Email"
                type="email"
                placeholder="Masukkan email"
              />
              <InputField
                name="name"
                label="Nama User"
                type="text"
                placeholder="Masukkan nama user"
              />
              <div className="flex gap-4">
                <InputField
                  name="phone"
                  label="Nomor Telepon"
                  type="number"
                  placeholder="Masukkan nomor telepon karyawan"
                />
                <SelectField
                  name="role"
                  label="Role"
                  placeholder="Pilih Role"
                  options={[
                    { value: 'admin', label: 'Admin' },
                    { value: 'karyawan', label: 'Karyawan' },
                  ]}
                />
              </div>
              <InputField
                name="password"
                label="Ubah Password"
                type="password"
                placeholder="Masukkan password karyawan"
              />
              <InputField
                name="confirm"
                label="Konfirmasi Password"
                type="password"
                placeholder="Masukkan konfirmasi password"
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
                  className="w-[120px] bg-blue-500 text-white"
                  disabled={isLoading}
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
