import { SignerOptions, EscrowSigner } from '@scrow/sdk/client'

export interface SignerStore {
  config   : SignerOptions
  sessions : [ string, string ][],
  signer   : EscrowSigner | null
}
