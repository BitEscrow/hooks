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
  NativeSelect,
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
      <Group key={index}>
        <TextInput
          placeholder='Member ID'
          maw={200}
          label='ID'
          style={{ flex: 1 }}
          {...form.getInputProps(id)}
        />
        <TextInput
          placeholder='Member PubKey'
          maw={250}
          label='Pubkey'
          style={{ flex: 1 }}
          {...form.getInputProps(pub)}
        />
        <NativeSelect
          data={['Buyer', 'Seller', 'Agent']}
          maw={250}
          label='Role'
          style={{ flex: 1 }}
          // {...form.getInputProps(role)} ??
        />
        <ActionIcon color="red" onClick={() => form.removeListItem('members', index)} mt='23px'>
          <IconTrash size="1rem" />
        </ActionIcon>
      </Group>
    )
  })

  return (
    <Box maw={500}>
      {fields && fields.length > 0 ? (
       null
      ) : (
        <Text c="dimmed" ta="center" pt={'10px'}>
          No members are defined...
        </Text>
      )}
      {fields}

      <Group justify="center">
        <Button 
          variant='subtle'
          mt='10px'
          onClick={() => insert('', '')}
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
