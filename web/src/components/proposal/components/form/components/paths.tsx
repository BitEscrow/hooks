import { UseFormReturnType } from '@mantine/form'
import { IconTrash } from '@tabler/icons-react'
import { ProposalData } from '@scrow/core'

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

export default function ProposalPathList({ form } : Props) {

  const fields = form.values.paths.map((input, index) => {
    const label   = `paths.${index}.0`
    const amount  = `paths.${index}.1`
    const address = `paths.${index}.2`
    return (
      <Group key={index} mb={15}>
        <TextInput maw={100}
          style={{ flex: 1 }}
          {...form.getInputProps(label)}
        />
        <NumberInput maw={120}
          style={{ flex: 1 }}
          value={input[1]}
          onChange={e => form.setFieldValue(amount, Number(e))}
        />
        <TextInput maw={250}
          style={{ flex: 1 }}
          {...form.getInputProps(address)}
        />
        <ActionIcon color="red" onClick={() => form.removeListItem('paths', index)}>
          <IconTrash size="1rem" />
        </ActionIcon>
      </Group>
    )
  })

  return (
    <Box maw={500}>
      {fields.length > 0 ? (
        <Group mb="xs">
          <Text fw={500} size="sm" style={{ flex: 1 }}>
            Path
          </Text>
          <Text fw={500} size="sm" pr={70}>
            Amount
          </Text>
          <Text fw={500} size="sm" pr={195}>
            Address
          </Text>
        </Group>
      ) : (
        <Text c="dimmed" ta="center">
          No paths created...
        </Text>
      )}

      {fields}

      <Group justify="center" mt="md">
        <Button
          onClick={() =>
            form.insertListItem('paths', [ 'payout', 0, undefined ])
          }
        >
          Add Path
        </Button>
      </Group>
    </Box>
  )
}
