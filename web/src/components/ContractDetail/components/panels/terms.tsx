import { ContractData } from '@scrow/core'

import { Accordion, TextInput } from '@mantine/core'

interface Props {
  data : ContractData
}

export default function ({ data } : Props) {

  return (
    <Accordion.Item key="terms" value="terms">
      <Accordion.Control>Terms</Accordion.Control>
      <Accordion.Panel>
        <TextInput label="Proposal ID" value={data.prop_id} readOnly style={{ maxWidth: '500px' }} />
      </Accordion.Panel>
    </Accordion.Item>
  )
}
