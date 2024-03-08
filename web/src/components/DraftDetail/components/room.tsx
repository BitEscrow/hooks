import { EscrowSigner }    from '@scrow/core'
import { useConfig }       from '@/hooks/useConfig'
import { useDraftSession } from '@scrow/hooks/draft'

import {
  Button,
  Center,
  Group,
  Loader,
  Tabs
} from '@mantine/core'

import Acks       from './acks'
import Chat       from './chat'
import Members    from './members'
import Roles      from './roles'
import Terms      from './terms'
import Seats      from './seats'
import Signatures from './signatures'

interface Props {
  secret : string
  signer : EscrowSigner
}

export default function ({ secret, signer } : Props) {

  const { store } = useConfig()

  const { data, session } = useDraftSession(store.relay, secret, signer)



  return (
    <>
      { !data && <Center><Loader color="blue" /></Center> }
      { data !== undefined &&
        <>
          <Terms data={ data } session={ session } />
          <Tabs defaultValue="chat">
            <Tabs.List grow>
              <Tabs.Tab value="chat">Chat</Tabs.Tab>
              <Tabs.Tab value="members">Members</Tabs.Tab>
              <Tabs.Tab value="roles">Roles</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="chat" pt="xs">
              <Chat data={ data } session={ session } />
            </Tabs.Panel>

            <Tabs.Panel value="members" pt="xs">
              <Members data={ data } session={ session } />
            </Tabs.Panel>

            <Tabs.Panel value="roles" pt="xs">
              <Roles data={ data } session={ session } />
            </Tabs.Panel>
          </Tabs>
          
          <Seats data={ data } session={ session } />
          <Signatures data={ data } session={ session } />
          <Acks data={ data } session={ session } />

          <Group>
              <Button
              disabled = {!session.is_confirmed}
              onClick  = {() => session.publish(session._signer.client) }
            >
              Publish
          </Button>
            <Button
              disabled = {!session.is_ready}
              onClick  = {() => session.refresh() }
            >
              Refresh
            </Button>
          </Group>
        </>
      }
    </>
  )
}