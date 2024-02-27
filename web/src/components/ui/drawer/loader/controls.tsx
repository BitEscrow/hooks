import { Box, Center, SegmentedControl } from '@mantine/core'

import { Dispatch, SetStateAction } from 'react'

interface Props {
  view    : string
  setView : Dispatch<SetStateAction<string>>
}

export default function ControlView ({ view, setView } : Props) {

  return (
    <SegmentedControl
      fullWidth
      radius   = {0}
      value    = {view}
      onChange = {setView}
      data     = {[
        {
          value: 'create',
          label: (
            <Center>
              {/* <IconEye style={{ width: rem(16), height: rem(16) }} /> */}
              <Box ml={10}>Create</Box>
            </Center>
          ),
        },
        {
          value: 'import',
          label: (
            <Center>
              {/* <IconCode style={{ width: rem(16), height: rem(16) }} /> */}
              <Box ml={10}>Import</Box>
            </Center>
          ),
        },
        {
          value: 'login',
          label: (
            <Center>
              {/* <IconExternalLink style={{ width: rem(16), height: rem(16) }} /> */}
              <Box ml={10}>Login</Box>
            </Center>
          ),
        },
      ]}
    />
  )
}