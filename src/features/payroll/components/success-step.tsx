import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import React from 'react'
import { Pie, PieChart } from 'recharts'

const chartData = [
  { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
  { browser: 'firefox', visitors: 187, fill: 'var(--color-firefox)' },
  { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
  { browser: 'other', visitors: 90, fill: 'var(--color-other)' },
]

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  chrome: {
    label: 'Chrome',
    color: 'hsl(var(--chart-1))',
  },
  safari: {
    label: 'Safari',
    color: 'hsl(var(--chart-2))',
  },
  firefox: {
    label: 'Firefox',
    color: 'hsl(var(--chart-3))',
  },
  edge: {
    label: 'Edge',
    color: 'hsl(var(--chart-4))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig

const SuccessStep = () => {
  return (
    <div className="p-10">
      <div className="mb-8">
        <div className="font-semibold text-lg mb-1">Payroll Submitted</div>
        <div className="text-sm text-gray-400">
          We will debit Rp. 12.000.000 on July 30, and 22 employee will be paid
          at 1 Aug, make sure the funds available
        </div>
      </div>
      <div className="px-8 py-4 border border-gray-200">
        <div className="font-semibold mb-8">What Your Company Pays</div>
        <div className="grid grid-cols-[240px_1fr] gap-12">
          <ChartContainer
            config={chartConfig}
            responsiveContainerProps={{ aspect: 1 / 1, height: 240 }}
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius="80%"
                outerRadius="100%"
              />
            </PieChart>
          </ChartContainer>
          <div className="grid grid-cols-2 text-xs max-w-xs h-max my-auto -translate-y-4">
            <div className="flex items-center border-b border-gray-200 h-max py-2.5">
              <span className="mr-2 font-semibold">Salary</span>
              <span className="text-gray-400">80%</span>
            </div>
            <div className="flex items-center border-b border-gray-200 h-max py-2.5">
              <span className="mr-2 font-semibold">Taxes</span>
              <span className="text-gray-400">10%</span>
            </div>
            <div className="flex items-center border-b border-gray-200 h-max py-2.5">
              <span className="mr-2 font-semibold">Benefits</span>
              <span className="text-gray-400">5%</span>
            </div>
            <div className="flex items-center border-b border-gray-200 h-max py-2.5">
              &nbsp;
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessStep
