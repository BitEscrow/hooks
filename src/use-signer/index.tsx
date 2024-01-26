import React         from 'react'
import { Buff }      from '@cmdcode/buff'
import { initStore } from './store.js'

import {
  createContext,
  ReactElement,
  useContext
} from 'react'

import { initSigner }  from './signer.js'
import { SignerStore } from './types.js'

type Props = { children : ReactElement }
type Store = ReturnType<typeof initSigner>

const STORE_NAME = process.env.STORE_NAME ?? 'signers'

// Setup the default values for your store.
const defaults : SignerStore = {
  sessions : [],
  signer   : null,
  store_id : Buff.random(32).hex,
}

export function createSigner () {
  // Create our provider context.
  const context = createContext<Store | null>(null)

  function SignerProvider (
    { children } : Props
  ) : ReactElement {
    // Returns the Provider that wraps our app and
    // passes down the context object.
    const store = initStore(defaults, STORE_NAME)
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
