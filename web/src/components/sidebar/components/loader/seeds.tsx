
import { useSigner } from '@/context/useSigner'
import { Box, Button, Center, Checkbox, Flex, Group } from '@mantine/core'

import { useState } from 'react'

interface Props {
  pass : string
}

export default function SeedView ({ pass } : Props) {

  const { gen_words, store } = useSigner()

  const [ agree, setAgree ] = useState(false)
  const [ words, setWords ] = useState(gen_words())

  const regen  = () => setWords(gen_words())

  const submit = () => {
    store.import(pass).from_bip39(words)
  }

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
                bg='indigo'
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
      </Flex>
      <Center m={15}>
        <Checkbox
          label    = 'I backed up my seed words.'
          c        = 'white'
          size     = "md"
          checked  = {agree}
          onChange = {() => setAgree(!agree)}
        />
      </Center>
      <Group gap={0}>
        <Button
          style    = {{ flex : 1 }}
          bg       = 'purple'
          radius   = {0}
          onClick  = {regen}
          disabled = {agree}
        >
          Regenerate
        </Button>
        <Button
          style    = {{ flex : 1 }}
          bg       = 'green'
          radius   = {0}
          onClick  = {submit}
          disabled = {!agree}
        >
          Submit
        </Button>
      </Group>
    </Box>
  )
}

