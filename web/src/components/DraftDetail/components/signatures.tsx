import { DraftData, DraftSession } from '@scrow/core'
import { Box, Chip, Group, Text }  from '@mantine/core'

interface Props {
  data    : DraftData
  session : DraftSession
}

export default function ({ data, session } : Props) {

  const aliases = data.signatures.map(e => {
    const pub = e.slice(0, 64)
    return get_alias(pub)
  })

  return (
    <Box>
      <Text>Signatures</Text>
      <Group h={20} bg='gray'>
        { aliases.map(e => <Chip>{e}</Chip>) }
      </Group>
    </Box>
  )
}

function get_alias (pubkey : string) {
  return pubkey.slice(0, 8)
}