import Layout from '@/components/layout'
import { withGlobalProviders } from '@/components/providers'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import JobTitle from './components/job-title'
import JobLevel from './components/job-level'
import Allowances from './components/allowances'

const AdministrationFeature = () => {
  return (
    <Layout className="p-0">
      <Tabs defaultValue="title">
        <TabsList className="p-0 bg-transparent">
          <TabsTrigger
            className="data-[state=active]:border-purple-400 border-b-2 border-b-transparent rounded-none"
            value="title"
          >
            Job Title
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:border-purple-400 border-b-2 border-b-transparent rounded-none"
            value="level"
          >
            Job Level
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:border-purple-400 border-b-2 border-b-transparent rounded-none"
            value="allowances"
          >
            Allowances
          </TabsTrigger>
        </TabsList>
        <TabsContent value="title">
          <JobTitle />
        </TabsContent>
        <TabsContent value="level">
          <JobLevel />
        </TabsContent>
        <TabsContent value="allowances">
          <Allowances />
        </TabsContent>
      </Tabs>
    </Layout>
  )
}

export default withGlobalProviders(AdministrationFeature)
