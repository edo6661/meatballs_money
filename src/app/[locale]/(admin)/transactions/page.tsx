import Transactions from '@/components/features/transaction/Transactions'
import React, { Suspense } from 'react'

const TransactionsPage = async () => {

  return (
    <div>
      <Suspense fallback={<div>Loading Transactions...</div>}>
        <Transactions />
      </Suspense>
    </div>
  )
}

export default TransactionsPage