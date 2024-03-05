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
          const is_mbr  = session.is_member
          const is_pol  = is_mbr && session.mship.pol === e.id
          const curr    = data.members.filter(x => x.pol === e.id).length
          const is_full = curr >= e.max_slots
          return (
            <Box key={ e.id }>
              <Text>{e.title}</Text>
              <Text>{`${e.min_slots} / ${curr} / ${e.max_slots}`}</Text>
              <Button
                disabled = {(!is_pol && is_full) || (is_mbr && !is_pol)}
                onClick  = {() => {
                  if (is_pol) {
                    session.leave()
                  } else {
                    session.join(e.id)
                  }
                }}
              >
                { (is_pol) ? 'Leave' : 'Join' }
              </Button>
            </Box>
          )
        })}
      </Group>
    </Box>
  )
}
