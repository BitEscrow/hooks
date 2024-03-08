import { StateData } from '@scrow/core'

import { Box, JsonInput } from '@mantine/core'

interface Props {
  data : StateData | null
}

export default function ({ data } : Props) {

  const state = (data) ? JSON.stringify(data, null, 2) : '{}'

  return (
    <Box>
      <JsonInput
        formatOnBlur
        autosize
        minRows={4}
        maxRows={25}
        value={state}
      />
    </Box>
  )
}
