import Layout from '@/components/layout'
import Link from '@/components/link'
import { withGlobalProviders } from '@/components/providers'
import Table from '@/components/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Plus, Search } from 'lucide-react'

interface Employee {
  name: string
  image: string | null
  id: number
  title: string
  level: string
  email: string
}

const FAKE_DATA: Employee[] = [
  {
    name: 'Suparman',
    title: 'Chief Executive Officer',
    level: 'C-Level',
    email: 'suparman@sidrstudio.com',
    id: 1,
    image: null,
  },
  {
    name: 'John Doe',
    title: 'Senior Software Engineer',
    level: 'Senior Manager',
    email: 'john@sidrstudio.com',
    id: 2,
    image: null,
  },
  {
    name: 'Paul Smith',
    title: 'VP Engineering',
    level: 'Director',
    email: 'paul@sidrstudio.com',
    id: 3,
    image: null,
  },
]

const columnHelper = createColumnHelper<Employee>()

const columns = [
  columnHelper.accessor('name', {
    header: () => <span>Full Name</span>,
    cell: (info) => (
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={info.row.original.image ?? undefined} />
          <AvatarFallback>{info.getValue()[0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="font-semibold">{info.getValue()}</div>
      </div>
    ),
  }),
  columnHelper.accessor('email', {
    header: () => <span>Email</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor('title', {
    header: () => <span>Title</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor('level', {
    header: () => <span>Level</span>,
    cell: (info) => <span>{info.getValue()}</span>,
  }),
  columnHelper.accessor('id', {
    header: () => <span>Action</span>,
    cell: (info) => (
      <Link
        to={`/staff/${info.getValue()}`}
        className="hover:text-blue-800 text-blue-500"
      >
        View details
      </Link>
    ),
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
        <div className="text-xl font-semibold">Payroll</div>
        <Button size="sm" className="px-4" asChild>
          <Link to="/staff/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Employee
          </Link>
        </Button>
      </div>
      <form className="relative">
        <Search className="absolute top-1/2 -translate-y-1/2 left-2.5 h-5 w-5 text-gray-500" />
        <Input placeholder="Search" className="mb-6 max-w-96 pl-10" />
      </form>
      <Table table={table} />
    </Layout>
  )
}

export default withGlobalProviders(StaffFeature)
