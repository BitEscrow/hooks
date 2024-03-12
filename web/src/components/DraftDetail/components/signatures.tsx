import { DraftData, DraftSession }  from '@scrow/core'
import { Box, Button, Chip, Group } from '@mantine/core'

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
      <Group h={20} bg='gray'>
        { aliases.map(e => <Chip key={e}>{e}</Chip>) }
      </Group>
      <Button
        disabled = {!session.is_full || session.is_endorsed}
        onClick  = {() => session.endorse()}
      >
        Endorse
      </Button>
    </Box>
  )
}

function get_alias (pubkey : string) {
  return pubkey.slice(0, 8)
}