import { useSigner } from '@/context/useSigner'
import { Box, Button, Center, SegmentedControl, TagsInput, TextInput } from '@mantine/core'
import { useState } from 'react'

// Need to pass in password as prop.
// have input field change based on selection.
// textinput for xprv or seed (with zod validation).
// multi-input for bip39 (with bip39 validation hook?)

interface Props {
  pass : string
}

export default function ImportView ({ pass } : Props) {

  const { store } = useSigner()

  const [ view, setView ] = useState('seed')
  const [ word, setWord ] = useState<string[]>([])
  const [ seed, setSeed ] = useState('')
  const [ xprv, setXprv ] = useState('')

  const submit = () => {
    if (view === 'bip39') {
      store.import(pass).from_bip39(word)
    } else if (view === 'seed') {
      store.import(pass).from_seed(seed)
    } else if (view === 'xprv') {
      store.import(pass).from_xprv(xprv)
    }
  }

  return (
    <Box>
      <Box p={15}>
        {view === 'bip39' &&
          <TagsInput
            clearable
            c = 'white'
            label       = "BIP39 Import"
            placeholder ="enter seed words ..."
            maxTags     = {24}
            value       = {word}
            onChange    = {setWord}
            splitChars  = {[',', ' ']}
          />
        }
        {view === 'seed' &&
          <TextInput
            c = 'white'
            label       = "Seed Import"
            placeholder ="enter hexadecimal string ..."
            value       = {seed}
            onChange    = {e => setSeed(e.target.value)}
          />
        }
        {view === 'xprv' &&
          <TextInput
            c = 'white'
            label       = "Key Import"
            placeholder ="enter xprv key ..."
            value       = {xprv}
            onChange    = {e => setXprv(e.target.value)}
          />
        }
      </Box>
      <SegmentedControl
        fullWidth
        value    = {view}
        onChange = {setView}
        radius   = {0}
        data     = {[
          {
            value: 'bip39',
            label: (
              <Center>
                {/* <IconEye style={{ width: rem(16), height: rem(16) }} /> */}
                <Box>BIP39</Box>
              </Center>
            ),
          },
          {
            value: 'seed',
            label: (
              <Center>
                {/* <IconCode style={{ width: rem(16), height: rem(16) }} /> */}
                <Box>Seed</Box>
              </Center>
            ),
          },
          {
            value: 'xprv',
            label: (
              <Center>
                {/* <IconExternalLink style={{ width: rem(16), height: rem(16) }} /> */}
                <Box>XPRV</Box>
              </Center>
            ),
          },
        ]}
      />
      <Button
        fullWidth
        bg      = 'green'
        radius  = {0}
        onClick = {submit}
      >
        Import
      </Button>
    </Box>
  )
}
