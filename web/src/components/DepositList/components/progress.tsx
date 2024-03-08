import { DepositData } from '@scrow/core'
import { Progress }    from '@mantine/core'
import { now }         from '@scrow/core/util'

interface Props {
  data : DepositData
}

export default function ({ data } : Props) {

  const progress = (data.expires_at !== null)
    ? get_progress(data.created_at, data.expires_at)
    : 0

  const colors = () => {
    if (progress < 50)    return 'green'
    if (progress < 75)    return 'yellow'
    if (progress < 90)    return 'orange'
    if (progress !== 100) return 'red'
    return 'purple'
  }

  return (
    <Progress.Root size={10} radius={0}>
        <Progress.Section value={progress} color={colors()} />
    </Progress.Root>
  )
}

function get_progress (
  created_at : number,
  expires_at : number
) {
  const current = now()
  if (expires_at <= current) return 100
  const total   = expires_at - created_at
  const elapsed = current - created_at
  const percent = (elapsed / total) * 100
  const value   =100 - percent
  return  Math.floor(Math.max(0, Math.min(100, value)))
}