import { useParams }   from 'react-router-dom'
import { useContract } from '@scrow/hooks/contract'
import { useClient }   from '@scrow/hooks/client'

import {
  TextInput,
  NumberInput,
  Textarea,
  Card,
  Divider,
  Title,
  Loader,
  Center
} from '@mantine/core'

export default function () {
  const displayArrayOrObject = (input: any) => JSON.stringify(input, null, 2)

  const { cid }    = useParams()
  const { client } = useClient()
  const { data, isLoading } = useContract(client, cid || '')

  return (
    <Card>
      <Title order={1} style={{ marginBottom: '20px', maxWidth: '500px' }}>
        Contract Details
      </Title>

      <Divider mb={30} mt={30} />
      { isLoading && <Center><Loader color="blue" /></Center> }
      { data && !isLoading &&
        <>
          {/* Agent */}
          <Title order={2} style={{ marginBottom: '40px', maxWidth: '500px' }}>
            Agent
          </Title>

          <TextInput label="Agent ID" value={data.agent_id} readOnly style={{ maxWidth: '500px' }} />
          <TextInput label="Agent Public Key" value={data.agent_pk} readOnly style={{ maxWidth: '500px' }} />
          <TextInput label="Agent PN" value={data.agent_pn} readOnly style={{ maxWidth: '500px' }} />
          <TextInput label="Moderator" value={data.moderator ?? 'N/A'} readOnly style={{ maxWidth: '500px' }} />

          <Divider mb={30} mt={20} />

          {/* Contract Information */}
          <Title order={2} style={{ marginBottom: '40px', maxWidth: '500px' }}>
            Contract Information
          </Title>

          <TextInput label="Contract ID" value={data.cid} readOnly style={{ maxWidth: '500px' }} />
          <TextInput label="Status" value={data.status} readOnly style={{ maxWidth: '500px' }} />
          <NumberInput label="Published At" value={data.published ?? undefined} readOnly style={{ maxWidth: '500px' }} />
          <NumberInput label="Activated At" value={data.activated ?? undefined} readOnly style={{ maxWidth: '500px' }} />
          <NumberInput label="Deadline" value={data.deadline ?? undefined} readOnly style={{ maxWidth: '500px' }} />
          <NumberInput label="Expires At" value={data.expires_at ?? undefined} readOnly style={{ maxWidth: '500px' }} />
          <NumberInput label="Updated At" value={data.updated_at ?? undefined} readOnly style={{ maxWidth: '500px' }} />

          <Divider mb={30} mt={20} />

          {/* Financial Details */}
          <Title order={2} style={{ marginBottom: '40px', maxWidth: '500px' }}>
            Financial Details
          </Title>

          <NumberInput label="Balance" value={data.balance ?? undefined} readOnly style={{ maxWidth: '500px' }} />
          <NumberInput label="Pending Balance" value={data.pending ?? undefined} readOnly style={{ maxWidth: '500px' }} />
          <NumberInput label="Total Value" value={data.total ?? undefined} readOnly style={{ maxWidth: '500px' }} />
          <NumberInput label="Subtotal Value" value={data.subtotal ?? undefined} readOnly style={{ maxWidth: '500px' }} />
          <NumberInput label="Fee Rate" value={data.feerate ?? undefined} readOnly style={{ maxWidth: '500px' }} />
          <NumberInput label="Estimated Transaction Fee" value={data.est_txfee ?? undefined} readOnly style={{ maxWidth: '500px' }} />
          <NumberInput label="Estimated Transaction Size" value={data.est_txsize ?? undefined} readOnly style={{ maxWidth: '500px' }} />

          <Divider mb={30} mt={20} />

          {/* Spending Data */}
          <Title order={2} style={{ marginBottom: '40px', maxWidth: '500px' }}>
            Spending Data
          </Title>

          <TextInput label="Spent" value={data.spent?.toString() ?? 'N/A'} readOnly style={{ maxWidth: '500px' }} />
          <NumberInput label="Spent At" value={data.spent_at ?? undefined} readOnly style={{ maxWidth: '500px' }} />
          <TextInput label="Spent Transaction ID" value={data.spent_txid ?? 'N/A'} readOnly style={{ maxWidth: '500px' }} />
          <Textarea label="Outputs" value={displayArrayOrObject(data.outputs)} readOnly minRows={3} style={{ maxWidth: '500px' }} />

          <Divider mb={30} mt={20} />

          {/* Proposal Details */}
          <Title order={2} style={{ marginBottom: '40px', maxWidth: '500px' }}>
            Proposal Details
          </Title>

          <TextInput label="Proposal ID" value={data.prop_id} readOnly style={{ maxWidth: '500px' }} />
          <Textarea label="Proposal Terms" value={displayArrayOrObject(data.terms)} readOnly minRows={3} style={{ maxWidth: '500px' }} />

          <Divider mb={30} mt={20} />

          {/* Settlement Information */}
          <Title order={2} style={{ marginBottom: '40px', maxWidth: '500px' }}>
            Settlement Information
          </Title>

          <TextInput label="Settled" value={data.settled?.toString() ?? 'N/A'} readOnly style={{ maxWidth: '500px' }} />
          <NumberInput label="Settled At" value={data.settled_at ?? undefined} readOnly style={{ maxWidth: '500px' }} />

          <Divider mb={30} mt={20} />

          {/* Signature Information */}
          <Title order={2} style={{ marginBottom: '40px', maxWidth: '500px' }}>
            Signature Information
          </Title>

          <Textarea label="Signatures" value={displayArrayOrObject(data.signatures)} readOnly minRows={3} style={{ maxWidth: '500px' }} />

          <Divider mb={30} mt={20} />

          {/* Virtual Machine State */}
          <Title order={2} style={{ marginBottom: '40px', maxWidth: '500px' }}>
            Virtual Machine State
          </Title>

          <Textarea label="VM State" value={displayArrayOrObject(data.vm_state)} readOnly minRows={3} style={{ maxWidth: '500px' }} />

          <Divider mb={30} mt={20} />

          {/* Miscellaneous */}
          <Title order={2} style={{ marginBottom: '40px', maxWidth: '500px' }}>
            Miscellaneous
          </Title>

          <Textarea label="Public Keys" value={displayArrayOrObject(data.pubkeys)} readOnly minRows={7} style={{ maxWidth: '500px' }} />
          <NumberInput label="Largest Spending Output Size" value={data.vout_size ?? undefined} readOnly style={{ maxWidth: '500px' }} />
        </>
      }
    </Card>
  )
}
