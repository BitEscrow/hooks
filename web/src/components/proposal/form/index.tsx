import { useState }          from 'react'
import { useStore }          from '@/hooks/useProposal'
import { useForm }           from '@mantine/form'
import { validate_proposal } from '@scrow/core/validate'
import { ProposalData }      from '@scrow/core'

import {
  Alert,
  Box,
  Button,
  Group,
  Space,
  Text,
  rem
} from '@mantine/core'

import {
  IconInfoCircle,
} from '@tabler/icons-react'

import ProposalTaskList    from './tasks'
import ProposalDetailView  from './details'
import ProposalMemberList  from './members'

export default function ProposalForm() {
  const { store, update }   = useStore()
  const [ toast, setToast ] = useState<string | null>(null)

  const proposal = store.proposal

  const iconStyle = { width: rem(16), height: rem(16) };

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
      <Text>
        Details
      </Text>
      <ProposalDetailView form={ form } />
      <ProposalMemberList form={ form } />
      <ProposalTaskList   form={ form } />

      <Group mt="md">
        <Button onClick={() => submit(form.values)}>Submit</Button>
      </Group>
    </Box>
  )
}
