import Transaction from '@/components/features/transaction/Transaction';
import React, { Suspense } from 'react'

import { Metadata } from 'next';
import TemporaryLoading from '@/components/shared/TemporaryLoading';


export const metadata: Metadata = {
  title: 'Update Transaction',
  description: 'Update a transaction',
}


type UpdateTransactionPageParams = {
  params: Promise<{ transactionId: string }>
}


const UpdateTransactionPage = async (
  { params }: UpdateTransactionPageParams
) => {

  const transactionId = (await params).transactionId;
  return <Suspense
    fallback={
      <TemporaryLoading
        text="Temporary loading form update transaction ..."
      />}
  >
    <Transaction
      transactionId={transactionId}
    />
  </Suspense>


}

export default UpdateTransactionPage