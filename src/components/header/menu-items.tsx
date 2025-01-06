import { useMenuItems } from '@/hooks/use-menu-items';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function MenuItems() {
  const menuItems = useMenuItems();
  const pathname = usePathname();
  return (
    <div className="flex gap-4 px-3">
      {menuItems.map((item) => (
        <Link
          key={item.title}
          href={item.url}
          className={`text-sm font-semibold h-8 mb-[-10px] ${pathname.endsWith(`/${item.url.split('/')[2]}`) ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
}
