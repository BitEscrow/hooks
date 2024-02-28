import { useConfig }       from '@/hooks/useConfig'
import { useSigner }       from '@/hooks/useSigner'

import { DraftData, DraftSession } from '@scrow/core'

import {
  useEffect,
  useState
} from 'react'

import { useParams } from 'react-router-dom'

import { Card, Center, Divider, Loader, Text, Title } from '@mantine/core'

import Room from './components/room'

export default function () {
  const { store }  = useConfig()
  const { signer } = useSigner()
  const { sid }    = useParams()

  const [ session, setSession ] = useState<DraftSession | null>(null)
  const [ data, setData ]       = useState<DraftData | null>(null)

  useEffect(() => {
    if (signer !== null && session === null) {
      setSession(new DraftSession(signer, {
        socket_config : { verbose : true, debug : true },
        store_config  : { verbose : true, debug : true },
        verbose : true
      }))
    }
  }, [ signer, session ])

  useEffect(() => {
    if (
      session !== null  && 
      sid !== undefined && 
      !session.is_ready
    ) {

      session.on('error', (err : Error) => {
        console.log('error:', err)
      })

      session.on('ready', () => {
        console.log('ready')
        setData(session.data)
      })

      session.on('update', () => {
        console.log('update')
        setData(session.data)
      })
      
      console.log('connecting ...')
      console.log(store.relay, sid)
      session.connect(store.relay, sid)
    }
  }, [ session ])

  return (
    <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      
      <Title order={2} mb={15}>Draft Room</Title>
      <Text c="dimmed" style={{ marginBottom: '20px' }} maw='500px'>
        Select a deposit below to view the details.
      </Text>
      <Divider mb={30} mt={20} />
      { data === null && <Center><Loader color="blue" /></Center>}
      { data !== null && session !== null && 
        <Room data={ data } session={ session } /> 
      }
    </Card>
  )
}
