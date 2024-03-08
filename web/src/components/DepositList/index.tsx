import { EscrowSigner }   from '@scrow/core'
import { useDepositList } from '@scrow/hooks/deposit'

import {
    Center,
    Text,
    Loader
} from '@mantine/core'

import DepositItem from './components/row'

interface Props {
  signer : EscrowSigner
}

export default function ({ signer } : Props) {
  const { data, isLoading } = useDepositList(signer)

  return (
    <>
      { isLoading 
        && <Center><Loader color="blue" /></Center>
        || data.length > 0 
          && data.map(e => <DepositItem key={e.dpid} data={e} />)
          ||
            <Center mt={50} mb={50} style={{ width: '100%', height: '100%', padding: '20px' }}>
                <Text c="dimmed">You have no known deposits.</Text>
            </Center>
        }
    </>
  )
}
