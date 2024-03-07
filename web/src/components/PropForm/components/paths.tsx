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

  const is_disabled = !enabled.includes('paths')

  const fields = form.values.paths.map((input, index) => {
    const label   = `paths.${index}.0`
    const amount  = `paths.${index}.1`
    const address = `paths.${index}.2`
    return (
      <Group key={index} mb={15}>
        <TextInput maw={100}
          label="Label"
          disabled={is_disabled}
          style={{ flex: 1 }}
          {...form.getInputProps(label)}
        />
        <NumberInput maw={120}
          label="Amount"
          disabled={is_disabled}
          style={{ flex: 1 }}
          value={input[1]}
          onChange={e => form.setFieldValue(amount, Number(e))}
          defaultValue={1000}
          min={1000}
        />
        <TextInput maw={250}
          label="Address"
          disabled={is_disabled}
          style={{ flex: 1 }}
          {...form.getInputProps(address)}
        />
        { !is_disabled && 
          <ActionIcon color="red" onClick={() => form.removeListItem('paths', index)}>
            <IconTrash size="1rem" />
          </ActionIcon>
        }
      </Group>
    )
  })

  return (
    <Box maw={500}>
      <Text pt={'10px'} mt={40}>
        A spending path is a conditional payment. Each path is labeled, and these labels are used to choose a settlement path for the contract.
        <br/><br/>
        Paths are grouped by label, and each group is converted into a transaction template. These templates are used to lock funds to the contract.
      </Text>
      { fields.length === 0 &&
        <Text c="dimmed" ta="center" mt={40}>
          No spending paths have been created.
        </Text>  
      }

      {fields}

      <Group justify="center" mt="sm">
        <Button
          disabled={is_disabled}
          variant='subtle'
          onClick={() =>
            form.insertListItem('paths', [ 'payout', 1000, undefined ])
          }
        >
          Add Spending Path
        </Button>
      </Group>
    </Box>
  )
}
