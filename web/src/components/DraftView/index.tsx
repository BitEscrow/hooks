import { useEffect, useState }     from 'react'
import { DraftItem, DraftSession } from '@scrow/core'
import { useSigner }               from '@/hooks/useSigner'
import { useConfig }               from '@/hooks/useConfig'

import {
  Button,
  Title,
  Text,
  Card,
  Divider
} from '@mantine/core'

import DraftList   from '../DraftList'
import DraftSearch from '../DraftSearch'


export default function DraftView () {

  const { store }  = useConfig()
  const { signer } = useSigner()

  const [ session, setSession ]   = useState<DraftSession | null>(null)
  const [ sessions, setSessions ] = useState<DraftItem[]>([])

  const update_draft_list = () => {
    if (session === null) {
      throw new Error('Session is not initialized')
    }
    session.list(store.relay).then(res => {
      void setSessions(res)
    })
  }

  useEffect(() => {
    if (signer !== null) {
      setSession(new DraftSession(signer))
    }
  }, [ signer ])

  useEffect(() => {
    if (session !== null) {
      update_draft_list()
    }
  }, [ session ])

  return (
    <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      { session === null &&
        <Text c="dimmed" style={{ marginBottom: '20px' }} maw='500px'>
          Login with a signing device to view your drafts.
        </Text>
      }       
      
      { session !== null && signer !== null &&
        <>
          <DraftSearch />
          <Divider mb={30} mt={20}/>
          <Title order={2} mb={15}>Existing Drafts</Title>
          <Text c="dimmed" style={{ marginBottom: '20px' }} maw='500px'>
            Click on a draft below to view the details.
          </Text>
          <Divider mb={30} mt={20}/>
          <DraftList signer={ signer }/>
          {/* <Divider mb={30} mt={20}/>
          <Button
            maw     = {100}
            variant ="filled"
            onClick = {() => session.list(store.relay) }
          >
            Refresh
          </Button> */}
      </>
    }
    </Card>
  )
}