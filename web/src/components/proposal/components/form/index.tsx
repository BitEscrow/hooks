import { useState }          from 'react'
import { useStore }          from '@/context/useStore'
import { useForm }           from '@mantine/form'
import { validate_proposal } from '@scrow/core/validate'
import { ProposalData }      from '@scrow/core'

import {
  Alert,
  Box,
  Button,
  Group,
  Space,
  Tabs,
  Text,
  rem
} from '@mantine/core'

import {
  IconInfoCircle,
  IconRouteAltLeft,
  IconCurrencyBitcoin,
  IconCpu2,
  IconClockCode,
  IconUser
} from '@tabler/icons-react'

import ProposalInfoView    from './components/info'
import ProposalPathList    from './components/paths'
import ProposalPaymentList from './components/payments'
import ProposalProgramList from './components/programs'
import ProposalTaskList    from './components/tasks'
import ProposalDetailView  from './components/details'
import ProposalMemberList  from './components/members'

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
      <Text mt={15} mb={5}>Form introduction goes here.</Text>
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
      <ProposalInfoView form={ form } />
      <Tabs defaultValue="details">
        <Tabs.List mb={15} m={0}>
          <Tabs.Tab value="details" leftSection={<IconInfoCircle style={iconStyle} />}>
            Details
          </Tabs.Tab>
          <Tabs.Tab value="members" leftSection={<IconUser style={iconStyle} />}>
            Members
          </Tabs.Tab>
          <Tabs.Tab value="paths" leftSection={<IconRouteAltLeft style={iconStyle} />}>
            Paths
          </Tabs.Tab>
          <Tabs.Tab value="payments" leftSection={<IconCurrencyBitcoin style={iconStyle} />}>
            Payments
          </Tabs.Tab>
          <Tabs.Tab value="programs" leftSection={<IconCpu2 style={iconStyle} />}>
            Programs
          </Tabs.Tab>
          <Tabs.Tab value="schedule" leftSection={<IconClockCode style={iconStyle} />}>
            Schedule
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="details">
          <ProposalDetailView form={ form } />
        </Tabs.Panel>
        <Tabs.Panel value="members">
          <ProposalMemberList form={ form } />
        </Tabs.Panel>
        <Tabs.Panel value="paths">
          <ProposalPathList form={ form } />
        </Tabs.Panel>
        <Tabs.Panel value="payments">
          <ProposalPaymentList form={ form } />
        </Tabs.Panel>
        <Tabs.Panel value="programs">
          <ProposalProgramList form={ form } />
        </Tabs.Panel>
        <Tabs.Panel value="schedule">
          <ProposalTaskList    form={ form } />
        </Tabs.Panel>
      </Tabs>
      <Group mt="md">
        <Button onClick={() => submit(form.values)}>Save</Button>
        <Button onClick={() => submit(form.values)}>Reset</Button>
      </Group>
    </Box>
  )
}
