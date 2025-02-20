import BarChartStackedLegend from '@/components/features/dashboard/BarChartStackedLegend'
import MultipleLineChart from '@/components/features/dashboard/MultipleLineChart'
import StackedAreaChart from '@/components/features/dashboard/StackedAreaChart'
import React from 'react'

const AdminDashboard = async () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <StackedAreaChart />
        <MultipleLineChart />
        <BarChartStackedLegend />
      </div>
    </div>
  )
}

export default AdminDashboard