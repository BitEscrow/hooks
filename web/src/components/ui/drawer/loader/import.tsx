import { useState }  from 'react'
import { Buff }      from '@cmdcode/buff'
import { Seed }      from '@cmdcode/signer'
import { useSigner } from '@/hooks/useSigner'

import {
  Box,
  Button,
  Center,
  SegmentedControl,
  TagsInput,
  TextInput
} from '@mantine/core'

// Need to pass in password as prop.
// have input field change based on selection.
// textinput for xprv or seed (with zod validation).
// multi-input for bip39 (with bip39 validation hook?)

interface Props {
  pass  : string
  xpub ?: string
}

export default function ImportView ({ pass, xpub } : Props) {

  const { session } = useSigner()

  const [ view, setView ]     = useState('bip39')
  const [ phrase, setPhrase ] = useState('')
  const [ word, setWord ]     = useState<string[]>([])
  const [ seed, setSeed ]     = useState('')
  const [ xprv, setXprv ]     = useState('')

  const submit = () => {
    let secret : Buff | undefined
    if (view === 'bip39') {
      secret = Buff.raw(Seed.import.from_words(word))
    } else if (view === 'phrase') {
      secret = Seed.import.from_char(phrase)
    } else if (view === 'seed') {
      secret = Buff.hex(seed)
    } else if (view === 'xprv') {
      secret = Seed.import.from_char(xprv)
    }
    if (secret === undefined) throw new Error('no seed set')
    session.create(pass, secret.hex, xpub)
  }

  return (
    <Box>
      <Box p={15}>
        {view === 'bip39' &&
          <TagsInput
            clearable
            c = 'black'
            label       = "BIP-39 Word List"
            placeholder ="enter seed words ..."
            maxTags     = {24}
            value       = {word}
            onChange    = {setWord}
            splitChars  = {[',', ' ']}
          />
        }
        {view === 'phrase' &&
          <TextInput
            c = 'black'
            label       = "Secret Phrase"
            placeholder = "enter a secret phrase ..."
            value       = {phrase}
            onChange    = {e => setPhrase(e.target.value)}
          />
        }
        {view === 'seed' &&
          <TextInput
            c = 'black'
            label       = "Hex Seed"
            placeholder ="enter hexadecimal string ..."
            value       = {seed}
            onChange    = {e => setSeed(e.target.value)}
          />
        }
        {view === 'xprv' &&
          <TextInput
            c = 'black'
            label       = "BIP-32 Key"
            placeholder ="enter xprv ..."
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
            value: 'phrase',
            label: (
              <Center>
                {/* <IconCode style={{ width: rem(16), height: rem(16) }} /> */}
                <Box>Phrase</Box>
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
                <Box>XPrv</Box>
              </Center>
            ),
          },
        ]}
      />
      <Button
        style    = {{ width: '95%'}}
        bg      = '#0068FD'
        onClick={submit}
        m={10}
        radius   = {15}
      >
        Import
      </Button>
    </Box>
  )
}
