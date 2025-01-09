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

const taskSchema = z.object({
  username: z.string().nonempty('Username harus diisi'),
  employeeName: z.string().nonempty('Nama karyawan harus diisi'),
  phone: z.string().nonempty('Nomor telepon harus diisi'),
  password: z.string().nonempty('Password harus diisi'),
});

type TaskForm = z.infer<typeof taskSchema>;

export default function AddCustomerDialog() {
  const methods = useForm<TaskForm>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      username: '',
      employeeName: '',
      phone: '',
      password: '',
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
      <DialogContent className="max-w-[680px]">
        <DialogHeader className="border-b border-gray-300">
          <DialogTitle>Tambah Akun Karyawan</DialogTitle>
        </DialogHeader>
        <DialogMainContent>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-3"
            >
              <InputField
                name="username"
                label="Username"
                type="text"
                placeholder="Masukkan username"
              />
              <InputField
                name="employeeName"
                label="Nama Karyawan"
                type="text"
                placeholder="Masukkan nama karyawan"
              />
              <InputField
                name="phone"
                label="Nomor Telepon"
                type="text"
                placeholder="Masukkan nomor telepon karyawan"
              />
              <InputField
                name="password"
                label="Password"
                type="text"
                placeholder="Masukkan password karyawan"
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
