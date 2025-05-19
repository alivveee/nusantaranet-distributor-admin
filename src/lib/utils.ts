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

export function openGoogleMaps(
  coordinate?: {
    latitude: number;
    longitude: number;
  },
  stringCoordinate?: string
) {
  // Jika ada stringCoordinate, gunakan stringCoordinate
  if (stringCoordinate) {
    const [lat, lon] = stringCoordinate.split(',').map(Number);
    window.open(`https://www.google.com/maps?q=${lat},${lon}`, '_blank');
    return;
  }
  if (!coordinate) return;
  // Jika tidak ada stringCoordinate, gunakan latitude dan longitude dari coordinate
  const { latitude, longitude } = coordinate;
  const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
  window.open(url, '_blank');
}
