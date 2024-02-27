import { useState } from 'react'

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

  const validateInputs = () => {
    let isValid = true
    setErrorDraftId('')

    if (/[^a-fA-F0-9\s]/.test(draftId) || draftId === '') {
      setErrorDraftId('Draft ID is empty or contains invalid characters.')
      isValid = false
    }

    return isValid
  }

  const handleClick = () => {
    const isValid = validateInputs()
    if (isValid) {
      console.log(draftId)
    }
  }

  return (
    <>
      <div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Title order={2} mb={15}>Join a Session</Title>
          <Text c="dimmed" style={{ marginBottom: '20px' }} maw='500px'>
            Join an existing draft session via its ID.
          </Text>
        </div>
      </div>
      <Group>
        <TextInput
          style={{ width: '500px' }}
          placeholder="Enter a session ID ..."
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
          onClick={handleClick}
        >
          Join
        </Button>
      </Group>
    </>
  );
}

