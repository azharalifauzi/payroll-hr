import { withGlobalProviders } from '@/components/providers'
import RunPayrollLayout from './components/run-payroll-layout'
import SuccessStep from './components/success-step'

const RunPayrollFeature = () => {
  return (
    <RunPayrollLayout>
      <SuccessStep />
    </RunPayrollLayout>
  )
}

export default withGlobalProviders(RunPayrollFeature)
