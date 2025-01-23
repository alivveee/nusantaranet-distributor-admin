'use client';

import InputField from '@/components/input-field';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from './actions';

const loginSchema = z.object({
  email: z.string().nonempty('Username harus diisi'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const methods = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (formData: LoginForm) => {
    const { error } = await login(formData);
    console.log(error);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[860px] grid grid-cols-2 items-center h-max overflow-hidden shadow-md">
        <div className="p-4">
          <CardHeader className="md:items-center">
            <CardTitle className="text-2xl">Selamat Datang</CardTitle>
            <CardDescription>
              Login menggunakan akun Anda untuk masuk
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-3 items-center"
              >
                <InputField
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Masukkan email Anda"
                />
                <InputField
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Masukkan password Anda"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="w-full m-2 bg-blue-500"
                >
                  Login
                </Button>
              </form>
            </FormProvider>
          </CardFooter>
        </div>
        <div className="flex flex-col h-full items-center justify-center gap-4 bg-gray-200">
          <div className="flex justify-center items-center rounded-full w-40 h-40 bg-white">
            <Avatar className="size-[140px]">
              <AvatarImage src="/NN Logo.jpeg" />
              <AvatarFallback>nusantara network logo</AvatarFallback>
            </Avatar>
          </div>
          <h1 className="text-center text-xl font-bold">Nusantara Network</h1>
        </div>
      </Card>
    </div>
  );
}
