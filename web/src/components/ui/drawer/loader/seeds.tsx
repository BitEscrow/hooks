import { useState }     from 'react'
import { Buff }         from '@cmdcode/buff'
import { Seed }         from '@cmdcode/signer'
// import { useClipboard } from '@mantine/hooks'
import { useSigner }    from '@/hooks/useSigner'

import { Box, Button, Center, Checkbox, Flex, Group, Text } from '@mantine/core'

interface Props {
  pass  : string
  xpub ?: string
}

export default function SeedView ({ pass, xpub } : Props) {

  const { gen_words, session } = useSigner()

  const [ agree, setAgree ] = useState(false)
  const [ words, setWords ] = useState(gen_words())

  const [copyButtonText, setCopyButtonText] = useState('Copy Seed Words');

  const regen  = () => setWords(gen_words())

  const submit = () => {
    const seed = Buff.raw(Seed.import.from_words(words))
    session.create(pass, seed.hex, xpub)
  }

  const copyToClipboard = () => {
    const textToCopy = words.map((word, index) => `${index + 1}. ${word}`).join('\n');
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopyButtonText('Copied!');
      setTimeout(() => setCopyButtonText('Copy Seed Words'), 2000);
    }).catch(err => {
      console.error('Failed to copy seed words: ', err);
    });
  };

  return (
    <Box>
      <Flex
        justify='center'
        p={5}
        h='100%'
        w='100%'
        wrap='wrap'
      >
        { words.map(e => {
            return (
              <Button
                key={e}
                c='white'
                m={5}
                p={5}
                bg='black'
                w={85}
                h={30}
                ta='center'
                radius={5}
                size='compact-xs'
              >
                {e}
              </Button>
            )
          })
        }

      <Center m={15}>
        <Button
          fullWidth
          variant="transparent"
          onClick={copyToClipboard}
        >
          {copyButtonText}
        </Button>
      </Center>

      </Flex>
      <Center m={15}>
        <Group
          align="center">
        <Checkbox
          size="sm"
          checked={agree}
          onChange={() => setAgree(!agree)}
        />
        <Text c="black" size="sm">
          I backed up my seed words
        </Text>
      </Group>
    </Center>
      <Group gap={0}>
        <Button
          style    = {{ flex : 1 }}
          bg='green'
          m={10}
          radius   = {15}
          onClick  = {regen}
          disabled = {agree}
        >
          Regenerate
        </Button>
        <Button
          style    = {{ flex : 1 }}
          bg       = '#0068FD'
          m={10}
          radius   = {15}
          onClick  = {submit}
          disabled = {!agree}
        >
          Submit
        </Button>
      </Group>
    </Box>
  )
}

