import FilterGraphData from '@/components/features/dashboard/FilterGraphData';
import WrapperBarChartStackedLegend from '@/components/features/dashboard/WrapperBarChartStackedLegend';
import WrapperMultipleLineChart from '@/components/features/dashboard/WrapperMultipleLineChart';
import WrapperStackedAreaChart from '@/components/features/dashboard/WrapperStackedAreaChart'
import { Skeleton } from '@/components/ui/skeleton';
import { FilterByDate } from '@/types/transaction_type';
import { Metadata } from 'next';
import React, { Suspense } from 'react'


export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Admin Dashboard',
}

export default async function AdminDashboard(props: {
  searchParams?: Promise<{
    filter?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const filter = searchParams?.filter as FilterByDate;

  return (
    <div className='container md:grid md:grid-cols-2 md:space-y-0 space-y-8 md:gap-8 gap-0 '>
      <Suspense fallback={
        // ! REPLACE
        <div>Loading FILTER DATA SELECT DATE</div>
      }>
        <FilterGraphData
        />
      </Suspense>
      <Suspense fallback={<FallbackGraph />}>

        <WrapperStackedAreaChart
          filter={filter}
        />
      </Suspense>
      <Suspense
        fallback={<FallbackGraph />}
      >
        <WrapperMultipleLineChart
          filter={filter}
        />
      </Suspense>
      <Suspense
        fallback={<FallbackGraph />}
      >
        <WrapperBarChartStackedLegend
          filter={filter}
        />

      </Suspense>

    </div>
  )
}


const FallbackGraph = () => {
  return (
    <div className="w-full h-96 flex flex-col relative">
      <div className="mx-6 space-y-1.5 my-6 flex-1 flex flex-col">
        <Skeleton className="w-1/2 h-8" />
        <Skeleton className="w-1/2 h-6" />
        <Skeleton className="w-full flex-1" />
      </div>
      <Skeleton className="absolute w-full h-full" />
    </div>
  )
}