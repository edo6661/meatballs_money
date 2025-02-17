import FormCreateTransaction from '@/components/transaction/FormCreateTransaction'
import { auth } from '@/lib/auth';
import { notFound } from 'next/navigation';
import React from 'react'

const CreateTransactionPage = async () => {
  const session = await auth();
  const user = session?.user;
  if (!user?.id) {
    return notFound();
  }
  return <FormCreateTransaction
    userId={user.id}

  />
}

export default CreateTransactionPage