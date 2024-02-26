import { useEffect, useState }     from 'react'
import { DraftItem, DraftSession } from '@scrow/core'
import { useSigner }               from '@/hooks/useSigner'

import {
  Button,
  Title,
  Text,
  Card,
  Divider,
  TextInput
} from '@mantine/core'

import DraftList   from '../DraftList'
import DraftSearch from '../DraftSearch'

export default function DraftView () {

  const store = useSigner()

  const [ relay, setRelay ]       = useState('wss://relay.damus.io')
  const [ session, setSession ]   = useState<DraftSession | null>(null)
  const [ sessions, setSessions ] = useState<DraftItem[]>([])
  const [ init, setInit ]         = useState(false)

  const params = new URLSearchParams(window.location.search)

  const update_draft_list = () => {
    if (session === null) {
      throw new Error('Session is not initialized')
    } else if (relay === '') {
      throw new Error('Relay address is not set')
    }
    session.list(relay).then(res => setSessions(res))
  }

  useEffect(() => {
    if (store.signer !== null) {
      setSession(new DraftSession(store.signer))
    }
  }, [store.signer])

  useEffect(() => {
    if (session !== null && relay !== '' && !init) {
      update_draft_list()
      setInit(true)
    }
  }, [ session, relay, init ])

  return (
    <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      { session === null &&
        <Text c="dimmed" style={{ marginBottom: '20px' }} maw='500px'>
          Login with a signing device to view your drafts.
        </Text>
      }
      { session !== null &&
      <>
        <Title order={2} mb={15}>Connect to a Relay</Title>
        <Text c="dimmed" style={{ marginBottom: '20px' }} maw='500px'>
          Connect to a relay to view your existing drafts.
        </Text>
        <TextInput
          label="Relay Address" 
          description="The relay that you wish to search for drafts."
          onChange={(e) => setRelay(e.currentTarget.value)}
          value={relay}
        />
        <Button
          variant="filled"
          onClick={() => session.list(relay) }
        >
          Refresh
        </Button>
        { relay &&
          <>
            <Divider mb={30} mt={20}/>
            <Title order={2} mb={15}>Existing Drafts</Title>
            <Text c="dimmed" style={{ marginBottom: '20px' }} maw='500px'>
              { sessions.length > 0
                && 'Click on a draft below to view the details.'
                || 'You have no active drafts on this relay.'
              }
            </Text>
            <Divider mb={30} mt={20}/>
            <DraftList sessions={ sessions }/>
            <Divider mb={30} mt={20}/>
            <DraftSearch />
          </>
        }
      </>
    }
    </Card>
  )
}