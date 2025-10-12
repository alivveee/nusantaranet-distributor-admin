'use client';

import AppSidebar from '@/components/app-sidebar';
import Header from '@/components/header/header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useUserStore } from '@/lib/store/user';
import { useEffect } from 'react';

export default function DashboardClientLayout({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

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
