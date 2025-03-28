"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { TransactionFrequencyGrouped } from "@/types/transaction_type"
import { useTranslations } from "next-intl"
import { SHARED } from "@/constants/il8n"

// Ubah konfigurasi chart sesuai dengan data frekuensi transaksi
const chartConfig = {
  income: {
    label: "Income",
    color: "hsl(var(--chart-2))",
  },
  expense: {
    label: "Expense",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export default function BarChartStackedLegend({
  data,
}: {
  data: TransactionFrequencyGrouped[] | null
}) {
  // Format data untuk chart
  const chartData = data?.map((item) => ({
    period: item.period,
    income: item.income,
    expense: item.expense,
    timestamp: item.timestamp

  })) ?? []
  const t = useTranslations(SHARED)

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t("frequency") + " " + t("transaction")}

        </CardTitle>
        <CardDescription>
          {t("frequency") + " " + t("transaction") + " " + t("allTime")}

        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="period"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            // Jika ingin memformat label (misalnya menampilkan singkatan), bisa gunakan tickFormatter
            // tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="income"
              stackId="a"
              fill="var(--color-income)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="expense"
              stackId="a"
              fill="var(--color-expense)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>

    </Card>
  )
}
