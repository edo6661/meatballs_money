import Transaction from '@/components/features/transaction/Transaction';
import React, { Suspense } from 'react'

type UpdateTransactionPageParams = {
  params: Promise<{ transactionId: string }>
}


const UpdateTransactionPage = async (
  { params }: UpdateTransactionPageParams
) => {

  const transactionId = (await params).transactionId;
  return <Suspense
    fallback={<div>Loading update transaction...</div>}
  >
    <Transaction
      transactionId={transactionId}
    />
  </Suspense>


}

export default UpdateTransactionPage