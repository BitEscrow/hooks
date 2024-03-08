import { useSigner } from '@/hooks/useSigner'

import {
  Title,
  Text,
  Card,
  Divider
} from '@mantine/core'

import DepositList   from '../DepositList'
import DepositSearch from '../DepositSearch'

export default function DepositView() {

  const store = useSigner()

  return (
    <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <DepositSearch />
      <Divider mb={30} mt={20} />
      <Title order={2} mb={15}>Existing Deposits</Title>
      <Text c="dimmed" style={{ marginBottom: '20px' }} maw='500px'>
        { store.signer !== null 
          && 'Select a deposit below to view the details.'
          || 'You must login in order to view your deposits.'
        }
      </Text>
      { store.signer !== null && <DepositList signer={ store.signer } /> }
    </Card>
  )
}