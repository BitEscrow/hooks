import { DraftData, DraftSession } from '@scrow/core'
import { useConfig }    from '@/hooks/useConfig'
import { useSigner }    from '@/hooks/useSigner'
import { useParams }    from 'react-router-dom'


import {
  useEffect,
  useState
} from 'react'

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
  const { store }  = useConfig()
  const { signer } = useSigner()
  const { sid }    = useParams()

  const [ session, setSession ] = useState<DraftSession | null>(null)
  const [ data, setData ]       = useState<DraftData | null>(null)

  useEffect(() => {
    if (signer !== null && sid !== undefined) {
      const new_session = new DraftSession(sid, signer)

      if (session === null) {
        new_session.once('ready', () => {
          setData(new_session.data)
        })
        new_session.on('fetch', () => {
          setData(new_session.data)
        })
        new_session.on('update', () => {
          setData(new_session.data)
        })
        setSession(new_session)
      }

      new_session.connect(store.relay)
    }
  }, [ signer, sid ])

  return (
    <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      
      <Title order={2} mb={15}>Draft Room</Title>
      <Text c="dimmed" style={{ marginBottom: '20px' }} maw='500px'>
        Select a deposit below to view the details.
      </Text>
      <Divider mb={30} mt={20} />
      { session !== null && data !== null
        && <Room data={ data } session={ session } /> 
        || <Center><Loader color="blue" /></Center>
      }
    </Card>
  )
}
