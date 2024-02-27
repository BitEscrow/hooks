import { useSigner } from '@/hooks/useSigner'

import { Box } from '@mantine/core'

import LoaderView from './loader'
import SignerView from './signer'

export default function UserView () {

  const { signer } = useSigner()

  return (
    <Box 
      bg='white' 
      h={ signer !== null ? '200px' : '555px'}>
      { signer === null
        && <LoaderView />
        || <SignerView />
      }
    </Box>
  )
}
