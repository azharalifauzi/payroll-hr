import Layout from '@/components/layout'
import Link from '@/components/link'
import { withGlobalProviders } from '@/components/providers'
import Table from '@/components/table'
import { Button } from '@/components/ui/button'
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import dayjs from 'dayjs'
import { Play } from 'lucide-react'
import { AnnualPayrollSummary } from './components/annual-payroll-summary'
import Card from './components/card'

interface Payroll {
  periodFrom: string
  periodTo: string
  totalPayroll: number
  totalAmount: number
  paidAt: string
  id: number
}

const FAKE_DATA: Payroll[] = [
  {
    id: 1,
    paidAt: dayjs().startOf('month').toISOString(),
    periodFrom: dayjs().subtract(1, 'month').startOf('month').toISOString(),
    periodTo: dayjs().subtract(1, 'month').endOf('month').toISOString(),
    totalAmount: 200_000_000,
    totalPayroll: 22,
  },
  {
    id: 2,
    paidAt: dayjs().subtract(1, 'month').startOf('month').toISOString(),
    periodFrom: dayjs().subtract(2, 'month').startOf('month').toISOString(),
    periodTo: dayjs().subtract(2, 'month').endOf('month').toISOString(),
    totalAmount: 220_000_000,
    totalPayroll: 22,
  },
  {
    id: 3,
    paidAt: dayjs().subtract(2, 'month').startOf('month').toISOString(),
    periodFrom: dayjs().subtract(3, 'month').startOf('month').toISOString(),
    periodTo: dayjs().subtract(3, 'month').endOf('month').toISOString(),
    totalAmount: 180_000_000,
    totalPayroll: 22,
  },
]

const columnHelper = createColumnHelper<Payroll>()

const columns = [
  columnHelper.accessor('periodFrom', {
    header: () => <span>Payroll Period</span>,
    cell: (info) => (
      <div>
        <div className="font-semibold">
          Monthly Salary: {dayjs(info.getValue()).format('MMM Do')}-
          {dayjs(info.row.original.periodTo).format('Do, YYYY')}
        </div>
        <div className="text-xs text-gray-400">Regular</div>
      </div>
    ),
    maxSize: 120,
  }),
  columnHelper.accessor('totalPayroll', {
    header: () => (
      <span className="block w-full text-center">Employee Paid</span>
    ),
    cell: (info) => (
      <span className="block w-full text-center">
        {new Intl.NumberFormat('id-ID').format(info.getValue())}
      </span>
    ),
    maxSize: 80,
  }),
  columnHelper.accessor('totalAmount', {
    header: () => <span>Total Payment</span>,
    cell: (info) => (
      <span>
        {new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
        }).format(info.getValue())}
      </span>
    ),
  }),
  columnHelper.accessor('paidAt', {
    header: () => <span>Pay Date</span>,
    cell: (info) => (
      <span>{dayjs(info.getValue()).format('MMM Do, YYYY')}</span>
    ),
    maxSize: 80,
  }),
  columnHelper.accessor('id', {
    header: () => <span>Action</span>,
    cell: (info) => (
      <Link
        to={`/payroll/${info.getValue()}`}
        className="hover:text-blue-800 text-blue-500"
      >
        View details
      </Link>
    ),
    maxSize: 80,
  }),
]

const StaffFeature = () => {
  const table = useReactTable({
    data: FAKE_DATA,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-xl font-semibold mb-1">Payroll</div>
          <div className="text-sm text-gray-500">
            Generate and send payroll to account.
          </div>
        </div>
        <Button size="sm" className="px-4" asChild>
          <Link to="/payroll/run">
            <Play className="h-4 w-4 mr-2" />
            Run Monthly Payroll
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <Card
            amount="5.205.350,00"
            title="Gross salary this month"
            color="yellow"
            diff={2}
          />
          <Card
            amount="4.205.350,00"
            title="Net salary this month"
            color="blue"
            diff={1.5}
          />
          <Card
            amount="800.000,00"
            title="Total tax this month"
            color="orange"
            diff={-3.2}
          />
          <Card
            amount="200.000,00"
            title="Other expenses this month"
            color="purple"
            diff={-2}
          />
        </div>
        <AnnualPayrollSummary />
      </div>
      <Table table={table} />
    </Layout>
  )
}

export default withGlobalProviders(StaffFeature)
