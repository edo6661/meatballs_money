"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { ProfitLossGrouped } from "@/types/transaction_type"

// Ubah konfigurasi chart sesuai dengan data profit & loss
const chartConfig = {
  profit: {
    label: "Profit",
    color: "hsl(var(--chart-2))",
  },
  loss: {
    label: "Loss",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export default function MultipleLineChart({
  data,
}: {
  data: ProfitLossGrouped[] | null
}) {
  // Format data untuk chart
  const chartData = data?.map((item) => ({
    period: item.period,
    profit: item.profit,
    loss: item.loss,
    timestamp: item.timestamp,
  })) ?? []

  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart - Multiple</CardTitle>
        <CardDescription>Keuntungan dan kerugian bulanan</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="period"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            // Opsional: bisa diformat jika ingin menampilkan singkatan
            // tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="profit"
              type="monotone"
              stroke="var(--color-profit)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="loss"
              type="monotone"
              stroke="var(--color-loss)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>

    </Card>
  )
}
