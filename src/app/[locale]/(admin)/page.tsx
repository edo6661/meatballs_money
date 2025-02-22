import BarChartStackedLegend from '@/components/features/dashboard/BarChartStackedLegend'
import MultipleLineChart from '@/components/features/dashboard/MultipleLineChart'
import WrapperStackedAreaChart from '@/components/features/dashboard/WrapperStackedAreaChart'
import { FilterByDate } from '@/types/transaction_type';
import React, { Suspense } from 'react'

export default async function AdminDashboard(props: {
  searchParams?: Promise<{
    filter?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const filter = searchParams?.filter as FilterByDate;

  return (
    <div className='container'>
      <p>test</p>
      <div className="grid grid-cols-2 gap-4">
        <Suspense fallback={<div>Loading...</div>}>
          <WrapperStackedAreaChart
            filter={filter}
          />
        </Suspense>
        <MultipleLineChart />
        <BarChartStackedLegend />
      </div>
    </div>
  )
}
