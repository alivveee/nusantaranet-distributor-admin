import readUserSession from '@/lib/actions';
import { redirect } from 'next/navigation';
import DashboardClientLayout from './layout-client';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: userSession } = await readUserSession();

  if (!userSession.session) {
    redirect('/login');
  }

  return (
    <DashboardClientLayout user={userSession.session.user}>
      {children}
    </DashboardClientLayout>
  );
}
