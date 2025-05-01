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
import { toast } from 'sonner';
import { deleteTask } from '../actions';

export function AlertDialogDelete({
  Trigger,
  id,
}: {
  Trigger: React.ReactNode;
  id: string;
}) {
  const [isPending, startTransition] = useTransition();

  const onDeleteSubmit = () => {
    startTransition(async () => {
      const result = await deleteTask(id);
      const { error } = JSON.parse(result);

      if (error) {
        toast('Gagal menghapus tugas', {
          description: error.message,
        });
      } else {
        toast('Berhasil menghapus tugas');
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{Trigger}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Anda yakin ingin menghapus customer?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Ingat, Customer yang dihapus tidak dapat dikembalikan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="btn-cancel">Batal</AlertDialogCancel>
          <AlertDialogAction
            className="btn-submit"
            onClick={onDeleteSubmit}
            disabled={isPending}
          >
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
