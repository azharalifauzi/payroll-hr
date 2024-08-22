import Layout from '@/components/layout'
import { withGlobalProviders } from '@/components/providers'
import StaffForm from './components/staff-form'

// TODO: add defaultValues props
const EditStaff = () => {
  return (
    <Layout>
      <div className="text-xl font-semibold mb-8">Edit Employee</div>
      <div className="max-w-4xl">
        <StaffForm mode="edit" />
      </div>
    </Layout>
  )
}

export default withGlobalProviders(EditStaff)
