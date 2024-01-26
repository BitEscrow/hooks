import { EscrowSigner } from '@scrow/core'

export interface SignerStore {
  sessions : [ string, string ][],
  signer   : EscrowSigner | null,
  store_id : string
}
