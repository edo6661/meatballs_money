"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  FilterByDate,
  filterByDateDefaultValue,
  IncomeExpenseAggregate,
  IncomeExpenseGrouped,
} from "@/types/transaction_type";
import { SelectFilter } from "./SelectFilter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";

interface StackedAreaChartProps {
  data: IncomeExpenseAggregate | IncomeExpenseGrouped[] | null;
}

export default function StackedAreaChart({ data }: StackedAreaChartProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: FilterByDate) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('filter', term);
    } else {
      params.delete('filter');
    }
    replace(`${pathname}?${params.toString()}`);
  }


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
      label: "Income",
      color: "hsl(var(--chart-income, 120, 100%, 50%))",
    },
    expense: {
      label: "Expense",
      color: "hsl(var(--chart-expense, 0, 100%, 50%))",
    },
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <CardTitle>Pengeluaran dan Pendapatan</CardTitle>
          <CardDescription>
            Pengeluaran dan pendapatan all time
          </CardDescription>
        </div>
        <div>
          <SelectFilter
            filter={
              searchParams.get('filter') as FilterByDate || filterByDateDefaultValue
            }
            onChangeFilter={(val) => handleSearch(val)}
          />
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
      <CardFooter>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          {displayData.length > 0
            ? `${format(displayData[0].timestamp!, "dd/MM/yyyy")} - ${format(
              displayData[displayData.length - 1].timestamp!,
              "dd/MM/yyyy"
            )}`
            : "No data"}
        </div>

      </CardFooter>
    </Card>
  );
}
