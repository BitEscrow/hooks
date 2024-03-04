import React            from 'react';
import { ContractData } from '@/types/contractData';
import {
  TextInput,
  NumberInput,
  Textarea,
  Card,
  Divider,
  Title
} from '@mantine/core';

interface Props {
  data: ContractData;
}

const ContractDetail: React.FC<Props> = ({ data }) => {
  // Simplified display function for arrays or objects
  const displayArrayOrObject = (input: any) => JSON.stringify(input, null, 2);

  return (
    <Card>
      <Title order={1} style={{ marginBottom: '20px', maxWidth: '500px' }}>
        Contract Details
      </Title>

      <Divider mb={30} mt={30} />

      <Title order={2} style={{ marginBottom: '40px', maxWidth: '500px' }}>
        Agent
      </Title>

      <TextInput label="Agent ID" value={data.agent_id} readOnly />
      <TextInput label="Agent Public Key" value={data.agent_pk} readOnly />
      <TextInput label="Agent PN" value={data.agent_pn} readOnly />
      <TextInput label="Moderator" value={data.moderator ?? 'N/A'} readOnly />

      <Divider mb={30} mt={20} />

      <Title order={2} style={{ marginBottom: '40px', maxWidth: '500px' }}>
        Contract Information
      </Title>

      <TextInput label="Contract ID" value={data.cid} readOnly />
      <TextInput label="Status" value={data.status} readOnly />
      <NumberInput label="Published At" value={data.published ?? undefined} readOnly />
      <NumberInput label="Activated At" value={data.activated ?? undefined} readOnly />
      <NumberInput label="Deadline" value={data.deadline ?? undefined} readOnly />
      <NumberInput label="Expires At" value={data.expires_at ?? undefined} readOnly />
      <NumberInput label="Updated At" value={data.updated_at ?? undefined} readOnly />

      <Divider mb={30} mt={20} />

      <Title order={2} style={{ marginBottom: '40px', maxWidth: '500px' }}>
        Financial Details
      </Title>

      <NumberInput label="Balance" value={data.balance ?? undefined} readOnly />
      <NumberInput label="Pending Balance" value={data.pending ?? undefined} readOnly />
      <NumberInput label="Total Value" value={data.total ?? undefined} readOnly />
      <NumberInput label="Subtotal Value" value={data.subtotal ?? undefined} readOnly />
      <NumberInput label="Fee Rate" value={data.feerate ?? undefined} readOnly />
      <NumberInput label="Estimated Transaction Fee" value={data.est_txfee ?? undefined} readOnly />
      <NumberInput label="Estimated Transaction Size" value={data.est_txsize ?? undefined} readOnly />

      <Divider mb={30} mt={20} />

      <Title order={2} style={{ marginBottom: '40px', maxWidth: '500px' }}>
        Spending Data
      </Title>

      <TextInput label="Spent" value={data.spent?.toString() ?? 'N/A'} readOnly />
      <NumberInput label="Spent At" value={data.spent_at ?? undefined} readOnly />
      <TextInput label="Spent Transaction ID" value={data.spent_txid ?? 'N/A'} readOnly />
      <Textarea label="Outputs" value={displayArrayOrObject(data.outputs)} readOnly minRows={3} />

      <Divider mb={30} mt={20} />

      <Title order={2} style={{ marginBottom: '40px', maxWidth: '500px' }}>
        Proposal Details
      </Title>

      <TextInput label="Proposal ID" value={data.prop_id} readOnly />
      <Textarea label="Proposal Terms" value={displayArrayOrObject(data.terms)} readOnly minRows={3} />

      <Divider mb={30} mt={20} />

      <Title order={2} style={{ marginBottom: '40px', maxWidth: '500px' }}>
        Settlement Information
      </Title>

      <TextInput label="Settled" value={data.settled?.toString() ?? 'N/A'} readOnly />
      <NumberInput label="Settled At" value={data.settled_at ?? undefined} readOnly />

      <Divider mb={30} mt={20} />

      <Title order={2} style={{ marginBottom: '40px', maxWidth: '500px' }}>
        Signature Information
      </Title>

      <Textarea label="Signatures" value={displayArrayOrObject(data.signatures)} readOnly minRows={3} />

      <Divider mb={30} mt={20} />

      <Title order={2} style={{ marginBottom: '40px', maxWidth: '500px' }}>
        Virtual Machine State
      </Title>

      <Textarea label="VM State" value={displayArrayOrObject(data.vm_state)} readOnly minRows={3} />

      <Divider mb={30} mt={20} />

      <Title order={2} style={{ marginBottom: '40px', maxWidth: '500px' }}>
        Miscellaneous
      </Title>

      <Textarea label="Public Keys" value={displayArrayOrObject(data.pubkeys)} readOnly minRows={3} />
      <NumberInput label="Largest Spending Output Size" value={data.vout_size ?? undefined} readOnly />
    </Card>
  );
};

export default ContractDetail;