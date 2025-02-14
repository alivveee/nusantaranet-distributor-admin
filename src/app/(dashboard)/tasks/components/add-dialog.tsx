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
import { useEffect, useState } from 'react';
import { ProductSelector } from './products-selector';
import DatePickerField from '@/components/date-picker';
import { readCustomerOptions } from '../actions';

export interface Product {
  id: string;
  name: string;
  quantity: number;
}

const taskSchema = z.object({
  type: z.string().nonempty('Jenis Tugas harus diisi'),
  customer_id: z.string().nonempty('Customer harus diisi'),
});

type TaskForm = z.infer<typeof taskSchema>;

export default function AddTaskDialog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [customerOptions, setCustomerOptions] = useState<
    { value: string; label: string }[] | undefined
  >([]);

  const typeOptions = [
    { value: 'pengiriman', label: 'pengiriman' },
    { value: 'kanvassing', label: 'kanvassing' },
  ];

  const methods = useForm<TaskForm>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      type: '',
      customer_id: '',
    },
  });

  // Fetch customer options from the server
  useEffect(() => {
    async function fetchCustomer() {
      const options = await readCustomerOptions();
      setCustomerOptions(options);
    }

    fetchCustomer();
  }, []);

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
              <div className="grid grid-cols-2 gap-4">
                <DatePickerField
                  name="date"
                  label="Tanggal Tugas"
                  placeholder="Pilih Tanggal Tugas"
                />
                <SelectField
                  name="type"
                  label="Jenis Tugas"
                  placeholder="Pilih Jenis Tugas"
                  options={typeOptions}
                />
              </div>

              <SelectField
                name="customer_id"
                label="Customer"
                placeholder="Pilih Customer"
                options={customerOptions}
              />
              <InputField
                name="coordinate"
                label="Koordinat"
                type="text"
                placeholder="Masukkan titik koordinat"
                iconButton={<LuMapPinned />}
                disabled={true}
              />
              <InputField
                name="address"
                label="Alamat"
                type="text"
                placeholder="Masukkan titik alamat"
                disabled={true}
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
