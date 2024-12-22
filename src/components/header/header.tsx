'use client';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { IoIosArrowDropdown } from 'react-icons/io';
import MenuItems from './menu-items';

export default function Header() {
  return (
    <header className="w-full h-[96px] px-6 flex justify-between items-center p-4 border-b sticky top-0 bg-[#F5F5F5] z-50">
      <MenuItems />
      <div className="flex gap-1 items-center">
        <Avatar className="size-[42px]">
          <AvatarImage src="/profile-picture.svg" />
          <AvatarFallback>nusantara network profile</AvatarFallback>
        </Avatar>
        <div className="flex flex-col pr-2">
          <h1 className="font-semibold text-sm text-gray-600">Alif Ahmad</h1>
          <p className="text-sm text-gray-500">Pengelola</p>
        </div>
        <button>
          <IoIosArrowDropdown size={20} color="#6B7280" />
        </button>
      </div>
    </header>
  );
}
