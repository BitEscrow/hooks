import { ClientConfig } from '@scrow/core'
import { initSigner }   from './signer.js'
import { initStore }    from './store.js'
import { SignerStore }  from './types.js'

import {
  createContext,
  ReactElement,
  useContext
} from 'react'

type Props = {
  config   : ClientConfig
  children : ReactElement
}

type Store = ReturnType<typeof initSigner>

const STORE_NAME = 'signers'

// Setup the default values for your store.
const defaults = {
  sessions : [],
  signer   : null
}

export function createSignerStore () {
  // Create our provider context.
  const context = createContext<Store | null>(null)

  function SignerProvider (
    { config, children } : Props
  ) : ReactElement {
    // Returns the Provider that wraps our app and
    // passes down the context object.
    const conf : SignerStore = { ...defaults, config }
    const store = initStore(conf, STORE_NAME)
    const ctx   = initSigner(store)

    return (
      <context.Provider value={ctx}>
        {children}
      </context.Provider>
    )
  }

  function useSigner () : Store {
    const ctx = useContext(context)
    if (ctx === null) {
      throw new Error('Context is null!')
    }
    return ctx
  }

  return { SignerProvider, useSigner }
}
