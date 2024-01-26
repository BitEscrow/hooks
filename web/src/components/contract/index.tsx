import { useSigner }     from '@/hooks/useSigner'
//import { useContract }   from '@scrow/hooks/contract'
import ContractListView  from './components/list'

import { Box } from '@mantine/core'

//import { useClient } from '@scrow/hooks/client'

export default function ContractView () {
  //const client = useClient()
  const { signer } = useSigner()
  const cid = '798e5e4a51e60dea79690dcd3114f65fa510c539514e8f89d6a22beaed98473a'
  //const { data } = useContract(client, cid)

  return (
    <Box>
      {/* { data && <pre>{JSON.stringify(data, null, 2)}</pre>} */}
      <Box>
        { signer !== null && <ContractListView signer={signer} />}
      </Box>
    </Box>
  )
}
