import { ClientConfig, EscrowSigner } from '@scrow/sdk/client'

export interface SignerStore {
  config   : ClientConfig
  sessions : [ string, string ][],
  signer   : EscrowSigner | null
}
