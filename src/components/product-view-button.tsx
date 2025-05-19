'use client';

import { PopoverButton } from '@/components/popover-button';
import { ITaskProduct } from '@/lib/types';

export default function ProductViewButton({
  products,
}: {
  products: ITaskProduct[];
}) {
  return (
    <PopoverButton
      content={
        products?.length > 0 ? (
          <table>
            <tbody>
              {products.map((product, idx) => (
                <tr key={idx}>
                  <td className="min-w-[72px] pe-2 text-sm">
                    {product.product_info.name}
                  </td>
                  <td className="text-sm"> x{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-sm">tidak ada produk</p>
        )
      }
    >
      <a className="text-blue-500 text-sm hover:underline">lihat</a>
    </PopoverButton>
  );
}
