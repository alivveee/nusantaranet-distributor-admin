export type Waypoint = {
  task_id?: string;
  name?: string;
  status: 'dibuat' | 'berjalan' | 'berhasil' | 'gagal';
  lat: number;
  lon: number;
};

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
  status: 'dibuat' | 'berjalan' | 'berhasil' | 'gagal';
  date: string; // Format yyyy-MM-dd
  asignee: IUser | null;
  customer: ICustomer;
  products: ITaskProduct[];
};

export type TaskInfo = {
  task_info: ITask;
  recipient: string | null;
  completed_coord: string | null;
  completed_at: string | null;
};

export type IRoute = {
  id: string;
  asignee_id: string;
  asignee_name: string;
  created_at: string;
  completed_at: string | null;
  tasks: TaskInfo[];
};
