import { DraftData, DraftSession }  from '@scrow/core'
import { Box, Button, Group, Text } from '@mantine/core'

interface Props {
  data    : DraftData
  session : DraftSession
}

export default function ({ data, session } : Props) {

  return (
    <Box h={200}>
      <Text>Seats</Text>
      <Group h={20} bg='gray'>
        { session.roles.map(e => {
          const curr = session.members.filter(x => x.pol === e.id).length
          return (
            <Box>
              <Text>{e.title}</Text>
              <Text>{`${e.min_slots} / ${curr} / ${e.max_slots}`}</Text>
              <Button>Join</Button>
            </Box>
          )
        })}
      </Group>
    </Box>
  )
}
