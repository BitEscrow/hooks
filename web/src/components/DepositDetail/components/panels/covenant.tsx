import { DepositData } from '@scrow/core'

import { Accordion, TextInput } from '@mantine/core'

interface Props {
  data : DepositData
}

export default function ({ data } : Props) {

  const cid = (data.covenant !== null)
    ? data.covenant.cid
    : 'N/A'

  const pnonce = (data.covenant !== null)
    ? data.covenant.pnonce
    : 'N/A'

  // const psigs = (data.covenant !== null)
  //   ? data.covenant.psigs
  //   : 'N/A'

  return (
    <Accordion.Item key="covenant" value="covenant">
      <Accordion.Control>Covenant</Accordion.Control>
      <Accordion.Panel>
        <TextInput label="Contract ID"   value={cid}    readOnly style={{ maxWidth: '500px' }} />
        <TextInput label="Deposit Nonce" value={pnonce} readOnly style={{ maxWidth: '500px' }} />
      </Accordion.Panel>
    </Accordion.Item>
  )
}
