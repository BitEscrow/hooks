import { UseFormReturnType } from '@mantine/form'
import { IconTrash }         from '@tabler/icons-react'
import { ProposalData }      from '@scrow/core'
import { useSigner }         from '@/hooks/useSigner'

import {
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

export default function ProposalMemberList({ form } : Props) {

  const { signer } = useSigner()

  const insert = (id : string, key : string) => {
    if (form.values.members === undefined) {
      form.setFieldValue('members', [])
    }
    form.insertListItem('members', [ id, key ])
  }

  const fields = form.values.members?.map((_, index) => {
    const id  = `members.${index}.0`
    const pub = `members.${index}.1`
    return (
      <Group key={index} mb={15}>
        <TextInput maw={100}
          style={{ flex: 1 }}
          {...form.getInputProps(id)}
        />
        <TextInput maw={250}
          style={{ flex: 1 }}
          {...form.getInputProps(pub)}
        />
        <ActionIcon color="red" onClick={() => form.removeListItem('members', index)}>
          <IconTrash size="1rem" />
        </ActionIcon>
      </Group>
    )
  })

  return (
    <Box maw={500}>
      {fields && fields.length > 0 ? (
        <Group mb="xs">
          <Text fw={500} size="sm" style={{ flex: 1 }}>
            Id
          </Text>
          <Text fw={500} size="sm" pr={70}>
            Pubkey
          </Text>
        </Group>
      ) : (
        <Text c="dimmed" ta="center">
          No members are defined...
        </Text>
      )}

      {fields}

      <Group justify="center" mt="md">
        <Button
          onClick={() => {}}
        >
          Add Member
        </Button>
        { signer !== null &&
          <Button
          bg='green'
          onClick={() => insert(signer.pubkey, signer.pubkey)}
        >
          Join
        </Button>
      }
      </Group>
    </Box>
  )
}
