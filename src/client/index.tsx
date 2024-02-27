import { ClientConfig, EscrowClient } from '@scrow/core'

import {
  createContext,
  ReactElement,
  useContext,
  useState
} from 'react'

type Props = {
  children : ReactElement,
  config   : ClientConfig
}

type ClientStore = {
  client        : EscrowClient
  update_config : (config : ClientConfig) => void
}

const context = createContext<ClientStore | null>(null)

export function ClientProvider (
  { children, config } : Props
) : ReactElement {
  const init_client = new EscrowClient(config)

  const [ client, setClient ] = useState(init_client)

  const update_config = (config : ClientConfig) => {
    setClient(new EscrowClient(config))
  }

  return (
    <context.Provider value={{ client, update_config }}>
      {children}
    </context.Provider>
  )
}

export function useClient () : ClientStore {
  const ctx = useContext(context)
  if (ctx === null) {
    throw new Error('Context is null!')
  }
  return ctx
}
