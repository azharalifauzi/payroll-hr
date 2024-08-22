import Layout from '@/components/layout'
import { withGlobalProviders } from '@/components/providers'
import StaffForm from './components/staff-form'

const NewStaff = () => {
  return (
    <Layout>
      <div className="text-xl font-semibold mb-8">New Employee</div>
      <div className="max-w-4xl">
        <StaffForm />
      </div>
    </Layout>
  )
}

export default withGlobalProviders(NewStaff)
