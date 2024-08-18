import { withGlobalProviders } from '@/components/providers'
import RunPayrollLayout from './components/run-payroll-layout'

const RunPayrollFeature = () => {
  return <RunPayrollLayout>Pay period & Employees</RunPayrollLayout>
}

export default withGlobalProviders(RunPayrollFeature)
