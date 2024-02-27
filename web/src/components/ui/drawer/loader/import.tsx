import { useState }  from 'react'
import { Buff }      from '@cmdcode/buff'
import { Seed }      from '@cmdcode/signer'
import { useSigner } from '@/hooks/useSigner'

import {
  Box,
  Button,
  Center,
  PasswordInput,
  SegmentedControl,
  TagsInput,
  TextInput
} from '@mantine/core'

// Need to pass in password as prop.
// have input field change based on selection.
// textinput for xprv or seed (with zod validation).
// multi-input for bip39 (with bip39 validation hook?)

export default function ImportView () {

  const { session } = useSigner()

  const [ view, setView ]     = useState('bip39')
  const [ phrase, setPhrase ] = useState('')
  const [ word, setWord ]     = useState<string[]>([])
  const [ seed, setSeed ]     = useState('')
  const [ xprv, setXprv ]     = useState('')
  const [ pass,  setPass  ]   = useState('')
  const [ xpub,  setXpub  ]   = useState('')

  const wallet_key = xpub !== '' ? xpub : undefined

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
    session.create(pass, secret.hex, wallet_key)
  }

  return (
    <Box>
      <PasswordInput
        c           = 'black'
        label       = 'New Password'
        placeholder = 'enter password ...'
        required    = {true}
        p={15}
        value       = {pass}
        onChange    = {(e) => setPass(e.target.value)}
      />
      <TextInput
        c           = 'black'
        label       = 'Wallet Key'
        placeholder = 'enter xpub ...'
        p={15}
        value       = {xpub}
        onChange    = {(e) => setXpub(e.target.value)}
      />
      <Box p={15}>
        {view === 'xprv' &&
          <TextInput
            c = 'black'
            required    = {view === 'xprv'}
            label       = "BIP-32 Private Key"
            placeholder ="enter xprv ..."
            value       = {xprv}
            onChange    = {e => setXprv(e.target.value)}
          />
        }
        {view === 'bip39' &&
          <TagsInput
            clearable
            c = 'black'
            required    = {view === 'bip39'}
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
            required    = {view === 'phrase'}
            label       = "Secret Phrase"
            placeholder = "enter a secret phrase ..."
            value       = {phrase}
            onChange    = {e => setPhrase(e.target.value)}
          />
        }
        {view === 'seed' &&
          <TextInput
            c = 'black'
            required    = {view === 'seed'}
            label       = "Hex-Encoded Seed"
            placeholder ="enter hex string ..."
            value       = {seed}
            onChange    = {e => setSeed(e.target.value)}
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
            value: 'xprv',
            label: (
              <Center>
                {/* <IconExternalLink style={{ width: rem(16), height: rem(16) }} /> */}
                <Box>BIP-32</Box>
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
            value: 'bip39',
            label: (
              <Center>
                {/* <IconEye style={{ width: rem(16), height: rem(16) }} /> */}
                <Box>Words</Box>
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
