import { DepositData } from '@scrow/core'

import { Accordion, NumberInput, TextInput } from '@mantine/core'

interface Props {
  data : DepositData
}

export default function ({ data } : Props) {

  return (
    <Accordion.Item key="deposit" value="deposit">
      <Accordion.Control>Deposit</Accordion.Control>
      <Accordion.Panel>
        <TextInput   label="Transaction ID" value={data.txid}      readOnly style={{ maxWidth: '500px' }} />
        <NumberInput label="Output Index"   value={data.vout}      readOnly style={{ maxWidth: '500px' }} />
        <NumberInput label="Value"          value={data.value}     readOnly style={{ maxWidth: '500px' }} />
        <TextInput   label="ScriptKey"      value={data.scriptkey} readOnly style={{ maxWidth: '500px' }} />
      </Accordion.Panel>
    </Accordion.Item>
  )
}
