import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Minus, Plus, Trash2, ListPlus } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import { Label } from '@/components/ui/label';
import { deleteTaskProduct, readProductOptions } from '../actions';
import { Input } from '@/components/ui/input';
import { ITaskProduct } from '@/lib/types';
import { toast } from 'sonner';

interface ProductSelectorProps {
  products: ITaskProduct[];
  onProductsChange: (updatedProducts: ITaskProduct[]) => void;
  taskId?: string; // Task ID for which the product is being selected.
}

export function ProductSelector({
  products,
  onProductsChange,
  taskId,
}: ProductSelectorProps) {
  const [isLoading, startTransition] = useTransition();
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [productOptions, setProductOptions] = useState<
    { value: string; label: string }[] | undefined
  >([]);

  // Fetch product productOptions from the server
  useEffect(() => {
    async function fetchProducts() {
      const productOptions = await readProductOptions();
      setProductOptions(productOptions);
    }

    fetchProducts();
  }, []);

  const addProduct = () => {
    const productToAdd = productOptions?.find(
      (p) => p.value === selectedProduct
    );
    if (
      productToAdd &&
      !products.some((p) => p.product_id === selectedProduct)
    ) {
      onProductsChange([
        ...products,
        {
          product_id: selectedProduct,
          product_info: {
            name: productToAdd.label,
          },
          quantity: 1,
        }, // Default quantity 0
      ]);
    }
  };

  const updateQuantity = (id: string, value: number) => {
    onProductsChange(
      products.map((product) =>
        product.product_id === id
          ? { ...product, quantity: Math.max(0, value) }
          : product
      )
    );
  };

  const handleInputChange = (
    id: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue =
      event.target.value === '' ? 0 : parseInt(event.target.value, 10);
    updateQuantity(id, isNaN(newValue) ? 0 : newValue);
  };

  const removeProduct = (id: string) => {
    onProductsChange(products.filter((product) => product.product_id !== id));
    if (taskId) {
      startTransition(async () => {
        const result = await deleteTaskProduct(taskId, id);
        const { error } = JSON.parse(result);

        if (error) {
          toast('Gagal menghapus produk', {
            description: error.essage,
          });
          console.error(error.message);
        } else {
          toast('Berhasil menghapus produk');
        }
      });
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md gap-2">
      <Label className="font-medium text-sm text-gray-700">Produk</Label>
      <div className="flex gap-2">
        <Select value={selectedProduct} onValueChange={setSelectedProduct}>
          <SelectTrigger className="flex-1 bg-gray-50">
            <SelectValue placeholder="Pilih Produk" />
          </SelectTrigger>
          <SelectContent>
            {productOptions?.map((option) => (
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
          <ListPlus />
        </Button>
      </div>

      <div className="space-y-2">
        {products.map((product) => (
          <div
            key={product.product_id}
            className="flex items-center justify-between p-1 border rounded-lg"
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeProduct(product.product_id)}
              className="text-gray-500 hover:text-red-500"
              disabled={isLoading}
            >
              <Trash2 />
            </Button>

            <span className="flex-1 px-4 text-sm">
              {product.product_info?.name}
            </span>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() =>
                  updateQuantity(product.product_id, product.quantity - 1)
                }
                disabled={product.quantity === 0}
              >
                <Minus />
              </Button>

              {/* Input Field untuk jumlah produk */}
              <Input
                type="number"
                className="max-w-14 text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                value={product.quantity || ''}
                onChange={(event) =>
                  handleInputChange(product.product_id, event)
                }
              />

              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() =>
                  updateQuantity(product.product_id, product.quantity + 1)
                }
              >
                <Plus />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
