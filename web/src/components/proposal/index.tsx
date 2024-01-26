import { useState } from 'react'
import ProposalForm from './components/form'
import ProposalJson from './components/json'

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
    <Card maw={700}>
      <Group>
        <Title order={2} mb={15}>Proposal</Title>
        <SegmentedControl
          ml='auto'
          value={view}
          onChange={setView}
          data={[
            { label: <FormLabel />, value: 'form' },
            { label: <JsonLabel />, value: 'json' },
          ]}
        />
      </Group>
      <Text>The proposal is the template used to create a contract. It defines all the paths and terms.</Text>

      { view === 'form' && <ProposalForm /> }
      { view === 'json' && <ProposalJson /> }
      
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