import { ClientOptions, EscrowClient } from '@scrow/sdk/client'

import {
  createContext,
  ReactElement,
  useContext,
  useState
} from 'react'

type Props = {
  children : ReactElement
}

type ClientStore = {
  client : EscrowClient
  update : (config : ClientOptions) => void
}

export function createClientStore (config : ClientOptions) {

  const context = createContext<ClientStore | null>(null)

  function ClientProvider (
    { children } : Props
  ) : ReactElement {
    const init_client = new EscrowClient(config)

    const [ client, setClient ] = useState(init_client)

    const update = (config : ClientOptions) => {
      setClient(new EscrowClient(config))
    }

    return (
      <context.Provider value={{ client, update }}>
        {children}
      </context.Provider>
    )
  }

  function useClient () : ClientStore {
    const ctx = useContext(context)
    if (ctx === null) {
      throw new Error('Context is null!')
    }
    return ctx
  }

  return { ClientProvider, useClient }
}
