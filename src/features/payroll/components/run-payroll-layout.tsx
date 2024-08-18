import Link from '@/components/link'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft } from 'lucide-react'
import React from 'react'

interface Props {
  children?: React.ReactNode
}

const STEPS = ['Employee Earnings', 'Review payroll', 'Success']

const RunPayrollLayout: React.FC<Props> = ({ children }) => {
  return (
    <main>
      <header className="fixed top-0 left-0 right-0 flex items-center h-16 border-b border-gray-200 bg-white px-6">
        <Link
          to="/payroll"
          className="mr-4 border border-gray-200 h-6 w-6 flex items-center justify-center"
        >
          <ArrowLeft className="w-4 h-4 text-gray-400" />
        </Link>
        <span className="text-xl font-semibold">Run Payroll</span>
        <Separator orientation="vertical" className="mx-4 h-5" />
      </header>
      <div className="fixed top-16 left-0 w-64 bottom-0 border-r border-gray-200 px-6 py-4">
        {STEPS.map((step, i) => (
          <div key={step} className="relative pb-8 [&:last-child>span]:hidden">
            <span className="absolute block w-0 border-r-[3px] border-dotted h-4/5 left-[9px] z-0 top-1.5 border-gray-400" />
            <div className="flex items-center gap-2 relative z-10">
              <div className="flex items-center justify-center rounded-full h-5 w-5 text-white bg-gray-400 text-xs">
                {i + 1}
              </div>
              <span className="font-semibold text-sm">{step}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed top-16 left-64 right-0 bottom-16 overflow-y-auto py-4">
        {children}
      </div>
      <footer className="bottom-0 left-64 right-0 h-16 flex items-center justify-end gap-2 fixed border-t border-gray-200 px-4">
        <Button variant="outline" size="sm" className="w-40">
          Previous
        </Button>
        <Button size="sm" className="w-40">
          Next
        </Button>
      </footer>
    </main>
  )
}

export default RunPayrollLayout
