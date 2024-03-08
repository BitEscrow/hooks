import { DepositData } from '@scrow/core'

import { Accordion, TextInput } from '@mantine/core'

interface Props {
  data : DepositData
}

export default function ({ data } : Props) {

  const confirm_at = (data.confirmed)
    ? new Date(data.block_time * 1000).toLocaleString()
    : 'N/A'

  return (
    <Accordion.Item key="confirm" value="confirm">
      <Accordion.Control>Confirmation</Accordion.Control>
      <Accordion.Panel>
        <TextInput   label="Confirmed"      value={data.confirmed.toString()} readOnly style={{ maxWidth: '500px' }} />
        <TextInput   label="Confirmed At"   value={confirm_at} readOnly style={{ maxWidth: '500px' }} />
        <TextInput   label="Block Hash"     value={data.block_hash ?? 'N/A'} readOnly style={{ maxWidth: '500px' }} />
        <TextInput   label="Block Height"   value={data.block_height ?? 'N/A'} readOnly style={{ maxWidth: '500px' }} />
      </Accordion.Panel>
    </Accordion.Item>
  )
}
