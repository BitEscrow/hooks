import { useParams }   from 'react-router-dom'
import { useClient }   from 'src/client'
import { useDeposit }  from '@scrow/hooks/deposit'
import { useSigner }   from '@/hooks/useSigner'

import {
  TextInput,
  NumberInput,
  Card,
  Divider, Title, Center, Loader, Button
} from '@mantine/core'

export default function () {
  const { dpid }   = useParams()
  const { client } = useClient()
  const { signer } = useSigner()

  const { data, isLoading } = useDeposit(client, dpid || '')

  const can_close = (
    signer !== null      &&
    dpid   !== undefined &&
    data   !== undefined &&
    signer.pubkey === data.deposit_pk &&
    (
      data.status === 'open' ||
      data.status === 'expired'
    )
  )

  const close_acct = (txfee : number = 150) => {
    if (can_close) {
      const req = signer.account.close(data, txfee)
      client.deposit.close(dpid, req)
    }
  }

  return (
    <Card>
      <Title order={1} style={{ marginBottom: '20px', maxWidth: '500px' }}>
        Deposit Details
      </Title>

      <Divider mb={30} mt={30} />

      { isLoading && <Center><Loader color="blue" /></Center> }
      { data && !isLoading &&
        <>
          <Button
            disabled={!can_close}
            onClick={() => close_acct() }
          >
            Close Deposit
          </Button>
          <Title order={2} style={{ marginBottom: '40px', maxWidth: '500px' }}>
            Primary Data
          </Title>
          <TextInput label="Updated At" value={data.updated_at?.toLocaleString() ?? ''} readOnly style={{ maxWidth: '500px' }} />
          <TextInput label="DPID" value={data.dpid} readOnly style={{ maxWidth: '500px' }} />
          <TextInput label="Return Partial Signature" value={data.return_psig ?? ''} readOnly style={{ maxWidth: '500px' }} />
          <Divider mb={30} mt={30} />

          <Title order={2} style={{ marginBottom: '40px', maxWidth: '500px' }}>
            Agent
          </Title>
          <TextInput label="Agent ID" value={data.agent_id} readOnly style={{ maxWidth: '500px' }} />
          <TextInput label="Agent Public Key" value={data.agent_pk} readOnly style={{ maxWidth: '500px' }} />
          <TextInput label="Agent PN" value={data.agent_pn} readOnly style={{ maxWidth: '500px' }} />
          <Divider mb={30} mt={30} />

          <Title order={2} style={{ marginBottom: '40px', maxWidth: '500px' }}>
            Blockchain
          </Title>
          <TextInput label="Block Hash" value={data.block_hash || ''} readOnly style={{ maxWidth: '500px' }} />
          <NumberInput label="Block Height" value={data.block_height ?? undefined} readOnly style={{ maxWidth: '500px' }} />
          <NumberInput label="Block Time" value={data.block_time ?? undefined} readOnly style={{ maxWidth: '500px' }} />
          <Divider mb={30} mt={30} />

          <Title order={2} style={{ marginBottom: '40px', maxWidth: '500px' }}>
            Confirmation
          </Title>
          <TextInput label="Confirmed" value={data.confirmed?.toString() ?? ''} readOnly style={{ maxWidth: '500px' }} />
          <TextInput label="Settled" value={data.settled?.toString() ?? ''} readOnly style={{ maxWidth: '500px' }} />
          <Divider mb={30} mt={30} />

          <Title order={2} style={{ marginBottom: '40px', maxWidth: '500px' }}>
            Transaction
          </Title>
          <TextInput label="Transaction ID" value={data.txid} readOnly style={{ maxWidth: '500px' }} />
          <TextInput label="Script Key" value={data.scriptkey} readOnly style={{ maxWidth: '500px' }} />
          <NumberInput label="Sequence" value={data.sequence} readOnly style={{ maxWidth: '500px' }} />
          <NumberInput label="Value" value={data.value ?? undefined} readOnly style={{ maxWidth: '500px' }} />
          <NumberInput label="Vout" value={data.vout ?? undefined} readOnly style={{ maxWidth: '500px' }} />
          <Divider mb={30} mt={30} />

          <Title order={2} style={{ marginBottom: '40px', maxWidth: '500px' }}>
            Timeframe
          </Title>
          <TextInput label="Created At" value={data.created_at?.toLocaleString() ?? ''} readOnly style={{ maxWidth: '500px' }} />
          <TextInput label="Expires At" value={data.expires_at?.toLocaleString() ?? ''} readOnly style={{ maxWidth: '500px' }} />
          <TextInput label="Settled At" value={data.settled_at?.toLocaleString() ?? ''} readOnly style={{ maxWidth: '500px' }} />
          <Divider mb={30} mt={30} />

          <Title order={2} style={{ marginBottom: '40px', maxWidth: '500px' }}>
            Spending Information
          </Title>
          <TextInput label="Spend XPUB" value={data.spend_xpub} readOnly style={{ maxWidth: '500px' }} />
          <TextInput label="Spent" value={data.spent?.toString() ?? ''} readOnly style={{ maxWidth: '500px' }} />
          <TextInput label="Spent At" value={data.spent_at?.toLocaleString() ?? ''} readOnly style={{ maxWidth: '500px' }} />
          <TextInput label="Spent Transaction ID" value={data.spent_txid ?? ''} readOnly style={{ maxWidth: '500px' }} />
          
          {/* Commented out Status field as it's not included in the provided fields but left as reference if needed */}
          {/* <TextInput label="Status" value={data.status ?? ''} readOnly style={{ maxWidth: '500px' }} /> */}
        </>
      }
    </Card>
  )
}
