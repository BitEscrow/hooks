import { createStore } from '@cmdcode/use-store'
import { Network }     from '@scrow/core'

export interface ConfigStore {
  network : Network
  relay   : string
}

const defaults : ConfigStore = {
  network : 'mutiny',
  relay   : 'wss://relay.damus.io'
}

const session_key = 'config'

// const middleware = (store : StoreAPI<DemoStore>) => {
//   const say_hello = () => console.log('hello world!')
//   return { ...store, say_hello }
// }

export const {
  StoreProvider : ConfigProvider,
  useStore      : useConfig
} = createStore({ defaults, session_key })
