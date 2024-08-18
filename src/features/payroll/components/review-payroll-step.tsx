import { Separator } from '@/components/ui/separator'

const ReviewPayrollStep = () => {
  return (
    <div className="p-10">
      <div className="mb-8">
        <div className="font-semibold text-lg mb-1">Review payroll</div>
        <div className="text-sm text-gray-400">
          Please spend a brief moment reviewing this numbers, taxes, and other
          earning
        </div>
      </div>
      <div className="p-6 border border-gray-200">
        <div className="font-bold mb-6">Detail Payment</div>
        <div className="grid gap-6 grid-cols-2 text-sm">
          <div className="text-gray-400">Total net wages</div>
          <div className="text-right font-semibold">Rp. 12.000.000,00</div>
          <div className="text-gray-400">Total Company taxes</div>
          <div className="text-right font-semibold">Rp. 3.000.000,00</div>
          <div className="text-gray-400">Total Company benefits</div>
          <div className="text-right font-semibold">Rp. 1.000.000,00</div>
        </div>
        <Separator orientation="horizontal" className="my-6" />
        <div className="grid grid-cols-2 text-sm">
          <div className="text-gray-400">Total Payroll</div>
          <div className="text-right font-semibold text-base">
            Rp. 16.000.000,00
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewPayrollStep
