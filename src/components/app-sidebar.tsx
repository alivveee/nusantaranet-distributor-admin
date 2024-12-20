'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar';
import { BiTask } from 'react-icons/bi';
import { MdOutlineRoute } from 'react-icons/md';
import { AiFillDatabase, AiFillSetting } from 'react-icons/ai';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

// Menu items.
const items = [
  {
    title: 'Tugas',
    url: '/tasks',
    icon: BiTask,
  },
  {
    title: 'Rute',
    url: '/route',
    icon: MdOutlineRoute,
  },
  {
    title: 'Sumber Data',
    url: '/data-source',
    icon: AiFillDatabase,
  },
  {
    title: 'Pengaturan',
    url: '/settings',
    icon: AiFillSetting,
  },
];

export default function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar className="w-[256px]">
      <SidebarHeader>
        <div className="flex gap-2 justify-center p-4 mb-1">
          <Image
            src="/sidebar-minilogo.svg"
            alt="logo"
            width="25"
            height="25"
          />
          <h1 className="text-lg font-semibold text-gray-500">
            Nusantara Network
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-4">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild size="lg" className="h-10">
                <a
                  href={item.url}
                  className={`flex gap-2 py-2 px-4 rounded-lg ${
                    pathname === item.url ? 'bg-blue-100 ' : 'text-gray-500'
                  }`}
                >
                  <item.icon
                    style={{
                      width: '22px',
                      height: '22px',
                      color: pathname === item.url ? '#0C7FDA' : '#6B7280',
                    }}
                  />
                  <span
                    className={
                      pathname === item.url
                        ? 'font-semibold text-[#0C7FDA]'
                        : 'font-medium text-gray-500'
                    }
                  >
                    {item.title}
                  </span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
