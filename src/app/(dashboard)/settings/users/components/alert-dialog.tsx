import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useTransition } from 'react';
import { deleteUser } from '../actions';
import { toast } from 'sonner';

export function AlertDialogDelete({
  Trigger,
  id,
}: {
  Trigger: React.ReactNode;
  id: string;
}) {
  const [isPending, startTransition] = useTransition();

  const onSubmit = () => {
    startTransition(async () => {
      const result = await deleteUser(id);
      const { error } = JSON.parse(result);

      if (error) {
        toast('Gagal menghapus user', {
          description: error.message,
        });
      } else {
        toast('Berhasil menghapus user');
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{Trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Anda yakin ingin menghapus akun?</AlertDialogTitle>
          <AlertDialogDescription>
            Ingat, Akun yang dihapus tidak dapat dikembalikan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-[120px] outline outline-1 outline-blue-500 text-blue-500 hover:bg-blue-100 hover:text-primary bg-white">
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            className="w-[120px]"
            onClick={onSubmit}
            disabled={isPending}
          >
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
