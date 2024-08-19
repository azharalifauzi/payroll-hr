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
import React from 'react'

interface Level {
  id: number
  name: string
  employee: number
}

const FAKE_DATA: Level[] = [
  {
    id: 1,
    name: 'C-Level',
    employee: 1,
  },
  {
    id: 2,
    name: 'Manager',
    employee: 12,
  },
  {
    id: 3,
    name: 'Senior Manager',
    employee: 5,
  },
  {
    id: 4,
    name: 'Director',
    employee: 3,
  },
]

const columnHelper = createColumnHelper<Level>()

const columns = [
  columnHelper.accessor('name', {
    header: () => <span>Level</span>,
    cell: (info) => <span>{info.getValue()}</span>,
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

const JobLevel = () => {
  const table = useReactTable({
    columns,
    data: FAKE_DATA,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="px-5">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xl font-semibold">Job Level</div>
        <Button size="sm">Add Job Level</Button>
      </div>
      <Table table={table} />
    </div>
  )
}

export default JobLevel
