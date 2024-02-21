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
        bg      = '#0068FD'
        onClick = {() => session.load(pass, pubkey)}
        mt={20}
        radius  = {15}
      >
        Unlock
      </Button>
    </Box>
  )
}