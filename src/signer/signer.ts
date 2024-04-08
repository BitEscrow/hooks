import { useState }     from 'react'
import { Seed }         from '@cmdcode/signer'
import { initStore }    from './store.js'
import { SignerStore }  from './types.js'

import {
  ClientConfig,
  EscrowSigner
} from '@scrow/sdk/client'

type StoreAPI  = ReturnType<typeof initStore<SignerStore>>

export function initSigner (signer_store : StoreAPI) {
  const { store, update, reset } = signer_store
  const [ signer, setSigner  ]   = useState<EscrowSigner | null>(null)

  const gen_words = Seed.generate.words

  function has_session (
    pubkey : string,
  ) {
    const res = store.sessions.find(e => e[0] === pubkey)
    return Array.isArray(res) && typeof res[1] === 'string'
  }

  function get_session (
    pubkey : string,
  ) {
    const res = store.sessions.find(e => e[0] === pubkey)
    if (!Array.isArray(res) || typeof res[1] !== 'string') {
      throw new Error('session does not exist for pubkey: ' + pubkey)
    }
    return res[1]
  }

  const create_session = async (
    password : string,
    seed     : string,
    xpub    ?: string
  ) => {
    // Create Escrow Signer.
    const config = { ...store.config, xpub }
    const signer = EscrowSigner.create(seed, config)
    // Get signer pubkey.
    const pub = signer.pubkey
    // Check if a session already exists for pubkey.
    if (has_session(pub)) {
      throw new Error('session already exists: ' + pub)
    }
    // Get an encrypted backup of session seed.
    const encrypted = signer.backup(password)
    // Set new signer as current session.
    setSigner(signer)
    // Update session store.
    update({ sessions : [ ...store.sessions, [ pub, encrypted ] ] })
    // Return new signer.
    return signer
  }

  const load_session = async (
    password : string,
    pubkey   : string
  ) => {
    if (!has_session(pubkey)) {
      throw new Error('session does not exist: ' + pubkey)
    }
    // Get session from store.
    const payload = get_session(pubkey)
    // Load signer from encrypted payload.
    const signer = EscrowSigner.restore(password, payload, store.config)
    // Set new signer as current session.
    setSigner(signer)
    // Return new signer.
    return signer
  }

  const rem_session = (pubkey : string) => {
    const sessions = store.sessions.filter(e => e[0] !== pubkey)
    update({ sessions })
    return sessions
  }

  const clear_sessions = () => {
    setSigner(null)
    reset()
  }

  const close_session = () => setSigner(null)

  const update_config = (config : ClientConfig) => {
    if (signer !== null) {
      const xpub = signer.xpub
      const conf = { ...config, xpub }
      const es   = new EscrowSigner(signer._signer, conf)
      setSigner(es)
    }
    update({ config })
  }

  return {
    session : {
      clear   : clear_sessions,
      close   : close_session,
      create  : create_session,
      list    : store.sessions,
      load    : load_session,
      remove  : rem_session
    },
    gen_words,
    signer,
    update_config
  }
}
