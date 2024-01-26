import { UseFormReturnType } from '@mantine/form'
import { IconTrash } from '@tabler/icons-react'
import { Group, ActionIcon, Box, Text, Button, MultiSelect, NumberInput, Select } from '@mantine/core'
import { ProposalData } from '@scrow/core'
import { convert_regex, parse_regex } from '@/lib/util'

interface Props {
  form : UseFormReturnType<ProposalData>
}

export default function ProposalTaskList({ form } : Props) {

  const actions = [ 'close', 'dispute', 'lock', 'release', 'resolve' ]
  const paths   = [ ...new Set(form.values.paths.map(e => e[0])) ]

  const fields = form.values.schedule.map((item, index) => {
    const timer  = `schedule.${index}.0`
    const action = `schedule.${index}.1`
    const path   = `schedule.${index}.2`
  
    return (
      <Group key={index} mb={15}>
        <NumberInput maw={100}
          value={item[0]}
          onChange={(e) => form.setFieldValue(timer, e) }
        />
        <Select maw={100}
          data={actions}
          {...form.getInputProps(action)}
        />
        <MultiSelect w={200}
          data={paths}
          value={convert_regex(form.values.schedule[index][2], paths)}
          defaultValue={[paths[0]]}
          onChange={(e) => form.setFieldValue(path, parse_regex(e, paths)) }
        />
        <ActionIcon color="red" onClick={() => form.removeListItem('schedule', index)}>
          <IconTrash size="1rem" />
        </ActionIcon>
      </Group>
    )
  })

  return (
    <Box maw={500}>
      {fields.length > 0 ? (
        <Group mb="xs">
          <Text size="sm" style={{ flex: 1 }}>
            Timer
          </Text>
          <Text size="sm" pr={60}>
            Action
          </Text>
          <Text size="sm" pr={230}>
            Paths
          </Text>
        </Group>
      ) : (
        <Text c="dimmed" ta="center">
          No tasks created...
        </Text>
      )}

      {fields}

      <Group justify="center" mt="md">
        <Button
          onClick={() =>
            form.insertListItem('schedule', [ 0, 'close', '' ])
          }
        >
          Add Task
        </Button>
      </Group>
    </Box>
  )
}
