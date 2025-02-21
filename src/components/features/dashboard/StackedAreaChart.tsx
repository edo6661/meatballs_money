"use client";

import { TrendingUp } from "lucide-react"
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
  IncomeExpenseAggregate,
  IncomeExpenseGrouped,
} from "@/types/transaction_type";

interface StackedAreaChartProps {
  data: IncomeExpenseAggregate | IncomeExpenseGrouped[] | null;
}

export default function StackedAreaChart({ data }: StackedAreaChartProps) {
  // const [selected,setSelectedDate] = useState<FilterByDate>(filterByDateDefaultValue);

  // Persiapkan data untuk chart
  let displayData: IncomeExpenseGrouped[] = [];

  if (data) {
    if (Array.isArray(data)) {
      displayData = data;
    } else {
      displayData = [
        {
          month: new Date().toISOString().slice(0, 7),
          income: data.income,
          expense: data.expense,
        },
      ];
    }
  }

  console.log(displayData);

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
          {/* <SelectFilter
            filter={selected}
            onChangeFilter={(val) => setSelected(val as FilterByDate)}
          /> */}
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
              dataKey="month"
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
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              <TrendingUp size={16} />
              <span>{displayData.length > 0 ? displayData[0].income : 0}</span>
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {displayData.length > 0
                ? `${displayData[0].month} - ${displayData[displayData.length - 1].month}`
                : "No data"}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
