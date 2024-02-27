import { useStore } from '@/hooks/useConfig'

import {
  Box,
  Divider,
  // Button,
  JsonInput,
  Text
} from '@mantine/core'

import { ProposalData } from '@scrow/core';

// import { validate_proposal } from '@scrow/core/validate';
import { useEffect, useState } from 'react';

export default function ProposalJson() {
  const { store, update } = useStore()
  const [ json, setJson ] = useState(serialize(store.proposal))

  // const submit = (e : string) => {
  //   try {
  //     const proposal = JSON.parse(e)
  //     validate_proposal(proposal)
  //     update({ proposal })
  //   } catch {
  //     void ''
  //   }
  // }

  useEffect(() => {
    const json_str = JSON.stringify(store.proposal, null, 2)
    if (json_str !== json) {
      setJson(json_str)
    }
  }, [ json, store.proposal ])

  return (
    <Box maw={700}>
      <Divider mt='30' mb='30' />
      <Text c='dimmed' pb='20px'>This JSON format mirrors the data structure utilized when engaging with the BitEscrow API. It ensures seamless integration for transaction management, enhancing developer convenience and efficiency.</Text>
      {/* <Button
        onClick={() => submit(json) }
      >Submit</Button> */}
      <JsonInput
        placeholder="copy/paste your proposal JSON"
        validationError="Invalid JSON"
        formatOnBlur
        autosize
        minRows={4}
        value={json}
        onChange={(e) => setJson(e)}
      />
    </Box>
  )
}

function serialize (proposal : ProposalData) {
  return JSON.stringify(proposal, null, 2)
}
