import Transactions from '@/components/features/transaction/Transactions'
import ValidationErrorSearchParams from '@/components/features/transaction/ValidationErrorSearchParams';
import { SHARED, TRANSACTION_PAGE } from '@/constants/il8n';
import { FilterByDate, isValidFilter, isValidTransactionType, isValidViewType, TransactionTypeWithAll, TransactionView } from '@/types/transaction_type';
import { TransactionType } from '@prisma/client';
import { getTranslations } from 'next-intl/server';
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
  const t = await getTranslations(TRANSACTION_PAGE);
  const s = await getTranslations(SHARED);


  if (!isValidFilter(filter)) {
    return (
      <ValidationErrorSearchParams
        errorLabel={t("filter")}
        allowedValues={Object.values(FilterByDate)}
      />
    );
  }

  if (!isValidTransactionType(type)) {
    return (
      <ValidationErrorSearchParams
        errorLabel={`${s("transaction")} ${s("type")}`}
        allowedValues={Object.values(TransactionType)}
      />
    );
  }

  if (!isValidViewType(view)) {
    return (
      <ValidationErrorSearchParams
        errorLabel={`${s("transaction")} ${s("view")}`}
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