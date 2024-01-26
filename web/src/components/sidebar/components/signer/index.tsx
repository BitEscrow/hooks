import { Box, Button, Group, Text } from '@mantine/core'

import { useSigner } from "@/context/useSigner"

export default function SignerView () {
  const { signer, store } = useSigner()

  return (
    <Box>
      { signer !== null &&
        <Box>
          <Group gap={0}>
            <Text
              c  = 'white'
              bg = 'blue'
              p  = {10}
              h  = {50}
            >
              Id
            </Text>
            <Text
              w  = {200}
              p  = {15}
              h  = {50}
              ta = 'left'
            >
              {'...' + signer.id.slice(-16)}
            </Text>
          </Group>
          <Group gap={0}>
            <Box
              c  = 'white'
              bg = 'blue'
              p  = {10}
              h  = {50}
            >
              Pub
            </Box>
            <Box
              w  = {200}
              p  = {20}
              h  = {50}
              ta = 'left'
            >
              {'...' + signer.pubkey.slice(-16)}
            </Box>
          </Group>
          <Button
            fullWidth
            radius  = {0}
            bg      = 'maroon'
            onClick = {store.close}
          >
            Close
          </Button>
        </Box>
      }
    </Box>
  )
}