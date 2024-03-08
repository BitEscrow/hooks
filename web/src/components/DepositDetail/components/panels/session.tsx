import { DepositData } from '@scrow/core'

import { Accordion, TextInput } from '@mantine/core'

interface Props {
  data : DepositData
}

export default function ({ data } : Props) {

  return (
    <Accordion.Item key="session" value="session">
      <Accordion.Control>Session</Accordion.Control>
      <Accordion.Panel>
        <TextInput label="Agent ID"       value={data.agent_id}   readOnly style={{ maxWidth: '500px' }} />
        <TextInput label="Agent Pubkey"   value={data.agent_pk}   readOnly style={{ maxWidth: '500px' }} />
        <TextInput label="Agent PN"       value={data.agent_pn}   readOnly style={{ maxWidth: '500px' }} />
      </Accordion.Panel>
    </Accordion.Item>
  )
}
