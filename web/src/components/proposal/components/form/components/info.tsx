import { UseFormReturnType } from '@mantine/form'
import { DateTimePicker }    from '@mantine/dates'
import { ProposalData }      from '@scrow/core'

import {
  convert_timer,
  parse_reltime
} from '@/lib/date'

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
