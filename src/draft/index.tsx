import { DraftSession } from '@scrow/sdk/client'
import { create_store } from '@cmdcode/use-store'
import { DraftStore }   from './class.js'

export {
  DraftStore,
  ProposalStore,
  PolicyStore
} from './class.js'

export function useDraftStore (session : DraftSession) {
  const store = create_store(session)
  return new DraftStore(store)
}
