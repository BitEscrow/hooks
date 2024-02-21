import { useState }   from 'react';
import {
  Box,
  Button,
  Group,
  Text,
  Modal,
  Checkbox,
  Center
}                     from '@mantine/core'

import { useSigner }  from "@/hooks/useSigner"

export default function SignerView () {
  const { signer, session } = useSigner()

  const [isCloseConfirmOpen, setIsCloseConfirmOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleClose = () => {
    if (isConfirmed) {
      session.close();
      setIsConfirmed(false);
      setIsCloseConfirmOpen(false);
    }
  };

  return (
    <Box>
      { signer !== null &&
        <Box>
          <Group gap={0}>
            <Text
              mt={10}
              fw={700}
              p  = {10}
              h  = {30}
            >
              Id:
            </Text>
            <Text
              w  = {200}
              p  = {15}
              h  = {30}
              ta = 'right'
            >
              {'...' + signer.pubkey.slice(-16)}
            </Text>
          </Group>
          <Group gap={0}>
            <Text
               mt={10}
              fw={700}
              p  = {10}
              h  = {30}
            >
              Pub:
            </Text>
            <Box
              w  = {200}
              p  = {20}
              h  = {30}
              ta = 'right'
            >
              {'...' + signer.pubkey.slice(-16)}
            </Box>
          </Group>
          <Button
            mt={20}
            fullWidth
            radius  = {15}
            bg      = 'red'
            onClick={() => setIsCloseConfirmOpen(true)}
          >
            Close
          </Button>
        </Box>
      }
      <Modal
        opened={isCloseConfirmOpen}
        onClose={() => setIsCloseConfirmOpen(false)}
        title="Confirm Close"
      >
        <Text size="sm" mb="md">
          Are you sure you want to close the session? You will not be signed out of this session.
        </Text>
        <Center style={{ alignItems: 'center' }} mb="md">
          <Checkbox
            checked={isConfirmed}
            onChange={(event) => setIsConfirmed(event.currentTarget.checked)}
            mr="xs"
          />
          <Text size="sm">I confirm that I have saved all necessary information.</Text>
        </Center>
        <Center mt="md">
          <Button color="red" onClick={handleClose} disabled={!isConfirmed}>
            Confirm Close
          </Button>
        </Center>
      </Modal>
    </Box>
  )
}