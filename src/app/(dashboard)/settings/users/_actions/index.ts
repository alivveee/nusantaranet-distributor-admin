'use server';

import readUserSession from '@/lib/actions';
import { createSupbaseAdmin } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath, unstable_noStore } from 'next/cache';

export default async function createUser(data: {
  email: string;
  name: string;
  phone: string;
  role: 'admin' | 'karyawan';
  password: string;
  confirm: string;
}) {
  const supabase = await createSupbaseAdmin();

  //create account
  const createResult = await supabase.auth.admin.createUser({
    email: data.email,
    password: data.password,
    email_confirm: true,
    user_metadata: {
      role: data.role,
    },
  });

  if (createResult.error?.message) {
    return JSON.stringify(createResult);
  } else {
    //create member
    const usersResult = await supabase.from('users').insert({
      id: createResult.data?.user?.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
    });

    revalidatePath('settings/users');
    return JSON.stringify(usersResult);
  }
}

export async function updateUser(
  id: string,
  data: {
    email: string;
    name: string;
    phone: string;
    role: 'admin' | 'karyawan';
    password?: string | undefined;
    confirm?: string | undefined;
  }
) {
  const { data: userSession } = await readUserSession();
  // admin only
  if (userSession.session?.user?.user_metadata.role !== 'admin') {
    return JSON.stringify({
      error: { message: 'Anda bukan admin!' },
    });
  }

  const updateAccount: {
    email: string;
    user_metadata: {
      role: 'admin' | 'karyawan';
    };
    password?: string | undefined;
    confirm?: string | undefined;
  } = {
    email: data.email,
    user_metadata: {
      role: data.role,
    },
  };

  if (data.password && data.confirm) {
    updateAccount.password = data.password;
    updateAccount.confirm = data.confirm;
  }

  const supabaseAdmin = await createSupbaseAdmin();

  //update account
  const updateResult = await supabaseAdmin.auth.admin.updateUserById(
    id,
    updateAccount
  );
  if (updateResult.error?.message) {
    return JSON.stringify(updateResult);
  } else {
    //update userr
    const supabase = await createClient();
    const userResult = await supabase
      .from('users')
      .update({
        email: data.email,
        name: data.name,
        phone: data.phone,
        role: data.role,
      })
      .eq('id', id);

    revalidatePath('settings/users');
    return JSON.stringify(userResult);
  }
}

export async function deleteUser(id: string) {
  const { data: userSession } = await readUserSession();

  //Admin only
  if (userSession.session?.user?.user_metadata.role !== 'admin') {
    return JSON.stringify({
      error: { message: 'Anda bukan admin!' },
    });
  }

  const supabaseAdmin = await createSupbaseAdmin();

  const deleteResult = await supabaseAdmin.auth.admin.deleteUser(id);

  if (deleteResult.error?.message) {
    return JSON.stringify(deleteResult);
  } else {
    //delete user
    const supabase = await createClient();
    const userResult = await supabase.from('users').delete().eq('id', id);
    revalidatePath('settings/users');
    return JSON.stringify(userResult);
  }
}

export async function readUsers() {
  unstable_noStore();

  const supabase = await createClient();
  const result = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: true });

  return result;
}
