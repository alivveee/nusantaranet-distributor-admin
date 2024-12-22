import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

type MenuItem = {
  title: string;
  url: string;
};

const tasksItems: MenuItem[] = [{ title: 'Tugas', url: '#' }];
const routeItems: MenuItem[] = [
  { title: 'To-do', url: '#' },
  { title: 'On-Going', url: '#' },
  { title: 'Done', url: '#' },
];
const dataSourceItems: MenuItem[] = [
  { title: 'Customer', url: '#' },
  { title: 'Produk', url: '#' },
];
const settingsItems: MenuItem[] = [{ title: 'User', url: '#' }];

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
