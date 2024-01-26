// import { useSigner } from '@/context/useSigner'

import { Box, Center, PasswordInput, Text } from '@mantine/core'

// import { IconBraces, IconForms }  from '@tabler/icons-react'
import { useState } from 'react'

import ImportView from './import'
import SeedView   from './seeds'
import ControlView from './controls'
import UnlockView from './unlock'

// Show password box.
// Import, unlock, generate

export default function LoaderView () {

  // const { gen_words, signer, store } = useSigner()

  const [ view,  setView  ] = useState('unlock')
  const [ pass,  setPass  ] = useState('')

  // const iconStyle = { width: rem(16), height: rem(16) }
  
  return (
    <Box bg='blue'>
      <ControlView view={view} setView={setView} />
      <Center mih={100} mt={25}>
        <Text c='white' fs="italic">No signing device loaded.</Text>
      </Center>
      <PasswordInput
        c           = 'white'
        label       = 'Password'
        placeholder = 'enter password ...'
        p={15}
        value       = {pass}
        onChange    = {(e) => setPass(e.target.value)}
      />
      <Box>
          { view === 'create' && <SeedView   pass={pass} />}
          { view === 'import' && <ImportView pass={pass} />}
          { view === 'unlock' && <UnlockView pass={pass} />}
      </Box>
    </Box>
  )
}
