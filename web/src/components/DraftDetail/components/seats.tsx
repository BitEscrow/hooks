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
        { data.roles.map(e => {
          const curr = data.members.filter(x => x.pol === e.id).length

          return (
            <Box key={ e.id }>
              <Text>{e.title}</Text>
              <Text>{`${e.min_slots} / ${curr} / ${e.max_slots}`}</Text>
              <Button
                disabled = {session.is_member}
                onClick  = {() => session.join(e.id) }
              >
                Join
              </Button>
            </Box>
          )
        })}
      </Group>
    </Box>
  )
}
