import { UseFormReturnType } from '@mantine/form'
import { ProposalData }      from '@scrow/core'

import ProposalTotalView from './totals'

import {
  Box,
  Title
} from '@mantine/core'

interface Props {
  form : UseFormReturnType<ProposalData>
}

export default function ProposalInfoView({ form } : Props) {

  return (
    <Box style={{backgroundColor: '#f2f2f2', padding: '10px', maxWidth: '200px', borderRadius: '10px'}}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Title order={4}>{form.values.title}</Title>
        <Box>
          <ProposalTotalView form={form} />
        </Box>
      </div>
  </Box>
    )
}
