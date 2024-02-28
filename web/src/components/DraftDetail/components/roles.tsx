import { JsonInput, ScrollArea, Stack } from '@mantine/core'
import { DraftData, DraftSession } from '@scrow/core'

interface Props {
  data    : DraftData
  session : DraftSession
}

export default function ({ data, session } : Props) {
  return (
    <ScrollArea h={250}>
      <Stack>
        { data.roles.map((e, idx) => (
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
