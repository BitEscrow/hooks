import { EscrowSigner }    from '@scrow/core'
import { useContractList } from '@scrow/hooks/contract'

import {
    Center,
    Text,
    Loader
} from '@mantine/core'

import ContractItem from './components/row'

interface Props {
  signer : EscrowSigner
}

export default function ({ signer } : Props) {
  const { data, isLoading } = useContractList(signer)

  return (
    <>
      { isLoading 
        && <Center><Loader color="blue" /></Center>
        || data.length > 0 
          && data.map(e => <ContractItem key={e.cid} data={e} />)
          ||
            <Center mt={50} mb={50} style={{ width: '100%', height: '100%', padding: '20px' }}>
                <Text c="dimmed">You have no known contracts.</Text>
            </Center>
        }
    </>
  )
}
