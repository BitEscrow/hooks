import { Box, Chip, Group, Text }  from '@mantine/core'
import { DraftData, DraftSession } from '@scrow/core'

interface Props {
  data    : DraftData
  session : DraftSession
}

export default function ({ data, session } : Props) {

  const aliases = new Map(data.members.map(e => {
    return [ e.pub, get_alias(e.pub) ]
  }))

  const approvals = data.approvals.map(e => e.slice(0, 64))

  return (
    <Box>
      <Text>Approvals</Text>
      <Group h={20} bg='gray'>
        { data.members.map(e => {
          return <Chip checked={approvals.includes(e.pub)}>
            { aliases.get(e.pub) ?? 'undefined' }
          </Chip>
        }) }
      </Group>
    </Box>
  )
}

function get_alias (pubkey : string) {
  return pubkey.slice(0, 8)
}