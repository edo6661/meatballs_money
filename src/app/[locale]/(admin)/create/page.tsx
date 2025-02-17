import FormCreateTransaction from '@/components/transaction/FormCreateTransaction'
import { redirect } from '@/i18n/routing';
import { auth } from '@/lib/auth';
import React from 'react'

const CreateTransactionPage = async () => {
  const session = await auth();
  const user = session?.user;
  if (!user?.id) {
    return redirect({
      href: "/auth/login",
      locale: "id",

    });
  }
  return <FormCreateTransaction
    userId={user.id}

  />
}

export default CreateTransactionPage