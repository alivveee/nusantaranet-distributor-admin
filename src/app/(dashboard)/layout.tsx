import AppSidebar from '@/components/app-sidebar';
import Header from '@/components/header/header';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
