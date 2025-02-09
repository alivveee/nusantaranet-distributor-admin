'use client';

import { FaMapMarkerAlt } from 'react-icons/fa';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { openGoogleMaps } from '@/lib/utils';

export default function CoordinateButton({
  coordinate,
}: {
  coordinate: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="flex items-center text-gray-600"
            onClick={() => openGoogleMaps(coordinate)}
          >
            <FaMapMarkerAlt size={18} />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{coordinate}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
