import { UseFormReturnType } from '@mantine/form'
import { ProposalData }      from '@scrow/core'
import { Box }               from '@mantine/core'

import ProposalPaymentList from '../../../../PropForm/components/payments'
import ProposalPathList from './paths'
import ProposalProgramList from '../../../../PropForm/components/programs'
import ProposalRolesList from './roles'

interface Props {
  form : UseFormReturnType<ProposalData>
}

export default function Roles({ form } : Props) {
  return (
    <Box maw={500}>
        <ProposalRolesList     form={form} />
          <ProposalPaymentList form={form} />
          <ProposalPathList    form={form} />
          <ProposalProgramList form={form} />
    </Box>
     
 )
}
