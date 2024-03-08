import { ContractData } from '@scrow/core'
import { Progress, Tooltip } from '@mantine/core'

interface Props {
  data : ContractData
}

export default function ({ data } : Props) {
  const pending = (data.pending > 0)
    ? Math.max(Math.floor(data.total / data.pending) * 100, 100)
    : 0
  const balance = (data.balance > 0)
    ? Math.max(Math.floor(data.total / data.balance) * 100, 100)
    : 0

  return (
    <Progress.Root size={30}>
      <Tooltip label={`Pending: ${data.pending} sats`}>
        <Progress.Section value={pending} color="orange">
          <Progress.Label>{`Pending: ${data.pending} sats`}</Progress.Label>
        </Progress.Section>
      </Tooltip>

      <Tooltip label={`Secured: ${data.balance} sats`}>
        <Progress.Section value={balance} color="green">
          <Progress.Label>{`Secured: ${data.balance} sats`}</Progress.Label>
        </Progress.Section>
      </Tooltip>
    </Progress.Root>
  )
}
