import { UseFormReturnType } from '@mantine/form'
import { ProposalData }      from '@scrow/core'

import {
  Box,
  NativeSelect,
  NumberInput,
  Textarea,
  TextInput,
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

      <NativeSelect
        withAsterisk
        label="Network"
        {...form.getInputProps('network')}
        data={['main', 'testnet', 'mutiny']}
      />

      <NumberInput
        withAsterisk
        label="Value"
        {...form.getInputProps('value')}
        defaultValue={0}
        precision={2}
      />

      <NumberInput
        withAsterisk
        label="Duration (days)"
        {...form.getInputProps('duration')}
        defaultValue={0}
        min={1}
        max={365} // Adjusted to a more realistic max duration
        step={1}
      />

      <DatePicker
        withAsterisk
        label="Effective Date"
        {...form.getInputProps('effective')}
      />

      <DatePicker
        withAsterisk
        label="Deadline"
        {...form.getInputProps('deadline')}
      />

      <NumberInput
        withAsterisk
        label="Fee Rate"
        {...form.getInputProps('feerate')}
        defaultValue={0}
        precision={2}
      />

      <NumberInput
        label="Version"
        {...form.getInputProps('version')}
        defaultValue={1}
        min={1}
      />

      {/* Assuming schedule is a time-specific field, using TimeInput; adjust if different */}
      <TimeInput
        withAsterisk
        label="Schedule"
        {...form.getInputProps('schedule')}
      />

      <Textarea
        label="Content"
        {...form.getInputProps('content')}
      />
    </Box>
  )
}

// title
// network
// value
// duration
// effective
// deadline
// feerate
// version
// schedule
// content

