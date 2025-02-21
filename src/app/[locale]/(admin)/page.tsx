import BarChartStackedLegend from '@/components/features/dashboard/BarChartStackedLegend'
import MultipleLineChart from '@/components/features/dashboard/MultipleLineChart'
import WrapperStackedAreaChart from '@/components/features/dashboard/WrapperStackedAreaChart'
import React, { Suspense } from 'react'

const AdminDashboard = async () => {
  return (
    <div className='container'>
      <p>test</p>
      <div className="grid grid-cols-2 gap-4">
        <Suspense fallback={<div>Loading...</div>}>
          <WrapperStackedAreaChart />
        </Suspense>
        <MultipleLineChart />
        <BarChartStackedLegend />
      </div>
    </div>
  )
}

export default AdminDashboard