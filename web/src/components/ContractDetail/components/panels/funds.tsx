import { ContractData } from '@scrow/core'

import { Accordion, NumberInput } from '@mantine/core'

interface Props {
  data : ContractData
}

export default function ({ data } : Props) {

  return (
    <Accordion.Item key="funds" value="funds">
      <Accordion.Control>Funds</Accordion.Control>
      <Accordion.Panel>
        <NumberInput label="Balance" value={data.balance ?? undefined} readOnly style={{ maxWidth: '500px' }} />
        <NumberInput label="Pending Balance" value={data.pending ?? undefined} readOnly style={{ maxWidth: '500px' }} />
        <NumberInput label="Total Value" value={data.total ?? undefined} readOnly style={{ maxWidth: '500px' }} />
        <NumberInput label="Subtotal Value" value={data.subtotal ?? undefined} readOnly style={{ maxWidth: '500px' }} />
        <NumberInput label="Fee Rate" value={data.feerate ?? undefined} readOnly style={{ maxWidth: '500px' }} />
        <NumberInput label="Transaction Fee" value={data.est_txfee ?? undefined} readOnly style={{ maxWidth: '500px' }} />
      </Accordion.Panel>
    </Accordion.Item>
  )
}
