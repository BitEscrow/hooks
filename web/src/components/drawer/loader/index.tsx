import { useSigner } from '@/hooks/useSigner'

import { Box, Center, PasswordInput } from '@mantine/core'

import { useState } from 'react'

import ImportView from './import'
import SeedView   from './seeds'
import ControlView from './controls'
import UnlockView from './unlock'

// const iconStyle = { width: rem(16), height: rem(16) }

export default function LoaderView () {

  const { session } = useSigner()

  const [ selected, setSelected ] = useState<string | null>(null)

  const [ view,  setView  ] = useState('unlock')
  const [ pass,  setPass  ] = useState('')
  
  return (
    <Box>
      <ControlView view={view} setView={setView} />


      <Center mih={100} mt={25}>
        <ul>
          {session.list.map(([ pubkey ]) => (
            <li key={pubkey}>
              <span style={{marginRight: '10px'}}>
                {`${pubkey.slice(0, 7)}...${pubkey.slice(-7)}`}
              </span>
              <button onClick={() => setSelected(pubkey) }>[o]</button>
              <button onClick={() => session.remove(pubkey) }>[x]</button>
            </li>
          ))}
        </ul>
      </Center>
      <PasswordInput
        c           = 'black'
        label       = 'Password'
        placeholder = 'enter password ...'
        p={15}
        value       = {pass}
        onChange    = {(e) => setPass(e.target.value)}
      />
      <Box>
          { view === 'create' && <SeedView   pass={pass} />}
          { view === 'import' && <ImportView pass={pass} />}
          { view === 'unlock' && selected && <UnlockView pubkey={selected} pass={pass} />}
      </Box>
    </Box>
  )
}
