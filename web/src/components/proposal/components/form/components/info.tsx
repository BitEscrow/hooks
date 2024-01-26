import { UseFormReturnType } from '@mantine/form'
import { ProposalData }      from '@scrow/core'

import ProposalTotalView from './totals'

import {
  Box,
  Group,
  Title
} from '@mantine/core'

interface Props {
  form : UseFormReturnType<ProposalData>
}

export default function ProposalInfoView({ form } : Props) {

  return (
    <Box maw={500}>
      <Group gap={0}>
        <Title order={4}>{form.values.title}</Title>
        <Box>
          <ProposalTotalView form={ form } />
        </Box>
      </Group>
    </Box>
  )
}
