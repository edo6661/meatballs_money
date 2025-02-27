import Transactions from '@/components/features/transaction/Transactions'
import ValidationErrorSearchParams from '@/components/features/transaction/ValidationErrorSearchParams';
import { Skeleton } from '@/components/ui/skeleton';
import { SHARED, TRANSACTION_PAGE } from '@/constants/il8n';
import { FilterByDate, isValidFilter, isValidTransactionType, isValidViewType, TransactionTypeWithAll, TransactionView } from '@/types/transaction_type';
import { TransactionType } from '@prisma/client';
import { getTranslations } from 'next-intl/server';
import React, { Suspense } from 'react'
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Transactions',
  description: 'Transactions',
}


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
      <Suspense fallback={
        <div className='container space-y-12'>
          <div className='flex items-center gap-4 md:flex-nowrap flex-wrap'>
            <Skeleton
              className='w-full h-10'
            />
            <Skeleton
              className='w-full h-10'
            />
            <Skeleton
              className='w-full h-10'
            />
          </div>
          <div className='flex flex-wrap items-stretch gap-8 justify-center'>
            {view === TransactionView.GRID && (
              Array.from({ length: 12 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className='w-full max-w-96 h-[275px]' />
              ))
            )}
            <div className='flex flex-col flex-1 gap-2'>
              {view === TransactionView.TABLE && (
                Array.from({ length: 13 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className={`
                     ${i == 0 ? 'w-full h-10' : 'w-full h-16'}
                   `} />
                ))
              )}
            </div>

          </div>
        </div>
      }>

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