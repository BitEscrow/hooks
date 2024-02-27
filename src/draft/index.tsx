import {
  createContext,
  useContext,
  ReactElement,
  useState
} from 'react'

import useSWR from 'swr'

import { DraftItem, DraftSession, EscrowSigner } from '@scrow/core'

export function useDraftList (
  relay  : string,
  signer : EscrowSigner
) {
  const client = signer.client
  const pub    = signer.pubkey
  const url    = `${client.host}/drafts/list?pk=${pub}`

  const fetcher = async () => {
    const session = new DraftSession(signer)
    const data    = await session.list(relay)
    return data
  }

  const res  = useSWR<DraftItem[]>(url, fetcher)
  const data = res.data ?? []

  return { ...res, data }
}

interface SessionStore {
  session        : DraftSession | null
  update_session : (signer : EscrowSigner) => void
}

interface Props {
  children : ReactElement
}

const context = createContext<SessionStore | null>(null)

export function SessionProvider (
  { children } : Props
) : ReactElement {
  // Returns the Provider that wraps our app and
  // passes down the context object.
  const [ session, setSession ] = useState<DraftSession | null>(null)

  const update_session = (signer : EscrowSigner) => {
    const new_session = new DraftSession(signer, {
      socket_config : { verbose : true },
      verbose : true
    })
    setSession(new_session)
  }

  const ctx = { session, update_session }

  return (
    <context.Provider value={ctx}>
      {children}
    </context.Provider>
  )
}

export function useDraftSession () : SessionStore {
  const ctx = useContext(context)
  if (ctx === null) {
    throw new Error('Context is null!')
  }
  return ctx
}