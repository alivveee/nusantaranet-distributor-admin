import AppSidebar from '@/components/app-sidebar';
import Header from '@/components/header/header';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex w-full flex-col h-screen">
        <Header />
        <main className="grid flex-1 items-start bg-muted/40">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
