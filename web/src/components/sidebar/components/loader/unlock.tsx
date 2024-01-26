import { useSigner } from '@/context/useSigner'
import { Box, Button } from '@mantine/core'

interface Props {
  pass : string
}

export default function UnlockView({ pass } : Props) {

  const { store } = useSigner()

  const submit = () => store.load(pass)

  return (
    <Box>
      <Button
        fullWidth
        mt      = {15}
        bg      = 'green'
        onClick = {submit}
        radius  = {0}
      >
        Unlock
      </Button>
    </Box>
  )
}