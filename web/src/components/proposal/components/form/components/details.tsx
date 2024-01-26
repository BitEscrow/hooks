import { UseFormReturnType } from '@mantine/form'
import { DateTimePicker }    from '@mantine/dates'
import { ProposalData }      from '@scrow/core'

import {
  convert_timer,
  parse_reltime
} from '@/lib/date'

import {
  Box,
  NativeSelect,
  NumberInput,
  Textarea,
  TextInput
} from '@mantine/core'

interface Props {
  form : UseFormReturnType<ProposalData>
}

export default function ProposalDetailView({ form } : Props) {

  return (
    <Box maw={500}>
      <TextInput
        withAsterisk
        label="Title"
        {...form.getInputProps('title')}
      />
      <Textarea
        label="Description"
        {...form.getInputProps('details')}
      />

      <DateTimePicker
        label='Expires at'
        value={convert_timer(form.values.expires)}
        onChange={(e) => form.setValues({ expires : parse_reltime(e) })}
      />

      <NativeSelect
        label="Network"
        {...form.getInputProps('network')}
        data={[ 'main', 'testnet', 'mutiny' ]}
      />

      <NumberInput
        label="Version"
        {...form.getInputProps('version')}
        min={1}
        max={1}
      />
    </Box>
  )
}
