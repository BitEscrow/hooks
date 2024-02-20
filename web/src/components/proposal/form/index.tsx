import { useState }          from 'react'
import { useStore }          from '@/hooks/useProposal'
import { useForm }           from '@mantine/form'
import { validate_proposal } from '@scrow/core/validate'
import { ProposalData }      from '@scrow/core'

import {
  Alert,
  Box,
  Button,
  Divider,
  Group,
  Space,
  Text,
} from '@mantine/core'

import {
  IconInfoCircle,
} from '@tabler/icons-react'

import ProposalDetailView  from './details'
import ProposalPaymentList from './roles/payments'
import ProposalTaskList    from './tasks'
import Roles               from './roles'

export default function ProposalForm() {
  const { store, update }   = useStore()
  const [ toast, setToast ] = useState<string | null>(null)

  const proposal = store.proposal


  const form = useForm ({
    initialValues: proposal,
    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    // },
  })

  const submit = (proposal : ProposalData) => {
    try {
      validate_proposal(proposal)
      update({ proposal })
    } catch (err) {
      const { message } = err as Error
      setToast(message)
    }
  }

  return (
    <Box maw={700}>
      { toast
        &&
          <Alert
            withCloseButton
            variant = "light"
            color   = "orange"
            title   = "Error"
            radius  = "md"
            icon    = { <IconInfoCircle /> }
            onClose = { () => setToast(null) }
          >
            {toast}
          </Alert>
        || <Space />
      }
      <Divider mt='30' mb='30' />
      
      <Text fw={700} size='xl'>Details</Text>
      <ProposalDetailView form={form} />
      <Divider mt='30' mb='30' />
      
      <Text fw={700} size='xl'>Roles</Text>
      <Roles form={form} />
      <Divider mt='30' mb='30' />
      
      <Text fw={700} size='xl'>Scheduled Tasks</Text>
      <ProposalTaskList form={form} />
      <Divider mt='30' mb='30' />

      {/* <Text fw={700} size='xl'>Payments</Text>
      <ProposalPaymentList form={form} />
      <Divider mt='30' mb='30' /> */}

      <Group mt="40px">
        <Button
          w='200px'
          bg='#0068FD'
          radius={15}
          onClick={() => submit(form.values)}
        >
          Submit
        </Button>
      </Group>
    </Box>
  )
}
