import { useSigner } from '@/hooks/useSigner'

import { Box } from '@mantine/core'

import LoaderView from './loader'
import SignerView from './signer'

export default function SideBar () {

  const { signer } = useSigner()

  return (
    <Box bg='gray' h='100%'>
      { signer === null
        && <LoaderView />
        || <SignerView />
      }
    </Box>
  )
}
