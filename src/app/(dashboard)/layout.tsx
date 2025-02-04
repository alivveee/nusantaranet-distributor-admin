import AppSidebar from '@/components/app-sidebar';
import Header from '@/components/header/header';
import { SidebarProvider } from '@/components/ui/sidebar';
import readUserSession from '@/lib/actions';
import { redirect } from 'next/navigation';


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: userSession } = await readUserSession();

  if (!userSession.session) {
    return redirect('/login');
  }

  return (
    <div className="flex h-screen w-full">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-1 h-full flex-col">
          <Header />
          <main className="flex-1 h-full overflow-auto">{children}</main>
        </div>
      </SidebarProvider>
    </div>
  );
}
