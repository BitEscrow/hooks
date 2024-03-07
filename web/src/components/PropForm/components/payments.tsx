import { UseFormReturnType } from '@mantine/form'
import { IconTrash }         from '@tabler/icons-react'
import { ProposalData }      from '@scrow/core'

import {
  NumberInput,
  TextInput,
  Group,
  ActionIcon,
  Box,
  Text,
  Button
} from '@mantine/core'

interface Props {
  enabled : string[]
  form    : UseFormReturnType<ProposalData>
}

export default function ({ enabled, form } : Props) {

  const is_disabled = !enabled.includes('payments')

  const fields = form.values.payments.map((_, index) => {    
    return (
      <Group key={index}>
        <NumberInput maw={2000}
          label='Amount'
          disabled={is_disabled}
          style={{ flex: 1 }}
          {...form.getInputProps(`payments.${index}.0`)}
          defaultValue={1000}
          min={1000}
        />
        <TextInput maw={250}
          label='Address'
          disabled={is_disabled}
          style={{ flex: 1 }}
          {...form.getInputProps(`payments.${index}.1`)}
        />
        { !is_disabled && 
          <ActionIcon color="red" onClick={() => form.removeListItem('payments', index)}>
            <IconTrash size="1rem" />
          </ActionIcon>
        }
      </Group>
    )
  })

  return (
    <Box maw={500}>
      <Text pt={'10px'} mt={40}>
        A payment is unconditional, and will apply to all spending paths. They are useful for collecting fees, non-refundable costs, etc. Payments are not guaranteed if a contract expires without settlement.
      </Text>
      { fields.length === 0 &&
        <Text c="dimmed" ta="center" mt={40}>
          No payments have been created.
        </Text>  
      }

      {fields}

      <Group justify="center" mt="sm">
        <Button
          variant='subtle'
          disabled={is_disabled}
          onClick={() =>
            form.insertListItem('payments', [ 1000, undefined ])
          }
        >
          Add Payment
        </Button>
      </Group>
    </Box>
  )
}
