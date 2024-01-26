import { ClientConfig, EscrowClient } from '@scrow/core'

import {
  createContext,
  ReactElement,
  useContext
} from 'react'

type Props = {
  children : ReactElement,
  config   : ClientConfig
}

const context = createContext<EscrowClient | null>(null)

export function ClientProvider (
  { children, config } : Props
) : ReactElement {
  // Returns the Provider that wraps our app and
  // passes down the context object.
  const client = new EscrowClient(config)

  return (
    <context.Provider value={client}>
      {children}
    </context.Provider>
  )
}

export function useClient () : EscrowClient {
  const ctx = useContext(context)
  if (ctx === null) {
    throw new Error('Context is null!')
  }
  return ctx
}
