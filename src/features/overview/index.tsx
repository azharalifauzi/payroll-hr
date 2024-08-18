import Layout from '@/components/layout'
import { withGlobalProviders } from '@/components/providers'

const OverviewFeature = ({}) => {
  return (
    <Layout>
      <div className="mb-8">
        <div className="font-bold text-3xl mb-1">
          Pick courses that you like
        </div>
        <div className="text-gray-500">
          Choose from over 220,000 online courses with new additions published
          every month
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,1fr))] gap-6"></div>
    </Layout>
  )
}

export default withGlobalProviders(OverviewFeature)
