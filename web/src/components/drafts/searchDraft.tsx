import { useState }     from 'react';
import {
    TextInput,
    Button,
    Group,
    Text,
    Title,
}                       from '@mantine/core';
import {
  IconPencil,
  IconServer,
  IconExclamationCircle
}                       from '@tabler/icons-react';

export default function SearchDraft() {
  const [nostrAddress, setNostrAddress] = useState('');
  const [draftId, setDraftId] = useState('');
  const [errorNostrAddress, setErrorNostrAddress] = useState('');
  const [errorDraftId, setErrorDraftId] = useState('');

  const validateInputs = () => {
    let isValid = true;
    setErrorNostrAddress('');
    setErrorDraftId('');

    if (/[^a-zA-Z0-9\s]/.test(nostrAddress) || nostrAddress === '') {
      setErrorNostrAddress('Nostr relay address is empty or contains invalid characters.');
      isValid = false;
    }

    if (/[^a-zA-Z0-9\s]/.test(draftId) || draftId === '') {
      setErrorDraftId('Draft ID is empty or contains invalid characters.');
      isValid = false;
    }

    return isValid;
  };

  const handleClick = () => {
    const isValid = validateInputs();
    if (isValid) {
      console.log(nostrAddress);
      console.log(draftId);
    }
  };

  return (
    <>
      <div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Title order={2} mb={15}>Join a Draft</Title>
          <Text c="dimmed" style={{ marginBottom: '20px' }} maw='500px'>
            Join a contract by its Draft ID and entering the nostr relay it is on.
          </Text>
        </div>
      </div>
      <TextInput
        style={{ width: '450px' }}
        placeholder="Enter the address of the Nostr relay"
        leftSection={<IconServer size={15} />}
        value={nostrAddress}
        onChange={(event) => { setNostrAddress(event.target.value); setErrorNostrAddress(''); }}
        error={errorNostrAddress}
        rightSection={!errorNostrAddress ? null : <IconExclamationCircle size={15} color="red" />}
        mb={10}
      />
      <Group>
        <TextInput
          style={{ width: '450px' }}
          placeholder="Enter the Draft ID of your proposal"
          leftSection={<IconPencil size={15} />}
          value={draftId}
          onChange={(event) => { setDraftId(event.target.value); setErrorDraftId(''); }}
          error={errorDraftId}
          rightSection={!errorDraftId ? null : <IconExclamationCircle size={15} color="red" />}
        />
        <Button
          style={{
            backgroundColor: '#0068FD',
            borderRadius: '25px',
          }}
          onClick={handleClick}
        >
          Join
        </Button>
      </Group>
    </>
  );
}

