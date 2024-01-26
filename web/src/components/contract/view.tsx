import { ContractData } from '@scrow/core'
import { Box, Tabs }    from '@mantine/core'

import ContractDateView from './components/date'
import ContractAgentView from './components/agent'
import ContractFeesList  from './components/fees'
import ContractTotalView from './components/values'
import ContractInfoView from './components/info'

interface Props {
  data : ContractData
}

export default function ContractMainView ({ data } : Props) {
  return (
    <Box>
      <ContractInfoView data={ data} />
      <Tabs defaultValue="info">
        <Tabs.List>
          <Tabs.Tab value="info">
            Info
          </Tabs.Tab>
          <Tabs.Tab value="agent">
            Agent
          </Tabs.Tab>
          <Tabs.Tab value="dates">
            Dates
          </Tabs.Tab>
          <Tabs.Tab value="fees">
            Fees
          </Tabs.Tab>
          <Tabs.Tab value="values">
            Values
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="info">
          Title and details go here.
        </Tabs.Panel>

        <Tabs.Panel value="agent">
          <ContractAgentView data={ data } />
        </Tabs.Panel>

        <Tabs.Panel value="dates">
          <ContractDateView  data={ data } />
        </Tabs.Panel>

        <Tabs.Panel value="fees">
          <ContractFeesList  data={ data } />
        </Tabs.Panel>

        <Tabs.Panel value="values">
          <ContractTotalView data={ data } />
        </Tabs.Panel>
      </Tabs>
    </Box>
  )
}
