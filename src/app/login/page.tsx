import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import LoginForm from './components/login-form';
import { redirect } from 'next/navigation';
import readUserSession from '@/lib/actions';
export default async function LoginPage() {
  const { data: userSession } = await readUserSession();

  if (userSession.session) {
    return redirect('/tasks');
  }

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
          <CardContent>
            <LoginForm />
          </CardContent>
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
