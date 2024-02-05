import { useSigner }   from '@/hooks/useSigner'
import { Box, Button } from '@mantine/core'

interface Props {
  pass   : string
  pubkey : string
}

export default function UnlockView({ pass, pubkey } : Props) {

  const { session } = useSigner()

  return (
    <Box>
      <Button
        fullWidth
        mt      = {15}
        bg      = 'green'
        onClick = {() => session.load(pass, pubkey)}
        radius  = {0}
      >
        Unlock
      </Button>
    </Box>
  )
}