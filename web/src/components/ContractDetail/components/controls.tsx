import { Dispatch, SetStateAction }      from 'react'
import { Center, SegmentedControl, rem } from '@mantine/core'
import { IconBraces, IconForms }         from '@tabler/icons-react'

interface Props {
  setView : Dispatch<SetStateAction<string>>
}

export default function ({ setView } : Props) {
  return (
    <SegmentedControl onChange={setView}
      data={[
        {
          value: 'fields',
          label: (
            <Center style={{ gap: 10 }}>
              <IconForms style={{ width: rem(16), height: rem(16) }} />
            </Center>
          ),
        },
        {
          value: 'json',
          label: (
            <Center style={{ gap: 10 }}>
              <IconBraces style={{ width: rem(16), height: rem(16) }} />
            </Center>
          ),
        }
      ]}
    />
  )
}
