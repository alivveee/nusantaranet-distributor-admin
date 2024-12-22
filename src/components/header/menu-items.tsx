import { useMenuItems } from '@/hooks/use-menu-items';
import Link from 'next/link';

export default function MenuItems() {
  const menuItems = useMenuItems();
  return (
    <div className="flex gap-4 px-3">
      {menuItems.map((item) => (
        <Link
          key={item.title}
          href={item.url}
          className="text-sm font-semibold text-gray-500"
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
}
