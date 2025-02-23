import BarChartStackedLegend from '@/components/features/dashboard/BarChartStackedLegend'
import FilterGraphData from '@/components/features/dashboard/FilterGraphData';
import MultipleLineChart from '@/components/features/dashboard/MultipleLineChart'
import WrapperMultipleLineChart from '@/components/features/dashboard/WrapperMultipleLineChart';
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
    <div className='container md:grid md:grid-cols-2 gap-4'>
      <Suspense fallback={<div>Loading FILTER DATA SELECT DATE</div>}>
        <FilterGraphData
        />
      </Suspense>
      <Suspense fallback={<div>STACKED AREA CHART</div>}>

        <WrapperStackedAreaChart
          filter={filter}
        />
      </Suspense>
      <Suspense
        fallback={<div>Loading MULTIPLE LINE CHART</div>}
      >
        <WrapperMultipleLineChart
          filter={filter}
        />
      </Suspense>
      <Suspense
        fallback={<div>Loading BAR CHART</div>}
      >
        <BarChartStackedLegend />

      </Suspense>

    </div>
  )
}
