import { UseFormReturnType } from '@mantine/form'
import { ProposalData }      from '@scrow/core'

import {
  Box,
  Text,
  NativeSelect,
} from '@mantine/core'

interface Props {
  form : UseFormReturnType<ProposalData>
}

export default function ProposalRolesList({ form } : Props) {

  return (
    <Box maw={500}>
      <Text pt={'10px'} color='dimmed'>Assign roles to members</Text>
      <NativeSelect
        data={['Buyer', 'Seller', 'Agent']}
        label="Role for Member 1"
        // placeholder="Select role"
        {...form.getInputProps('member1Role')}
      />
      <NativeSelect
        data={['Buyer', 'Seller', 'Agent']}
        label="Role for Member 2"
        // placeholder="Select role"
        {...form.getInputProps('member2Role')}
      />
      <NativeSelect
        data={['Buyer', 'Seller', 'Agent']}
        label="Role for Member 3"
        // placeholder="Select role"
        {...form.getInputProps('member3Role')}
      />
    </Box>
  )
}
