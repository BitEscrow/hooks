import { useSigner } from '@/hooks/useSigner'

import {
  useNavigate,
  useParams
} from 'react-router-dom'

import {
  Button,
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

  const navigate = useNavigate()

  const reload = () => {
    navigate(`/drafts/${sid}`)
  }

  return (
    <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      
      <Title order={2} mb={15}>Draft Room</Title>
      <Text c="dimmed" style={{ marginBottom: '20px' }} maw='500px'>
        Negotiate on a contract proposal.
      </Text>
      <Divider mb={30} mt={20} />
      { signer !== null && sid !== undefined
        && <Room secret={ sid } signer={ signer } /> 
        || <>
            <Center><Loader color="blue" /></Center>
            <Button onClick={reload}>Reload</Button>
          </>
      }
    </Card>
  )
}
