import Table from '@/components/table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Ellipsis } from 'lucide-react'
import AllowancesForm from './allowances-form'

interface Allowance {
  id: number
  name: string
  employee: number
  amount: number
}

const FAKE_DATA: Allowance[] = [
  {
    id: 1,
    name: 'Meal Allowance',
    employee: 32,
    amount: 1_000_000,
  },
  {
    id: 2,
    name: 'Transportation Allowance',
    amount: 2_000_000,
    employee: 32,
  },
  {
    id: 3,
    name: 'Internet Allowance',
    employee: 32,
    amount: 500_000,
  },
]

const columnHelper = createColumnHelper<Allowance>()

const columns = [
  columnHelper.accessor('name', {
    header: () => <span>Allowance</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor('amount', {
    header: () => <span>Amount</span>,
    cell: (info) => (
      <span>
        {new Intl.NumberFormat('id', {
          style: 'currency',
          currency: 'IDR',
        }).format(info.getValue())}
      </span>
    ),
  }),
  columnHelper.accessor('employee', {
    header: () => <span>Employees</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor('id', {
    header: () => <span>Action</span>,
    cell: (info) => <Action />,
    maxSize: 80,
  }),
]

const Action = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="h-7 w-7 p-0 focus-visible:ring-0 focus-visible:ring-transparent"
          variant="ghost"
        >
          <Ellipsis className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuItem>Edit Job Level</DropdownMenuItem>

        <>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-500">
            Delete Job Level
          </DropdownMenuItem>
        </>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const Allowances = () => {
  const table = useReactTable({
    columns,
    data: FAKE_DATA,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="px-5">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xl font-semibold">Allowances</div>
        <AllowancesForm>
          <Button size="sm">Add Allowance</Button>
        </AllowancesForm>
      </div>
      <Table table={table} />
    </div>
  )
}

export default Allowances
