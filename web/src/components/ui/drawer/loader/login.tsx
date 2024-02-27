import { useState }  from 'react'
import { useSigner } from '@/hooks/useSigner'

import {
  Box,
  PasswordInput,
  Button,
} from '@mantine/core'

import SessionsView from './sessions'

export default function UnlockView() {

  const { session } = useSigner()

  const [ selected, setPub ] = useState<string | null>(null)
  const [ pass, setPass ]    = useState('')

  return (
    <Box>
      <SessionsView setPub={setPub} />
      { selected !== null &&
        <>
          <PasswordInput
            c           = 'black'
            required    = {true}
            label       = 'Password'
            placeholder = 'enter password ...'
            p           = {15}
            value       = {pass}
            onChange    = {(e) => setPass(e.target.value)}
          />
          <Button
            fullWidth
            bg      = '#0068FD'
            onClick = {() => session.load(pass, selected)}
            mt      = {20}
            radius  = {15}
          >
            Unlock
          </Button>
        </>
      }
      
    </Box>
  )
}
