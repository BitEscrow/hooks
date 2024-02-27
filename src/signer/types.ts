import { ClientConfig, EscrowSigner } from '@scrow/core'

export interface SignerStore {
  config   : ClientConfig
  sessions : [ string, string ][],
  signer   : EscrowSigner | null
}
