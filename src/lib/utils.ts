import { clsx, type ClassValue } from 'clsx';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
  return format(new Date(dateString), 'dd MMMM yyyy', { locale: id });
}

export function openGoogleMaps(coordinate?: string) {
  const url = `https://www.google.com/maps?q=${coordinate}`;
  if (coordinate) {
    window.open(url, '_blank');
  }
}
