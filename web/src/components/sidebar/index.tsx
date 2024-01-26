import { useSigner } from '@/context/useSigner'

import { Box } from '@mantine/core'

import LoaderView from './components/loader'
import SignerView from './components/signer'

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
