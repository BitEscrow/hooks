import { useSigner } from '@/context/useSigner'

import ContractListView from './components/list'

import { Box } from '@mantine/core'

export default function ContractView () {
  const { signer } = useSigner()

  return (
    <Box>
      { signer !== null && <ContractListView signer={signer} />}
    </Box>
  )
}
