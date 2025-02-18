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
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@/components/input-field';
import { LuMapPinned } from 'react-icons/lu';
import { useEffect, useState, useTransition } from 'react';
import { ProductSelector } from './products-selector';
import DatePickerField from '@/components/date-picker';
import addTask, { readCustomerOptions, updateTask } from '../actions';
import { ICustomer, ITask, ITaskProduct } from '@/lib/types';
import { readCustomerById } from '../../data-source/customer/actions';
import { openGoogleMaps } from '@/lib/utils';
import { toast } from 'sonner';

const taskSchema = z.object({
  type: z.enum(['pengiriman', 'kanvassing']),
  customer_id: z.string().nonempty('Customer harus diisi'),
  date: z.string().nonempty('Tanggal harus diisi'),
});

type TaskForm = z.infer<typeof taskSchema>;

export default function EditTaskDialog({
  task,
  Trigger,
}: {
  task: ITask;
  Trigger: React.ReactNode;
}) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<ITaskProduct[]>([]);
  const [customerOptions, setCustomerOptions] = useState<
    { value: string; label: string }[] | undefined
  >([]);
  const [customerDetail, setCustomerDetail] = useState<ICustomer | undefined>();

  const typeOptions = [
    { value: 'pengiriman', label: 'pengiriman' },
    { value: 'kanvassing', label: 'kanvassing' },
  ];

  const methods = useForm<TaskForm>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      type: task.type,
      customer_id: task.customer_id,
      date: task.date,
    },
  });

  const customerId = useWatch({
    control: methods.control,
    name: 'customer_id',
  });

  // Fetch customer detail from the server
  useEffect(() => {
    async function fetchCustomerDetail() {
      const customer = await readCustomerById(customerId);
      setCustomerDetail(customer);
    }
    if (customerId) {
      fetchCustomerDetail();
    }
  }, [customerId]);

  // Fetch customer options from the server
  useEffect(() => {
    async function fetchCustomers() {
      const options = await readCustomerOptions();
      setCustomerOptions(options);
    }

    fetchCustomers();
  }, []);

  const handleProductChange = (updatedProducts: ITaskProduct[]) => {
    setProducts(updatedProducts);
  };

  const onSubmit = (data: TaskForm) => {
    startTransition(async () => {
      const result = await updateTask(task.id, data, products);
      const { error } = JSON.parse(result);

      if (error) {
        toast('Gagal mengupdate tugas', {
          description: error.essage,
        });
        console.error(error.message);
      } else {
        toast('Berhasil mengupdate tugas');
        methods.reset(); // Reset form setelah berhasil menambahkan customer
        setIsOpen(false); // Tutup dialog
        setProducts([]);
      }
    });
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      methods.reset(); // Reset form ketika dialog tertutup
      setProducts([]);
    }
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{Trigger}</DialogTrigger>
      <DialogContent className="max-w-[680px]">
        <DialogHeader className="border-b border-gray-300">
          <DialogTitle>Edit Tugas</DialogTitle>
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
                defaultValue={customerDetail?.coordinate}
                placeholder="Masukkan titik koordinat"
                iconButton={<LuMapPinned />}
                onIconClick={() => {
                  openGoogleMaps(customerDetail?.coordinate);
                }}
                disabled={true}
              />
              <InputField
                name="address"
                label="Alamat"
                type="text"
                defaultValue={customerDetail?.address}
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
                    disabled={isPending}
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
