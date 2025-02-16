export type IProduct = {
  id: string;
  name: string;
  created_at: string;
};

export type ICustomer = {
  id: string;
  name: string;
  phone: string;
  coordinate: string;
  address: string;
  created_at: string;
};

export type IUser = {
  id: string;
  created_at: string;
  email: string;
  name: string;
  phone: string;
  role: 'admin' | 'karyawan';
};

export type ITaskProduct = {
  product_id: string;
  product_name: string;
  quantity: number;
};

export type ITask = {
  id: string;
  customer_id: string;
  asignee_id: string | null;
  created_at: string;
  type: 'pengiriman' | 'kanvassing';
  status: string;
  date: string; // Format yyyy-MM-dd
  asignee: IUser | null;
  customer: ICustomer;
  products: ITaskProduct[];
};
