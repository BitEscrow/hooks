import { DraftData, DraftSession } from '@scrow/core'

interface Props {
  data    : DraftData
  session : DraftSession
}

export default function ({ data, session } : Props) {
  return (
    <><pre>{JSON.stringify(data.proposal, null, 2)}</pre></>
  )
}
