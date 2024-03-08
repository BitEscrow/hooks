import { useNavigate } from 'react-router-dom'
import { useClient }   from '@scrow/hooks'
import { useSigner }   from '@/hooks/useSigner'

import {
  assert,
  ContractData
} from '@scrow/core'

import { Accordion, Box, Button, Group, Tabs } from '@mantine/core'

import DetailsPanel    from './panels/details'
import FundsPanel      from './panels/funds'
import SessionPanel    from './panels/session'
import TermsPanel      from './panels/terms'
import TxPanel         from './panels/tx'
import JsonView        from './json'
import FundProgress    from './progress'

interface Props {
  data : ContractData
  view : string
}

export default function ({ data, view } : Props) {

  const navigate = useNavigate()

  const { client } = useClient()
  const { signer } = useSigner()

  const can_cancel = (
    (
      data.status === 'published' ||
      data.status === 'funded'    ||
      data.status === 'secured'
    ) && (
      data.moderator !== null &&
      signer !== null         &&
      signer.pubkey === data.moderator
    )
  )

  const can_deposit = (
    data.status === 'published' && 
    (data.pending + data.balance) < data.total
  )

  const can_submit = (
    data.status === 'active' &&
    data.vm_state !== null
  )

  const cancel = async () => {
    assert.exists(signer)
    const req = signer.request.contract_cancel(data.cid)
    const res = await client.contract.cancel(data.cid, req)
    if (!res.ok) throw new Error(res.error)
  }

  const deposit = () => {
    navigate(`/contracts/${data.cid}/fund`)
  }

  const submit = () => {
    navigate(`/contracts/${data.cid}/vm`)
  }

  return (
    <Box mt={20} maw={700}>
      <FundProgress data={data} />
      <Tabs defaultValue="fields" value={view}>
        <Tabs.Panel value="fields">
          <Accordion defaultValue="details">
            <DetailsPanel data={data} />
            <FundsPanel data={data} />
            <SessionPanel data={data} />
            <TermsPanel data={data} />
            <TxPanel data={data} />
          </Accordion>
        </Tabs.Panel>

        <Tabs.Panel value="json">
          <JsonView data={data} />
        </Tabs.Panel>
      </Tabs>
      <Group mt={10}>
        <Button
          disabled={!can_cancel}
          onClick={cancel}
          style={{ flex : 1 }}
        >
          Cancel
        </Button>
        <Button
          disabled={!can_deposit}
          onClick={deposit}
          style={{ flex : 1 }}
        >
          Deposit
        </Button>
        <Button
          disabled={!can_submit}
          onClick={submit}
          style={{ flex : 1 }}
        >
          Open VM
        </Button>
      </Group>
    </Box>
  )
}

