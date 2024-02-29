import {
  DraftData,
  DraftSession
} from '@scrow/core'

import {
  JsonInput,
  ScrollArea,
  Stack
} from '@mantine/core'

interface Props {
  data    : DraftData
  session : DraftSession
}

export default function ({ data } : Props) {
  return (
    <ScrollArea h={250}>
      <Stack>
        { data.members.map((e, idx) => (
          <JsonInput 
            autosize
            key={idx} 
            value={JSON.stringify(e, null, 2)}
          />
        ))}
      </Stack>
    </ScrollArea>
  )
}
