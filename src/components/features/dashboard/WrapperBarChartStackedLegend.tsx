import { getTransactionFrequencyBasedOnFilter } from '@/server/queries/transactions_query'
import { FilterByDate, filterByDateDefaultValue } from '@/types/transaction_type'
import React from 'react'
import BarChartStackedLegend from './BarChartStackedLegend'

const WrapperBarChartStackedLegend = async ({
  filter,
}: {
  filter: FilterByDate
}) => {
  const result = await getTransactionFrequencyBasedOnFilter(filter || filterByDateDefaultValue)
  return <BarChartStackedLegend data={result.data} />
}

export default WrapperBarChartStackedLegend
