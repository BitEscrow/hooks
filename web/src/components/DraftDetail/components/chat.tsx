import { Buff } from '@cmdcode/buff'
import { Box, Button, Code, Group, Text, TextInput } from '@mantine/core'

import {
  DraftData,
  DraftSession
} from '@scrow/core'
import { useState } from 'react'

interface Props {
  data    : DraftData
  session : DraftSession
}

// Alias formula:
// Two BIP-39 words (how much entropy is that?), plus two bytes of hex.
// Take the first two bytes as a suffix.
// Take 4 more bytes, two for each word (reduced to 11 bits each).

export default function ({ data, session } : Props) {

  const [ msgs, setMsgs ] = useState<string[]>([])

  const alias = get_alias(session.pubkey)

  return (
    <Box h={200} bg='gray'>
      <Code>{msgs.join('\n')}</Code>
      <Group>
        <TextInput />
        <Button>Send</Button>
      </Group>
    </Box>
  )
}

function ChatBox () {
  return <pre>messages go here</pre>
}

function MessageBar () {
  return (
    <>
      <input type="text" />
      <button>Send</button>
    </>
  )
}

function get_alias (pubkey : string) {
  const tag   = pubkey.slice(0, 4)
  const fname = Buff.hex(pubkey.slice(4, 6))
  const lname = Buff.hex(pubkey.slice(6, 8))
  // Do something here to choose words.
  return `${fname.hex}${lname.hex}#${tag}`
}
