import { ProposalData }      from '@scrow/core'
import { UseFormReturnType } from '@mantine/form'

import {
  Box,
  Tabs
} from '@mantine/core'

import PropDetails   from './components/details'
import PropPaths     from './components/paths'
import PropPayments  from './components/payments'
import PropPrograms  from './components/programs'
import PropTasks     from './components/tasks'

interface Props {
  enabled : string[]
  form    : UseFormReturnType<ProposalData>
}

export default function ({ enabled, form } : Props) {

  return (
    <Box maw={700}>
      <Tabs defaultValue="details">
        <Tabs.List grow>
          <Tabs.Tab value="details">Details</Tabs.Tab>
          <Tabs.Tab value="paths">Paths</Tabs.Tab>
          <Tabs.Tab value="payments">Payments</Tabs.Tab>
          <Tabs.Tab value="programs">Programs</Tabs.Tab>
          <Tabs.Tab value="tasks">Tasks</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="details" pt="xs">
          <PropDetails enabled={enabled} form={form} />
        </Tabs.Panel>
        <Tabs.Panel value="paths" pt="xs">
          <PropPaths enabled={enabled} form={form} />
        </Tabs.Panel>
        <Tabs.Panel value="payments" pt="xs">
          <PropPayments enabled={enabled} form={form} />
        </Tabs.Panel>
        <Tabs.Panel value="programs" pt="xs">
          <PropPrograms enabled={enabled} form={form} />
        </Tabs.Panel>
        <Tabs.Panel value="tasks" pt="xs">
          <PropTasks enabled={enabled} form={form} />
        </Tabs.Panel>
      </Tabs>
    </Box>
  )
}
