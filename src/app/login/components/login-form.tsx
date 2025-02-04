'use client';
import InputField from '@/components/input-field';
import { Button } from '@/components/ui/button';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { login } from '../actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { toast } from 'sonner';
import { AuthTokenResponse } from '@supabase/supabase-js';

const loginSchema = z.object({
  email: z.string().nonempty('Username harus diisi'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();

  const methods = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (formData: LoginForm) => {
    startTransition(async () => {
      const { error } = JSON.parse(await login(formData)) as AuthTokenResponse;
      console.log(error);
      if (error) {
        toast('Gagal login', {
          description: error.code,
        });
      } else {
        toast('Login berhasil, Selamat Datang!');
      }
    });
  };

  return (
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
          disabled={isPending}
        >
          Login
        </Button>
      </form>
    </FormProvider>
  );
}
