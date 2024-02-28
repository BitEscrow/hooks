import { DraftData, DraftSession } from '@scrow/core'

import Acks       from './acks'
import Chat       from './chat'
import Members    from './members'
import Roles      from './roles'
import Terms      from './terms'
import Seats      from './seats'
import Signatures from './signatures'
import { Tabs } from '@mantine/core'

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
      <div>
        
        
        
      </div>
      
      <Seats data={ data } session={ session } />
      <Signatures data={ data } session={ session } />
      <Acks data={ data } session={ session } />
      <button>Publish</button>
    </>
  )
}