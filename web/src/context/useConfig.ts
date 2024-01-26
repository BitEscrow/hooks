import { createStore } from '@cmdcode/use-store'

export interface ConfigStore {
  config : {
    host_url   : string
    oracle_url : string
  },
  drawers    : {
    navbar : {
      desktop : boolean
      mobile  : boolean
    },
    signer : {
      desktop : boolean
      mobile  : boolean
    }
  }
}

const defaults : ConfigStore = {
  config : {
    host_url   : 'http://localhost:3000',
    oracle_url : 'http://localhost:3300'
  },
  drawers : {
    navbar : { desktop : true, mobile : false },
    signer : { desktop : true, mobile : false }
  }
}

const session_key = 'config_store'

export const { 
  StoreProvider : ConfigProvider, 
  useStore      : useConfig
} = createStore({ defaults, session_key })
