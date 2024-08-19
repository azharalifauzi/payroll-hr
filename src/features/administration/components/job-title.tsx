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

interface Title {
  id: number
  name: string
  level: string
  employee: number
}

const FAKE_DATA: Title[] = [
  {
    id: 1,
    name: 'CEO',
    level: 'C-Level',
    employee: 1,
  },
  {
    id: 2,
    name: 'Senior Software Engineer',
    level: 'Manager',
    employee: 12,
  },
]

const columnHelper = createColumnHelper<Title>()

const columns = [
  columnHelper.accessor('name', {
    header: () => <span>Title</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor('level', {
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
        <DropdownMenuItem>Edit Job Title</DropdownMenuItem>

        <>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-500">
            Delete Job Title
          </DropdownMenuItem>
        </>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const JobTitle = () => {
  const table = useReactTable({
    columns,
    data: FAKE_DATA,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="px-5">
      <div className="flex items-center justify-between mb-4">
        <div className="text-xl font-semibold">Job Title</div>
        <Button size="sm">Add Job Title</Button>
      </div>
      <Table table={table} />
    </div>
  )
}

export default JobTitle
