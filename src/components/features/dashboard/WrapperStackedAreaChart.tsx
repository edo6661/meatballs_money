import { getIncomeAndExpenseBasedOnFilter } from '@/server/queries/transactions_query'
import { filterByDateDefaultValue } from '@/types/transaction_type';
import React from 'react'
import StackedAreaChart from './StackedAreaChart';

const WrapperStackedAreaChart = async (

) => {
  const result = await getIncomeAndExpenseBasedOnFilter(
    filterByDateDefaultValue
  );
  return <StackedAreaChart
    data={result.data}
  />
}

export default WrapperStackedAreaChart