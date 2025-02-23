import Transactions from '@/components/features/transaction/Transactions'
import React, { Suspense } from 'react'

const TransactionsPage = async (
  props: {
    searchParams?: Promise<{
      page?: string;
    }>;
  }
) => {
  const searchParams = await props.searchParams;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;



  return (
    <div>
      <Suspense fallback={<div>Loading Transactions...</div>}>
        <Transactions
          page={page}

        />
      </Suspense>
    </div>
  )
}

export default TransactionsPage