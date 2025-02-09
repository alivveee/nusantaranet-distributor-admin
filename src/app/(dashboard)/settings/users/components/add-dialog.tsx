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
import SelectField from '@/components/select-field';

const taskSchema = z
  .object({
    email: z.string().nonempty('Email harus diisi'),
    name: z.string().nonempty('Nama user harus diisi'),
    phone: z.string().nonempty('Nomor telepon harus diisi'),
    role: z.string().nonempty('Role harus diisi'),
    password: z.string().min(6, 'Password minimal 6 karakter'),
    confirm: z.string().min(6, 'Konfirmasi password minimal 6 karakter'),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Password tidak cocok',
    path: ['confirm'],
  });

type TaskForm = z.infer<typeof taskSchema>;

export default function AddCustomerDialog() {
  const methods = useForm<TaskForm>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      email: '',
      name: '',
      phone: '',
      role: 'staff',
      password: '',
      confirm: '',
    },
  });

  const onSubmit = (data: TaskForm) => {
    console.log('Form Submitted:', data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 text-white">Tambah Akun</Button>
      </DialogTrigger>
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
                    { value: 'staff', label: 'Karyawan' },
                  ]}
                />
              </div>
              <InputField
                name="password"
                label="Password"
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
