import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { Product } from './add-dialog';
import { Label } from '@/components/ui/label';

interface ProductSelectorProps {
  products: Product[];
  onProductsChange: (updatedProducts: Product[]) => void;
}

export function ProductSelector({
  products,
  onProductsChange,
}: ProductSelectorProps) {
  const [selectedProduct, setSelectedProduct] = useState<string>('');

  const productOptions = [
    { value: 'router-a', label: 'Router A' },
    { value: 'router-b', label: 'Router B' },
    { value: 'splicer', label: 'Splicer' },
  ];

  const addProduct = () => {
    const productToAdd = productOptions.find(
      (p) => p.value === selectedProduct
    );
    if (productToAdd && !products.some((p) => p.id === selectedProduct)) {
      onProductsChange([
        ...products,
        { id: selectedProduct, name: productToAdd.label, quantity: 0 },
      ]);
    }
  };

  const updateQuantity = (id: string, increment: number) => {
    onProductsChange(
      products.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(0, product.quantity + increment) }
          : product
      )
    );
  };

  const removeProduct = (id: string) => {
    onProductsChange(products.filter((product) => product.id !== id));
  };

  return (
    <div className=" flex flex-col w-full max-w-md gap-2">
      <Label className="font-medium text-sm text-gray-700">Produk</Label>
      <div className="flex gap-2">
        <Select value={selectedProduct} onValueChange={setSelectedProduct}>
          <SelectTrigger className="flex-1 bg-gray-50">
            <SelectValue placeholder="Pilih Produk" />
          </SelectTrigger>
          <SelectContent>
            {productOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={addProduct}
          className="shrink-0 h-9 w-9"
        >
          <Plus />
        </Button>
      </div>

      <div className="space-y-2">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-2 border rounded-lg"
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeProduct(product.id)}
              className="text-gray-500 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            <span className="flex-1 px-4 text-sm">{product.name}</span>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(product.id, -1)}
                disabled={product.quantity === 0}
              >
                <Minus className="h-4 w-4" />
              </Button>

              <span className="w-8 text-center">{product.quantity}</span>

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(product.id, 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
