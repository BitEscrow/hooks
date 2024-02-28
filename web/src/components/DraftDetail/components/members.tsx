import { Box } from '@mantine/core'

import { DraftData, DraftSession } from '@scrow/core'

interface Props {
  data    : DraftData
  session : DraftSession
}

export default function ({ data, session } : Props) {
  return (
    <Box h={200} bg='gray'>
      { data.members.map(e => (
        <pre>{JSON.stringify(e, null, 2)}</pre>
      ))}
    </Box>
  )
}
