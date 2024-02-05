import { UseFormReturnType } from '@mantine/form'
import { ProposalData }      from '@scrow/core'
import { get_path_total }    from '@scrow/core/proposal'

import {
  Group,
  Box,
  Text,
  Paper,
  Progress
} from '@mantine/core'

interface Props {
  form : UseFormReturnType<ProposalData>
}

export default function ProposalTotalView({ form } : Props) {

  const paytotal = form.values.payments.map(e => e[0]).reduce((c, n) => c + n, 0)
  const totals   = get_path_total(form.values.paths)
  const maxval   = Math.max(...totals.map(e => e[1]))

  const elements = totals.map(([ label, total ]) => {
    const pct    = (total / maxval) * 100
    const color  = (pct === 100) ? 'green' : 'yellow'
    return (
      <Paper key={label} bg='blue' withBorder>
        <Box miw={50}>
          <Text pl={10} pr={10} pt={2} pb={2} c='white' ta='center'>{label}</Text>
          <Text bg='white' pl={10} pr={10} pt={2} pb={2} ta='left'>{total}</Text>
          <Progress color={color} radius={0} value={pct}/>
        </Box>
      </Paper>
    )
  })

  return (
    <Box>
      <Group maw={500}>
        {elements}
      </Group>
      <Group>
        <Text>Path Total:</Text>
        <Text>{maxval}</Text>
      </Group>
      <Group>
        <Text>Payments:</Text>
        <Text>{paytotal}</Text>
      </Group>
      <Group>
        <Text>Total Value:</Text>
        <Text>{maxval + paytotal}</Text>
      </Group>
    </Box>
  )
} 
