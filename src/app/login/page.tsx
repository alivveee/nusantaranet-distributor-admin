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
export default function LoginPage() {
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
          <form className="w-full flex flex-col gap-3 items-center">
            <InputField
              id="username"
              label="Username"
              type="text"
              placeholder="Masukkan username Anda"
            />
            <InputField
              id="password"
              label="Password"
              type="password"
              placeholder="Masukkan password Anda"
            />
            <Button type="submit" size="lg" className="w-full m-2 bg-blue-500">
              Login
            </Button>
          </form>
        </CardFooter>
      </Card>
      <div className="flex flex-col items-center gap-5">
        <div className="flex justify-center items-center rounded-full size-[160px] bg-white">
          <Avatar className="size-[140px]">
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
