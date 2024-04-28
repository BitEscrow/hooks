import { SignerOptions } from '@scrow/sdk/client'

import { create_signer_store } from './signer.js'
import { SignerStoreAPI }      from './types.js'

import {
  createContext,
  ReactElement,
  useContext
} from 'react'

type Props = {
  children : ReactElement
}

export function createSignerStore (config : SignerOptions) {
  // Create our provider context.
  const context = createContext<SignerStoreAPI | null>(null)

  function SignerProvider (
    { children } : Props
  ) : ReactElement {
    // Returns the Provider that wraps our app and
    // passes down the context object.
    const ctx = create_signer_store({
      config,
      sessions : [],
      signer   : null
    }, 'signers')

    return (
      <context.Provider value={ctx}>
        {children}
      </context.Provider>
    )
  }

  function useSigner () : SignerStoreAPI {
    const ctx = useContext(context)
    if (ctx === null) {
      throw new Error('Context is null!')
    }
    return ctx
  }

  return { SignerProvider, useSigner }
}
