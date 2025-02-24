import Transactions from '@/components/features/transaction/Transactions'
import ValidationErrorSearchParams from '@/components/features/transaction/ValidationErrorSearchParams';
import { FilterByDate, isValidFilter, isValidTransactionType, isValidViewType, TransactionTypeWithAll, TransactionView } from '@/types/transaction_type';
import { TransactionType } from '@prisma/client';
import React, { Suspense } from 'react'

const TransactionsPage = async (
  props: {
    searchParams?: Promise<{
      page?: string;
      filter?: string;
      limit?: string;
      type?: string;
      view?: string;
    }>;
  }
) => {
  const searchParams = await props.searchParams;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const take = searchParams?.limit ? parseInt(searchParams.limit) : 12;
  const filter = searchParams?.filter ? searchParams.filter : FilterByDate.ALL;
  const type = searchParams?.type ? searchParams.type : TransactionTypeWithAll.ALL;
  const view = searchParams?.view ? searchParams.view : TransactionView.GRID;


  if (!isValidFilter(filter)) {
    return (
      <ValidationErrorSearchParams
        errorLabel="Filter"
        allowedValues={Object.values(FilterByDate)}
      />
    );
  }

  if (!isValidTransactionType(type)) {
    return (
      <ValidationErrorSearchParams
        errorLabel="Transaction type"
        allowedValues={Object.values(TransactionType)}
      />
    );
  }

  if (!isValidViewType(view)) {
    return (
      <ValidationErrorSearchParams
        errorLabel="View type"
        allowedValues={Object.values(TransactionView)}
      />
    );
  }




  return (
    <div>
      <Suspense fallback={<div>Loading Transactions...</div>}>
        <Transactions
          page={page}
          take={take}
          filter={filter as FilterByDate}
          type={type as TransactionTypeWithAll}
          view={view as TransactionView}

        />
      </Suspense>
    </div>
  )
}

export default TransactionsPage