"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Menampilkan keuntungan dan kerugian untuk periode yang dipilih
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
