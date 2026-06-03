import { differenceInHours, parseISO } from 'date-fns';

export function calculateHourDifference(start: string, end: string): number {
  const startDate = parseISO(start);
  const endDate = parseISO(end);
  return differenceInHours(endDate, startDate);
}
