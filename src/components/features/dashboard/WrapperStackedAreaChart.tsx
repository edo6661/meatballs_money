import { getIncomeAndExpenseBasedOnFilter } from '@/server/queries/transactions_query'
import { FilterByDate, filterByDateDefaultValue } from '@/types/transaction_type';
import React from 'react'
import StackedAreaChart from './StackedAreaChart';

const WrapperStackedAreaChart = async (
  { filter }: {
    filter: FilterByDate
  }
) => {
  const result = await getIncomeAndExpenseBasedOnFilter(
    filter || filterByDateDefaultValue
  );
  return <StackedAreaChart
    data={result.data}
  />
}

export default WrapperStackedAreaChart