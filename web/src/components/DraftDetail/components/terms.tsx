import { DraftData, DraftSession } from '@scrow/core'

import { Box, Button }    from '@mantine/core'
import { useForm }from '@mantine/form'

import PropForm from '@/components/PropForm'
import { validate_proposal, verify_proposal } from '@scrow/core/validate'

interface Props {
  data    : DraftData
  session : DraftSession
}

export default function ({ data, session } : Props) {

  const form = useForm ({
    initialValues: data.proposal
    // validate: {
    //   email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    // },
  })

  const update = () => {
    try {
      const terms = form.values
      console.log('updated terms:', terms)
      validate_proposal(terms)
      verify_proposal(terms)
      session.update_terms(terms)
    } catch (err) {
      const { message } = err as Error
      console.error(message)
    }
  }

  return (
    <Box>
      <PropForm enabled={data.terms} form={form} />
      <Button onClick={update}>Update Draft</Button>
    </Box>
  )
}
