import { useConfig }       from '@/hooks/useConfig'
import { useSigner }       from '@/hooks/useSigner'
import { useDraftSession } from '@scrow/hooks/draft'
import { DraftData }       from '@scrow/core'

import {
  useEffect,
  useState
} from 'react'

import {
  useNavigate,
  useParams
} from 'react-router-dom'

import { Card, Divider, Text, Title } from '@mantine/core'

export default function () {
  const { store }  = useConfig()
  const { signer } = useSigner()
  const { sid }    = useParams()
  const navigate   = useNavigate()

  if (typeof sid !== 'string' || signer === null) {
    navigate('/404')
    return
  }

  const { session, update_session } = useDraftSession()
  const [ data, setData ] = useState<DraftData | null>()

  useEffect(() => {
    if (signer !== null) {
      if (
        session === null || 
        session.pubkey !== signer.pubkey
      ) {
        console.log('updating session ...')
        update_session(signer)
      }
    }
  }, [ signer, session ])

  useEffect(() => {
    if (session !== null && !session.is_ready) {
      session.once('ready', () => {
        setData(session.data)
      })
      session.on('update', () => {
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
      { data !== null &&
        <pre>
          {JSON.stringify(data, null, 2)}
        </pre>
      }
    </Card>
  )
}
