import { ContractData } from '@scrow/core'

import { Accordion, TextInput } from '@mantine/core'

interface Props {
  data : ContractData
}

export default function ({ data } : Props) {

  return (
    <Accordion.Item key="details" value="details">
      <Accordion.Control>Details</Accordion.Control>
      <Accordion.Panel>
        <TextInput label="Agent ID" value={data.agent_id} readOnly style={{ maxWidth: '500px' }} />
        <TextInput label="Agent Public Key" value={data.agent_pk} readOnly style={{ maxWidth: '500px' }} />
        <TextInput label="Agent PN" value={data.agent_pn} readOnly style={{ maxWidth: '500px' }} />
        <TextInput label="Moderator" value={data.moderator ?? 'N/A'} readOnly style={{ maxWidth: '500px' }} />
      </Accordion.Panel>
    </Accordion.Item>
  )
}
