import { DepositData } from '@scrow/core'

import { Accordion, TextInput } from '@mantine/core'

interface Props {
  data : DepositData
}

export default function ({ data } : Props) {

  const created_at = new Date(data.created_at * 1000).toLocaleString()

  const exp_date = (data.expires_at !== null)
    ? new Date(data.expires_at * 1000).toLocaleString()
    : 'N/A'

  return (
    <Accordion.Item key="details" value="details">
      <Accordion.Control>Details</Accordion.Control>
      <Accordion.Panel>
        <TextInput label="Deposit ID"     value={data.dpid}       readOnly style={{ maxWidth: '500px' }} />
        <TextInput label="Created At"     value={created_at}      readOnly style={{ maxWidth: '500px' }} />
        <TextInput label="Expires At"     value={exp_date}        readOnly style={{ maxWidth: '500px' }} />
        <TextInput label="Deposit Pubkey" value={data.deposit_pk} readOnly style={{ maxWidth: '500px' }} />
        <TextInput label="Spending XPub"  value={data.spend_xpub} readOnly style={{ maxWidth: '500px' }} />
      </Accordion.Panel>
    </Accordion.Item>
  )
}
