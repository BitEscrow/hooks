import { Box, Center, SegmentedControl } from '@mantine/core'

import { Dispatch, SetStateAction } from 'react'

interface Props {
  view    : string
  setView : Dispatch<SetStateAction<string>>
}

export default function SignerControlView ({ view, setView } : Props) {

  return (
    <SegmentedControl
      fullWidth
      radius   = {0}
      value    = {view}
      onChange = {setView}
      data     = {[
        {
          value: 'info',
          label: (
            <Center>
              {/* <IconEye style={{ width: rem(16), height: rem(16) }} /> */}
              <Box>Info</Box>
            </Center>
          ),
        },
        {
          value: 'contracts',
          label: (
            <Center>
              {/* <IconCode style={{ width: rem(16), height: rem(16) }} /> */}
              <Box>Contracts</Box>
            </Center>
          ),
        },
        {
          value: 'deposits',
          label: (
            <Center>
              {/* <IconExternalLink style={{ width: rem(16), height: rem(16) }} /> */}
              <Box>Deposits</Box>
            </Center>
          ),
        },
      ]}
    />
  )
}