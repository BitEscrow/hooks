import { client_config } from '@/config'
import { createStore }  from '@cmdcode/use-store'
import { ProposalData, create_proposal } from '@scrow/core'

export interface ProposalStore {
  proposal : ProposalData
}

const defaults : ProposalStore = {
  proposal : create_proposal({
    title    : 'Test proposal',
    duration : 60 * 60 * 2,
    network  : client_config.network,
    value    : 20_000
  })
}

const session_key = 'draft_proposal'

// const middleware = (store : StoreAPI<DemoStore>) => {
//   const say_hello = () => console.log('hello world!')
//   return { ...store, say_hello }
// }

export const { StoreProvider, useStore } = createStore({ defaults, session_key })
