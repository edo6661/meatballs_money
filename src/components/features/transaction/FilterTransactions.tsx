"use client"
import { FilterByDate, filterByTransactionTypeOptions, TransactionTypeWithAll, TransactionView, transactionViewOptions } from '@/types/transaction_type'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { SelectFilter } from '../dashboard/SelectFilter'
import { SelectOption } from '@/components/shared/SelectOption'
import { useTranslations } from 'next-intl'
import { SHARED, TRANSACTION_PAGE } from '@/constants/il8n'

const FilterTransactions = (
  { type, filter, view }: { type: TransactionTypeWithAll, filter: FilterByDate, view: TransactionView }
) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleFilter(filter: FilterByDate) {
    const params = new URLSearchParams(searchParams);
    if (filter) {
      params.set('filter', filter);
    } else {
      params.delete('filter');
    }
    replace(`${pathname}?${params.toString()}`);
  }
  function handleType(type: string) {
    const params = new URLSearchParams(searchParams);
    if (type) {
      params.set('type', type);
    } else {
      params.delete('type');
    }
    replace(`${pathname}?${params.toString()}`);
  }
  function handleView(view: string) {
    const params = new URLSearchParams(searchParams);
    if (view) {
      params.set('view', view);
    } else {
      params.delete('view');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  const t = useTranslations(TRANSACTION_PAGE)
  const s = useTranslations(SHARED)

  return (
    <div className='flex items-center gap-8'>
      <SelectFilter
        filter={
          searchParams.get('filter') as FilterByDate || filter
        }
        onChangeFilter={(val) => handleFilter(val)}
      />
      <SelectOption
        options={filterByTransactionTypeOptions}
        defaultValue={type}
        label={`${s("transaction")} ${t("type")}`}
        onValueChange={
          (type) => handleType(type)
        }
        placeholder={t("typeOf")}

      />
      <SelectOption
        options={transactionViewOptions}
        defaultValue={view}
        label={t("viewOf")}
        onValueChange={
          (view) => handleView(view)
        }
        placeholder={t("viewOf")}

      />
    </div>
  )
}

export default FilterTransactions