import { UseFormReturnType } from '@mantine/form'
import { IconTrash }         from '@tabler/icons-react'
import { ProposalData }      from '@scrow/core'

import { NumberInput, TextInput, Group, ActionIcon, Box, Text, Button } from '@mantine/core'

interface Props {
  form : UseFormReturnType<ProposalData>
}

export default function ProposalPaymentList({ form } : Props) {

  const fields = form.values.payments.map((_, index) => {    
    return (
      <Group key={index}>
        <NumberInput maw={120}
          style={{ flex: 1 }}
          {...form.getInputProps(`payments.${index}.0`)}
        />
        <TextInput maw={250}
          style={{ flex: 1 }}
          {...form.getInputProps(`payments.${index}.1`)}
        />
        <ActionIcon color="red" onClick={() => form.removeListItem('payments', index)}>
          <IconTrash size="1rem" />
        </ActionIcon>
      </Group>
    )
  })

  return (
    <Box maw={500}>
      {fields.length > 0 ? (
        <Group mb="xs">
          <Text size="sm" pr={75}>
            Amount
          </Text>
          <Text size="sm">
            Address
          </Text>
        </Group>
      ) : (
        <Text c="dimmed" ta="center">
          No payments created...
        </Text>
      )}

      {fields}

      <Group justify="center" mt="md">
        <Button
          onClick={() =>
            form.insertListItem('payments', [ '', 0, '' ])
          }
        >
          Add Payment
        </Button>
      </Group>
    </Box>
  )
}
