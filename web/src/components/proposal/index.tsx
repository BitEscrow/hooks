import { useState } from 'react'

import ProposalForm from './form'
import ProposalJson from './json'

import {
  Box,
  Card,
  Center,
  Group,
  SegmentedControl,
  Text,
  Title,
  rem
} from '@mantine/core'

import {
  IconBraces,
  IconForms
} from '@tabler/icons-react'

export default function ProposalView () {

  const [ view, setView ] = useState('form')

  return (
    <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
    <Group style={{ width: '100%' }}>
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Title order={2} mb={15}>Proposal</Title>
      <Text color="dimmed" style={{ marginBottom: '20px' }}>
        The proposal is the template used to create a contract. It defines all the paths and terms. Click "JSON" for a structured look at contract parameters, functions, and data. Ideal for developers.
      </Text>
          <SegmentedControl
            w={'200px'}
            value={view}
            onChange={setView}
            data={[
              { label: <FormLabel />, value: 'form' },
              { label: <JsonLabel />, value: 'json' },
            ]}
            style={{ marginBottom: '20px' }}
        />
      </div>
    </Group>

    {view === 'form' && <ProposalForm />}
    {view === 'json' && <ProposalJson />}
  </Card>
  )
}

function FormLabel () {
  return (
    <Center>
      <IconForms style={{ width: rem(16), height: rem(16) }} />
      <Box ml={10}>Form</Box>
    </Center>
  )
}

function JsonLabel () {
  return (
    <Center>
      <IconBraces style={{ width: rem(16), height: rem(16) }} />
      <Box ml={10}>JSON</Box>
    </Center>
  )
}