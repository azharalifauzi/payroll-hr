'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
const chartData = [
  { month: 'January', netSalary: 186, tax: 80, other: 70 },
  { month: 'February', netSalary: 305, tax: 200, other: 30 },
  { month: 'March', netSalary: 237, tax: 120, other: 50 },
  { month: 'April', netSalary: 250, tax: 190, other: 60 },
  { month: 'May', netSalary: 209, tax: 130, other: 80 },
  { month: 'June', netSalary: 214, tax: 140, other: 100 },
]

const chartConfig = {
  netSalary: {
    label: 'Net Salary',
    color: 'hsl(var(--chart-1))',
  },
  tax: {
    label: 'Tax',
    color: 'hsl(var(--chart-2))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig

export function AnnualPayrollSummary() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg leading-none">
          Annual payroll summary
        </CardTitle>
        <CardDescription className="text-xs">
          January - June 2024
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="netSalary"
              stackId="a"
              fill="var(--color-netSalary)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="tax"
              stackId="a"
              fill="var(--color-tax)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="other"
              stackId="a"
              fill="var(--color-other)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
