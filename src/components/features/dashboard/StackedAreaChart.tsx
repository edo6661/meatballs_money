"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {

  IncomeExpenseAggregate,
  IncomeExpenseGrouped,
} from "@/types/transaction_type";
import { format } from "date-fns";
import { useTranslations } from "next-intl";

interface StackedAreaChartProps {
  data: IncomeExpenseAggregate | IncomeExpenseGrouped[] | null;
}

export default function StackedAreaChart({ data }: StackedAreaChartProps) {
  const t = useTranslations("Shared")


  let displayData: IncomeExpenseGrouped[] = [];

  if (data) {
    if (Array.isArray(data)) {
      displayData = data;
    } else {
      displayData = [
        {
          period: format(new Date(), "yyyy-MM-dd"),
          timestamp: new Date(),
          income: data.income,
          expense: data.expense,
        },
      ];
    }
  }


  // Konfigurasi chart untuk key income dan expense
  const chartConfig: ChartConfig = {
    income: {
      label: t("income"),
      color: "hsl(var(--chart-income, 120, 100%, 50%))",
    },
    expense: {
      label: t("expense"),
      color: "hsl(var(--chart-expense, 0, 100%, 50%))",
    },
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <CardTitle>
            {t("income") + " " + t("and") + " " + t("expense")}
          </CardTitle>
          <CardDescription>
            {t("income") + " " + t("and") + " " + t("expense") + " " + t("allTime")}
          </CardDescription>
        </div>

      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={displayData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="period"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="expense"
              type="natural"
              fill={chartConfig.expense.color}
              fillOpacity={0.4}
              stroke={chartConfig.expense.color}
              stackId="a"
            />
            <Area
              dataKey="income"
              type="natural"
              fill={chartConfig.income.color}
              fillOpacity={0.4}
              stroke={chartConfig.income.color}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>

    </Card>
  );
}
