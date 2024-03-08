import { Buff } from '@cmdcode/buff'

import { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Code,
  Group,
  Stack,
  TextInput
} from '@mantine/core'

import {
  DraftData,
  DraftSession
} from '@scrow/core'

interface Props {
  data    : DraftData
  session : DraftSession
}

// Alias formula:
// Two BIP-39 words (how much entropy is that?), plus two bytes of hex.
// Take the first two bytes as a suffix.
// Take 4 more bytes, two for each word (reduced to 11 bits each).

export default function ({ session } : Props) {

  const [ init, setInit ]   = useState(false)
  const [ input, setInput ] = useState('')
  const [ msgs, setMsgs ]   = useState<string[]>([])

  const alias = get_alias(session.pubkey)

  const send = () => {
    const msg = `[${alias}]: ${input}`
    session.send('chat', msg)
    setMsgs((e) => [ ...e, msg ])
    setInput('')
  }

  useEffect(() => {
    if (!init) {
      session.on_topic('chat', (msg) => {
        if (msg.envelope.pubkey !== session.mship.pub) {
          setMsgs((e) => [ ...e, msg.body as string ])
        }
      })
      setInit(true)
    }
  }, [ init ])

  return (
    <Box h={200} bg='gray'>
      <Stack>
        { msgs.map(msg => (
          <Code key={Buff.random(16).hex}>{msg}</Code>
        ))}
      </Stack>
      <Group>
        <TextInput
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <Button onClick={send}>Send</Button>
      </Group>
    </Box>
  )
}

// function ChatBox () {
//   return <pre>messages go here</pre>
// }

// function MessageBar () {
//   return (
//     <>
//       <TextInput onChange={(e) => }
//       />
//       <Button onClick={}>Send</Button>
//     </>
//   )
// }

function get_alias (pubkey : string) {
  const tag   = pubkey.slice(0, 4)
  const fname = Buff.hex(pubkey.slice(4, 6))
  const lname = Buff.hex(pubkey.slice(6, 8))
  // Do something here to choose words.
  return `${fname.hex}${lname.hex}#${tag}`
}
