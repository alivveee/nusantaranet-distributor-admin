'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ITaskProduct } from '@/lib/types';
import { FaEye } from 'react-icons/fa';

export default function ProductViewButton({
  products,
}: {
  products: ITaskProduct[];
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="flex items-center text-gray-600">
            <FaEye size={18} />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <table>
            {products?.map((product, idx) => (
              <tr key={idx}>
                <td className="min-w-[72px] pe-2">{product.product_name}</td>
                <td> x{product.quantity}</td>
              </tr>
            ))}
          </table>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
