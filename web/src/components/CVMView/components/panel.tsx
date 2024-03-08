import { useNavigate } from 'react-router-dom'
import { useClient }   from '@scrow/hooks'
import { useSigner }   from '@/hooks/useSigner'

import {
  assert,
  ContractData
} from '@scrow/core'

import { Accordion, Box, Button, Group, Tabs } from '@mantine/core'

import DetailsPanel    from './panels/details'
import WitnessPanel    from './panels/commits'
import JsonView        from './json'

interface Props {
  data : ContractData
  view : string
}

export default function ({ data, view } : Props) {

  const { client } = useClient()
  const { signer } = useSigner()

  return (
    <Box mt={20} maw={700}>
      <Tabs defaultValue="fields" value={view}>
        <Tabs.Panel value="fields">
          <Accordion defaultValue="details">
            <DetailsPanel data={data} />
            <WitnessPanel data={data} />
          </Accordion>
        </Tabs.Panel>

        <Tabs.Panel value="json">
          <JsonView data={data.vm_state} />
        </Tabs.Panel>
      </Tabs>
    </Box>
  )
}

