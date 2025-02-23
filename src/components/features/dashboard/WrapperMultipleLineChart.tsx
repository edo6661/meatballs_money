import { getProfitAndLossBasedOnFilter } from '@/server/queries/transactions_query'
import { FilterByDate, filterByDateDefaultValue } from '@/types/transaction_type';
import React from 'react'
import MultipleLineChart from './MultipleLineChart';

const WrapperMultipleLineChart = async (
  { filter }: {
    filter: FilterByDate
  }
) => {
  const result = await getProfitAndLossBasedOnFilter(
    filter || filterByDateDefaultValue
  );
  return <MultipleLineChart
    data={result.data}
  />
}

export default WrapperMultipleLineChart