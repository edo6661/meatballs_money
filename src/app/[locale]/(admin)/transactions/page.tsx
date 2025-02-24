import Transactions from '@/components/features/transaction/Transactions'
import { FilterByDate, isValidFilter, isValidTransactionType } from '@/types/transaction_type';
import { TransactionType } from '@prisma/client';
import React, { Suspense } from 'react'

const TransactionsPage = async (
  props: {
    searchParams?: Promise<{
      page?: string;
      filter?: string;
      limit?: string;
      type?: string;
    }>;
  }
) => {
  const searchParams = await props.searchParams;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const take = searchParams?.limit ? parseInt(searchParams.limit) : 12;
  const filter = searchParams?.filter ? searchParams.filter : FilterByDate.ALL;
  const type = searchParams?.type ? searchParams.type : null;


  if (!isValidFilter(filter)) {
    return (
      <div>
        <h2>Error</h2>
        <p>Filter tidak valid. Nilai yang diperbolehkan: {Object.values(FilterByDate).join(", ")}</p>
      </div>
    );
  }

  if (!isValidTransactionType(type)) {
    return (
      <div>
        <h2>Error</h2>
        <p>Transaction type tidak valid. Nilai yang diperbolehkan: {Object.values(TransactionType).join(", ")}</p>
      </div>
    );
  }


  return (
    <div>
      <Suspense fallback={<div>Loading Transactions...</div>}>
        <Transactions
          page={page}
          take={take}
          filter={filter as FilterByDate}
          type={type as TransactionType}

        />
      </Suspense>
    </div>
  )
}

export default TransactionsPage