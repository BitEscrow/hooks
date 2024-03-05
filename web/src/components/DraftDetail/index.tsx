import { useSigner } from '@/hooks/useSigner'
import { useParams } from 'react-router-dom'

import {
  Card,
  Center,
  Divider,
  Loader,
  Text,
  Title
} from '@mantine/core'

import Room from './components/room'

export default function () {
  
  const { signer } = useSigner()
  const { sid }    = useParams()

  return (
    <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      
      <Title order={2} mb={15}>Draft Room</Title>
      <Text c="dimmed" style={{ marginBottom: '20px' }} maw='500px'>
        Select a deposit below to view the details.
      </Text>
      <Divider mb={30} mt={20} />
      { signer !== null && sid !== undefined
        && <Room secret={ sid } signer={ signer } /> 
        || <Center><Loader color="blue" /></Center>
      }
    </Card>
  )
}
