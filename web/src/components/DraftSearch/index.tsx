import { useState }    from 'react'
import { useNavigate } from 'react-router-dom'

import {
    TextInput,
    Button,
    Group,
    Text,
    Title,
} from '@mantine/core'

import {
  IconPencil,
  IconExclamationCircle
} from '@tabler/icons-react'

export default function SearchDraft() {
  const [draftId, setDraftId] = useState('')
  const [errorDraftId, setErrorDraftId] = useState('')

  const navigate = useNavigate()


  const join_session = () => {
    navigate(`/drafts/${draftId}`)
  }

  return (
    <>
      <div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Title order={2} mb={15}>Join a Session</Title>
          <Text c="dimmed" style={{ marginBottom: '20px' }} maw='500px'>
            Join an existing draft session via its secret ID.
          </Text>
        </div>
      </div>
      <Group>
        <TextInput
          style={{ width: '500px' }}
          placeholder="Enter a secret ID ..."
          leftSection={<IconPencil size={15} />}
          value={draftId}
          onChange={(event) => { setDraftId(event.target.value); setErrorDraftId(''); }}
          error={errorDraftId}
          rightSection={!errorDraftId ? null : <IconExclamationCircle size={15} color="red" />}
        />
        <Button
          style={{
            backgroundColor: '#0068FD',
            borderRadius: '15px',
          }}
          onClick={() => join_session() }
        >
          Join
        </Button>
      </Group>
    </>
  );
}

