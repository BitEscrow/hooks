import { UseFormReturnType } from '@mantine/form'
import { ProposalData }      from '@scrow/core'

import {
  Box,
  NativeSelect,
  NumberInput,
  Textarea,
  TextInput,
} from '@mantine/core'

import { DateTimePicker }    from '@mantine/dates'


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
        {...form.getInputProps('description')}
      />

      <NativeSelect
        withAsterisk
        label="Network"
        {...form.getInputProps('network')}
        data={['main', 'testnet', 'mutiny']}
      />

      <NumberInput
        withAsterisk
        label="Value (in Sats)"
        {...form.getInputProps('value')}
        defaultValue={0}
        // precision={2}
      />

      <NumberInput
        withAsterisk
        label="Duration (in seconds)"
        {...form.getInputProps('duration')}
        defaultValue={0}
        min={120} // 2 mins minimum
        max={1209600} // 2 weeks max in seconds
        step={1}
      />

      <DateTimePicker
        withAsterisk
        label="Effective Date"
        {...form.getInputProps('effective')}
      />

      <DateTimePicker
        withAsterisk
        label="Deadline"
        {...form.getInputProps('deadline')}
      />

      <NumberInput
        withAsterisk
        label="Fee Rate"
        {...form.getInputProps('feerate')}
        defaultValue={0}
        // precision={2}
      />

      <NumberInput
        label="Version"
        {...form.getInputProps('version')}
        defaultValue={1}
        min={1}
      />

    </Box>
  )
}


