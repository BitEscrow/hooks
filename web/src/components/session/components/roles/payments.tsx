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
  form : UseFormReturnType<ProposalData>
}

export default function ProposalPaymentList({ form } : Props) {

  const fields = form.values.payments.map((_, index) => {    
    return (
      <Group key={index}>
        <NumberInput maw={2000}
          label='Amount'
          style={{ flex: 1 }}
          {...form.getInputProps(`payments.${index}.0`)}
        />
        <TextInput maw={250}
          label='Address'
          style={{ flex: 1 }}
          {...form.getInputProps(`payments.${index}.1`)}
        />
        <ActionIcon color="red" onClick={() => form.removeListItem('payments', index)} mt='23px'>
          <IconTrash size="1rem" />
        </ActionIcon>
      </Group>
    )
  })

  return (
    <Box maw={500}>
      <Text pt={'10px'} color='dimmed' mt={40}>PAYMENTS filler text</Text>
      {fields.length > 0 ? (
       null
      ) : (
        <Text c="dimmed" ta="center" mt={40}>
          No payments created...
        </Text>
      )}

      {fields}

      <Group justify="center" mt="sm">
        <Button
          variant='subtle'
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
