import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

type MenuItem = {
  title: string;
  url: string;
};

const tasksItems: MenuItem[] = [{ title: 'Tugas', url: '#' }];
const routeItems: MenuItem[] = [
  { title: 'Rencana', url: '/route/to-do' },
  { title: 'Berjalan', url: '/route/on-going' },
  { title: 'Selesai', url: '/route/done' },
];
const dataSourceItems: MenuItem[] = [
  { title: 'Customer', url: '/data-source/customer' },
  { title: 'Produk', url: '/data-source/product' },
];
const settingsItems: MenuItem[] = [{ title: 'Akun Karyawan', url: '/settings/users' }];

export function useMenuItems() {
  const pathname = usePathname();

  // Map pathname to the correct array
  const menuItems = useMemo(() => {
    if (pathname.startsWith('/tasks')) {
      return tasksItems;
    } else if (pathname.startsWith('/route')) {
      return routeItems;
    } else if (pathname.startsWith('/data-source')) {
      return dataSourceItems;
    } else if (pathname.startsWith('/settings')) {
      return settingsItems;
    }
    return [];
  }, [pathname]);

  return menuItems;
}
