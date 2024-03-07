import { ProposalData }      from '@scrow/core'
import { UseFormReturnType } from '@mantine/form'
import { DateTimePicker }    from '@mantine/dates'

import {
  Box,
  JsonInput,
  // NativeSelect,
  NumberInput,
  TextInput,
} from '@mantine/core'

interface Props {
  enabled : string[]
  form    : UseFormReturnType<ProposalData>
}

export default function ProposalDetailView({ enabled, form } : Props) {

  return (
    <Box maw={500}>
      <TextInput
        withAsterisk
        disabled={!enabled.includes('title')}
        label="Title"
        description="The main title of the proposal."
        {...form.getInputProps('title')}
      />

      <JsonInput
        label="Content"
        disabled={!enabled.includes('content')}
        description="Json field for storing custom content."
        {...form.getInputProps('content')}
      />

      <NumberInput
        withAsterisk
        label="Value"
        disabled={!enabled.includes('value')}
        description="The total value of the proposal (in sats)."
        {...form.getInputProps('value')}
        defaultValue={1000}
        min={1000}
      />

      <NumberInput
        label="Funding Duration"
        disabled={!enabled.includes('deadline')}
        description="The max duration of a published contract (in seconds) before it expires."
        {...form.getInputProps('deadline')}
      />

      <NumberInput
        withAsterisk
        label="Contract Duration"
        disabled={!enabled.includes('duration')}
        description="The max duration of an active contract (in seconds) before it expires."
        {...form.getInputProps('duration')}
        defaultValue={0}
        min={60 * 30} // 30 mins minimum
        max={1209600} // 2 weeks max in seconds
        step={1}
      />

      <DateTimePicker
        label="Activation Date"
        disabled={!enabled.includes('effective')}
        description="Set a specific date for the contract to activate."
        {...form.getInputProps('effective')}
      />

      <NumberInput
        label="Fee Rate"
        disabled={!enabled.includes('feerate')}
        description="The rate to use (in sats per vbyte) for calculating transaction fees."
        {...form.getInputProps('feerate')}
        defaultValue={1}
        step={1}
      />

    </Box>
  )
}


