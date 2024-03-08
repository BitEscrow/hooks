import { ContractData } from '@scrow/core'

import { Box, JsonInput } from '@mantine/core'

interface Props {
  data : ContractData
}

export default function ({ data } : Props) {

  return (
    <Box>
      <JsonInput
        formatOnBlur
        autosize
        minRows={4}
        maxRows={25}
        value={JSON.stringify(data, null, 2)}
      />
    </Box>
  )
}
