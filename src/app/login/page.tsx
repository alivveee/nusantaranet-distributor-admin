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

const loginSchema = z.object({
  username: z.string().nonempty('Username harus diisi'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const methods = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginForm) => {
    console.log('Form Submitted:', data);
  };

  return (
    <div className="min-h-screen grid grid-cols-2 place-items-center p-[10vh] bg-blue-500">
      <Card className="w-[460px] p-2">
        <CardHeader className="md:items-center">
          <CardTitle className="text-2xl">Login menggunakan akun</CardTitle>
          <CardDescription>
            Masukkan username dan kata sandi Anda untuk masuk
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-3 items-center"
            >
              <InputField
                name="username"
                label="Username"
                type="text"
                placeholder="Masukkan username Anda"
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
      </Card>
      <div className="flex flex-col items-center gap-5">
        <div className="flex justify-center items-center rounded-full w-40 h-40 bg-white">
          <Avatar className="w-36 h-36">
            <AvatarImage src="/NN Logo.jpeg" />
            <AvatarFallback>nusantara network logo</AvatarFallback>
          </Avatar>
        </div>
        <h1 className="text-center text-3xl font-bold text-white">
          Nusantara Network
        </h1>
      </div>
    </div>
  );
}
