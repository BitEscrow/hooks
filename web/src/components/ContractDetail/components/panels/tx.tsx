import { ContractData } from '@scrow/core'

import { Accordion, NumberInput, TextInput } from '@mantine/core'

interface Props {
  data : ContractData
}

export default function ({ data } : Props) {

  return (
    <Accordion.Item key="tx" value="tx">
      <Accordion.Control>Transaction</Accordion.Control>
      <Accordion.Panel>
        <NumberInput label="Output Size" value={data.vout_size ?? undefined} readOnly style={{ maxWidth: '500px' }} />
        <NumberInput label="Transaction Size" value={data.est_txsize ?? undefined} readOnly style={{ maxWidth: '500px' }} />
        <TextInput label="Settled" value={data.settled?.toString() ?? 'N/A'} readOnly style={{ maxWidth: '500px' }} />
        <NumberInput label="Settled At" value={data.settled_at ?? undefined} readOnly style={{ maxWidth: '500px' }} />
        <TextInput label="Spent" value={data.spent?.toString() ?? 'N/A'} readOnly style={{ maxWidth: '500px' }} />
        <NumberInput label="Spent At" value={data.spent_at ?? undefined} readOnly style={{ maxWidth: '500px' }} />
        <TextInput label="Spent TXID" value={data.spent_txid ?? 'N/A'} readOnly style={{ maxWidth: '500px' }} />
      </Accordion.Panel>
    </Accordion.Item>
  )
}
