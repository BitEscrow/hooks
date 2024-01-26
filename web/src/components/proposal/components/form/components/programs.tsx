import { UseFormReturnType } from '@mantine/form'
import { IconTrash }         from '@tabler/icons-react'
import { ProposalData }      from '@scrow/core'

import { Box, Button, Fieldset, TagsInput, TextInput, Group, ActionIcon, Text, NumberInput, Stack } from '@mantine/core'

interface Props {
  form : UseFormReturnType<ProposalData>
}

export default function ProposalProgramList({ form } : Props) {

  const fields = form.values.programs.map((item, index) => {
    const [ actions, paths, method, ...args ] = item
    return (
      <Fieldset legend="Program" key={index}>
        <Stack>
          <Group>
            <Stack>
              <Group mb="xs">
                <Text fw={500} size="sm" style={{ flex: 1 }}>
                  Action
                </Text>
                <Text fw={500} size="sm" pr={220}>
                  Path
                </Text>
              </Group>
              <Group>
                <TextInput
                  style={{ flex: 1 }}
                  {...form.getInputProps(`programs.${index}.0`)}
                />
                <TextInput
                  withAsterisk
                  style={{ flex: 1 }}
                  {...form.getInputProps(`programs.${index}.1`)}
                />
                <ActionIcon color="red" onClick={() => form.removeListItem('programs', index)}>
                  <IconTrash size="1rem" />
                </ActionIcon>
              </Group>
            </Stack>
          </Group>
          <Group>
            <Stack>
              <Group>
                <Text fw={500} size="sm" pr={25}>
                  Method
                </Text>
                { method === 'sign' &&
                  <Text fw={500} size="sm" pl={140}>
                    Threshold
                  </Text>
                }
              </Group>
              <Group>
                <TextInput
                  withAsterisk
                  style={{ flex: 1 }}
                  {...form.getInputProps(`programs.${index}.2`)}
                />
                { method === 'sign' &&
                  <>
                    <NumberInput
                      style={{ flex: 1 }}
                      value={Number(args[0])}
                      onChange={(e) => {
                        const prog = [ actions, paths, method, Number(e), ...args.slice(1) ]
                        return form.setFieldValue(`programs.${index}`, prog)
                      }}
                    />
                  </>
                }
              </Group>
              <Group>
                <TagsInput
                  style={{ flex: 1 }}
                  value={args.slice(1).map(e => String(e))}
                  onChange={(e) => {
                    const prog = [ actions, paths, method, args[0], ...e ]
                    return form.setFieldValue(`programs.${index}`, prog)
                  }}
                />
              </Group>
            </Stack>
          </Group>
        </Stack>
      </Fieldset>
    )
  })

  return (
    <Box maw={500}>
      {fields.length === 0 &&
        <Text c="dimmed" ta="center">
          No programs created...
        </Text>
      }

      {fields}

      <Group justify="center" mt="md">
        <Button
          onClick={() =>
            form.insertListItem('programs', [ '', 0, '' ])
          }
        >
          Add Program
        </Button>
      </Group>
    </Box>
  )
}
