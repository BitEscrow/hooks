import { create_signer_store } from './signer.js'

import {
  SignerOptions,
  EscrowSigner
} from '@scrow/sdk/client'

export type SignerStoreAPI = ReturnType<typeof create_signer_store>

export interface SignerStore {
  config   : SignerOptions
  sessions : [ string, string ][],
  signer   : EscrowSigner | null
}
