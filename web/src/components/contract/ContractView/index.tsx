import { useSigner } from '@/hooks/useSigner'

import {
  Text,
  Title,
  Card,
  Divider
} from '@mantine/core'

import ContractSearch from '../ContractSearch'
import ContractList   from '../ContractTable'

export default function ContractView() {

  const store = useSigner()

  return (
    <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <ContractSearch/>
      <Divider mb={30} mt={20} />
      <Title order={2} mb={15}>Existing Contracts</Title>
      <Text c="dimmed" style={{ marginBottom: '20px' }} maw='500px'>
        { store.signer !== null 
          && 'This is a list of contracts assigned to your pubkey. You can click on any one of them in the table to view the details.'
          || 'Please login in order to view a list of contracts.'
        }
      </Text>
      { store.signer !== null &&
        <>
          <Divider mb={30} mt={20} />
          <ContractList signer={ store.signer } /> 
        </>
      }
    </Card>
  )
}
