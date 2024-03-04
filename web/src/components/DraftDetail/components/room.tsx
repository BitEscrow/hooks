import {
  DraftData,
  DraftSession
} from '@scrow/core'

import {
  Button,
  Group,
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
  data    : DraftData
  session : DraftSession
}

export default function ({ data, session } : Props) {

  return (
    <>
      <Tabs defaultValue="details">
        <Tabs.List grow>
          <Tabs.Tab value="chat">Chat</Tabs.Tab>
          <Tabs.Tab value="members">Members</Tabs.Tab>
          <Tabs.Tab value="roles">Roles</Tabs.Tab>
          <Tabs.Tab value="terms">Terms</Tabs.Tab>
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
        <Tabs.Panel value="terms" pt="xs">
          <Terms data={ data } session={ session } />
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
          onClick  = {() => session.fetch() }
        >
          Refresh
        </Button>
      </Group>
      
    </>
  )
}