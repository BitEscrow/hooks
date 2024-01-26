import { createSignerStore }  from '@scrow/hooks/signer'

import { client_config } from '@/config'

export const { SignerProvider, useSigner } = createSignerStore(client_config)
