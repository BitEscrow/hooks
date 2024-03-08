import { useNavigate } from 'react-router-dom'
import { useClient }   from '@scrow/hooks'
import { useSigner }   from '@/hooks/useSigner'

import {
  assert,
  DepositData
} from '@scrow/core'

import { Accordion, Box, Button, Group, Tabs } from '@mantine/core'

import ConfirmPanel    from './panels/confirm'
import CovenantPanel   from './panels/covenant'
import DepositPanel    from './panels/deposit'
import DetailsPanel    from './panels/details'
import SessionPanel    from './panels/session'
import TxPanel         from './panels/tx'
import JsonView        from './json'

interface Props {
  data : DepositData
  view : string
}

export default function ({ data, view } : Props) {

  const navigate = useNavigate()

  const { client } = useClient()
  const { signer } = useSigner()

  const can_close = data.status === 'open'

  const close = async () => {
    assert.exists(signer)
    const req = signer.account.close(data, 1)
    const res = await client.deposit.close(data.dpid, req)
    if (!res.ok) throw new Error(res.error)
  }

  return (
    <Box mt={20} maw={700}>
      <Tabs defaultValue="fields" value={view}>
        <Tabs.Panel value="fields">
          <Accordion defaultValue="details">
            <DetailsPanel data={data}  />
            <ConfirmPanel data={data}  />
            <CovenantPanel data={data} />
            <DepositPanel data={data}  />
            <SessionPanel data={data}  />
            <TxPanel data={data}       />
          </Accordion>
        </Tabs.Panel>

        <Tabs.Panel value="json">
          <JsonView data={data} />
        </Tabs.Panel>
      </Tabs>
      <Group mt={10}>
        <Button
          disabled={!can_close}
          onClick={close}
          style={{ flex : 1 }}
        >
          Close Deposit
        </Button>
      </Group>
    </Box>
  )
}

