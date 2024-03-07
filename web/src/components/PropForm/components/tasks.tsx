import { ProposalData }      from '@scrow/core'
import { UseFormReturnType } from '@mantine/form'
import { IconTrash }         from '@tabler/icons-react'

import {
  Group,
  ActionIcon,
  Box,
  Text,
  Button,
  NumberInput,
  TextInput
} from '@mantine/core'

interface Props {
  enabled : string[]
  form    : UseFormReturnType<ProposalData>
}

export default function ProposalTaskList({ enabled, form } : Props) {

  const is_disabled = !enabled.includes('paths')

  const fields = form.values.schedule.map((item, index) => {
    const timer   = `schedule.${index}.0`
    const actions = `schedule.${index}.1`
    const paths   = `schedule.${index}.2`
  
    return (
      <Group
        key={index}
        mb={15}
      >
        <NumberInput maw={100}
          withAsterisk
          label="Timer"
          disabled={is_disabled}
          value={Number(item[0])}
          onChange={(e) => form.setFieldValue(timer, e) }
        />
        <TextInput
          withAsterisk
          label="Actions"
          disabled={is_disabled}
          style={{ flex: 1 }}
          {...form.getInputProps(actions)}
        />
        <TextInput
          withAsterisk
          label="Paths"
          disabled={is_disabled}
          style={{ flex: 1 }}
          {...form.getInputProps(paths)}
        />
        { !is_disabled && 
          <ActionIcon color="red" onClick={() => form.removeListItem('schedule', index)}>
            <IconTrash size="1rem" />
          </ActionIcon>
        }
      </Group>
    )
  })

  return (
    <Box maw={500}>
      <Text pt={'10px'} mt={40}>
        A task is a program that executes after a scheduled amount of time has elapsed (in seconds). Tasks are useful for automating certain actions within a contract, such as a default settlement.
        <br /><br />
        The timer for each task begins ticking once a contract is activated.
        <br /><br />
        You can specify multiple actions and paths for each task. When executed, each option will be attempted from left-to-right. Invalid options will be skipped.
      </Text>

      { fields.length === 0 &&
        <Text c="dimmed" ta="center" mt={30}>
          No tasks have been scheduled.
        </Text>
      }

      {fields}

      <Group justify="center">
        <Button
          variant='subtle'
          disabled={is_disabled}
          onClick={() => form.insertListItem('schedule', [7200, '*', '*'])}
        >
          Schedule New Task
        </Button>
      </Group>
    </Box>
  )
}
