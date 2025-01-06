'use client';

import SelectField from '@/components/select-field';
import { Button } from '@/components/ui/button';
import {
  DialogClose,
  DialogHeader,
  DialogMainContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@/components/input-field';
import { LuMapPinned } from 'react-icons/lu';
import { useState } from 'react';
import { ProductSelector } from './products-selector';

const typeOptions = [
  { value: '1', label: 'Pengiriman' },
  { value: '2', label: 'Kanvassing' },
];
const custOptions = [
  { value: '1', label: 'PT. ABECE' },
  { value: '2', label: 'PT. DEEEF' },
  { value: '3', label: 'PT. GEHAI' },
  { value: '4', label: 'PT. JIKEL' },
];

export interface Product {
  id: string;
  name: string;
  quantity: number;
}

const taskSchema = z.object({
  type: z.string().nonempty('Jenis Tugas harus diisi'),
  customer: z.string().nonempty('Customer harus diisi'),
  coordinate: z.string().nonempty('Koordinat harus diisi'),
  address: z.string().nonempty('Alamat harus diisi'),
  product: z.string(),
});

type TaskForm = z.infer<typeof taskSchema>;

export default function AddTaskDialog() {
  const [products, setProducts] = useState<Product[]>([]);

  const methods = useForm<TaskForm>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      type: '',
      customer: '',
      coordinate: '',
      address: '',
      product: '',
    },
  });

  const handleProductChange = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
  };

  const onSubmit = (data: TaskForm) => {
    console.log('Form Submitted:', data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 text-white">Tambah Tugas</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[680px]">
        <DialogHeader className="border-b border-gray-300">
          <DialogTitle>Tambah Tugas</DialogTitle>
        </DialogHeader>
        <DialogMainContent>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-3"
            >
              <SelectField
                name="type"
                label="Jenis Tugas"
                placeholder="Pilih Jenis Tugas"
                options={typeOptions}
              />
              <SelectField
                name="customer"
                label="Customer"
                placeholder="Pilih Customer"
                options={custOptions}
              />
              <InputField
                name="coordinate"
                label="Koordinat"
                type="text"
                placeholder="Masukkan titik koordinat"
                iconButton={<LuMapPinned />}
                onIconClick={() => alert('Search clicked!')}
              />
              <InputField
                name="address"
                label="Alamat"
                type="text"
                placeholder="Masukkan titik alamat"
              />
              <div className="w-full flex justify-between">
                <div className="w-full pr-4 flex gap-2 items-end">
                  <ProductSelector
                    products={products}
                    onProductsChange={handleProductChange}
                  />
                </div>
                <div className="flex gap-3 mt-2 items-end">
                  <DialogClose asChild>
                    <Button
                      type="button"
                      className="w-[120px] outline outline-1 outline-blue-500 text-blue-500 hover:bg-blue-100 bg-white"
                    >
                      Batal
                    </Button>
                  </DialogClose>

                  <Button
                    type="submit"
                    className=" w-[120px] bg-blue-500 text-white"
                  >
                    Simpan
                  </Button>
                </div>
              </div>
            </form>
          </FormProvider>
        </DialogMainContent>
      </DialogContent>
    </Dialog>
  );
}
