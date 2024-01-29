import { useSigner }     from '@/hooks/useSigner'
import { useContract }   from '@scrow/hooks/contract'
import ContractListView  from './components/list'

import { Box } from '@mantine/core'

import { useClient } from '@scrow/hooks/client'

export default function ContractView () {
  const client = useClient()
  const { signer } = useSigner()
  const cid = 'affc79d7b8a83fb811ab05d829180861fd7d38e235aa028fd5258f08fd971b9b'
  // const { data } = useContract(client, cid)

  return (
    <Box>
      {/* { data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
      <Box>
        { signer !== null && <ContractListView signer={signer} />}
      </Box>
    </Box>
  )
}
