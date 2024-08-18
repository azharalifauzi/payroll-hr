import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import Table from '@/components/table'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface Employee {
  name: string
  grossSalary: number
  allowances: {
    name: string
    amount: number
  }[]
  deductions: {
    name: string
    amount: number
  }[]
  netSalary: number
  id: number
}

const FAKE_DATA: Employee[] = [
  {
    id: 1,
    name: 'John Doe',
    grossSalary: 10_000_000,
    allowances: [
      {
        name: 'Lunch Allowance',
        amount: 1_000_000,
      },
    ],
    deductions: [
      {
        name: 'BPJS Kesehatan',
        amount: 100_000,
      },
      {
        name: 'PPh 21',
        amount: 670_000,
      },
    ],
    netSalary: 10_800_000,
  },
  {
    id: 2,
    name: 'Thomas Lee',
    grossSalary: 10_000_000,
    allowances: [
      {
        name: 'Lunch Allowance',
        amount: 1_000_000,
      },
    ],
    deductions: [
      {
        name: 'BPJS Kesehatan',
        amount: 100_000,
      },
      {
        name: 'PPh 21',
        amount: 670_000,
      },
    ],
    netSalary: 10_800_000,
  },
]

const columnHelper = createColumnHelper<Employee>()

const columns = [
  columnHelper.accessor('id', {
    header: () => (
      <span className="h-full flex items-center">
        <Checkbox />
      </span>
    ),
    cell: (info) => (
      <span className="h-full flex items-center">
        <Checkbox />
      </span>
    ),
    maxSize: 20,
  }),
  columnHelper.accessor('name', {
    header: () => <span>Employees</span>,
    cell: (info) => <span className="font-semibold">{info.getValue()}</span>,
    maxSize: 120,
  }),
  columnHelper.accessor('grossSalary', {
    header: () => <span className="block w-full text-right">Gross Salary</span>,
    cell: (info) => (
      <span className="block w-full text-right">
        {new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
        }).format(info.getValue())}
      </span>
    ),
    maxSize: 80,
  }),
  columnHelper.accessor('allowances', {
    header: () => <span className="block w-full text-right">Allowances</span>,
    cell: (info) => (
      <HoverCard>
        <HoverCardTrigger>
          <span className="block w-full text-right decoration-dotted underline cursor-pointer">
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
            }).format(
              info.getValue().reduce((acc, val) => acc + val.amount, 0)
            )}
          </span>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="font-semibold text-sm mb-2">Allowances Detail</div>
          <ul className="list-disc pl-4 grid gap-1">
            {info.getValue().map((a) => (
              <li key={a.name} className="text-xs">
                {a.name} :{' '}
                {new Intl.NumberFormat('id-ID', {
                  currency: 'IDR',
                  style: 'currency',
                }).format(a.amount)}
              </li>
            ))}
          </ul>
        </HoverCardContent>
      </HoverCard>
    ),
  }),
  columnHelper.accessor('deductions', {
    header: () => <span className="block w-full text-right">Deductions</span>,
    cell: (info) => (
      <HoverCard>
        <HoverCardTrigger>
          <span className="block w-full text-right decoration-dotted underline cursor-pointer">
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
            }).format(
              info.getValue().reduce((acc, val) => acc + val.amount, 0)
            )}
          </span>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="font-semibold text-sm mb-2">Deductions Detail</div>
          <ul className="list-disc pl-4 grid gap-1">
            {info.getValue().map((d) => (
              <li key={d.name} className="text-xs">
                {d.name} :{' '}
                {new Intl.NumberFormat('id-ID', {
                  currency: 'IDR',
                  style: 'currency',
                }).format(d.amount)}
              </li>
            ))}
          </ul>
        </HoverCardContent>
      </HoverCard>
    ),
    maxSize: 80,
  }),
  columnHelper.accessor('netSalary', {
    header: () => (
      <span className="block w-full text-right pr-4">Net Salary</span>
    ),
    cell: (info) => (
      <span className="block w-full text-right pr-4">
        {new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
        }).format(info.getValue())}
      </span>
    ),
    maxSize: 80,
  }),
]

const EmployeeEarningStep = () => {
  const table = useReactTable({
    columns,
    getCoreRowModel: getCoreRowModel(),
    data: FAKE_DATA,
  })

  return (
    <>
      <div className="px-4">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <div className="font-semibold text-lg mb-1">Employee Earnings</div>
            <div className="text-sm text-gray-400">
              Select employee to include in this payroll
            </div>
          </div>
          <form className="relative w-full max-w-[300px]">
            <Search className="absolute top-1/2 -translate-y-1/2 left-2.5 h-5 w-5 text-gray-500" />
            <Input placeholder="Search employee" className="pl-10" />
          </form>
        </div>
      </div>
      <Table table={table} />
    </>
  )
}

export default EmployeeEarningStep
