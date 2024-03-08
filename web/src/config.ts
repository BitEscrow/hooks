export const default_config = {
  network : 'mutiny',
  relay   : 'wss://nos.lol'
}

export const servers = {
  mutiny : {
    hostname : 'https://bitescrow-mutiny.vercel.app',
    oracle   : 'https://mutinynet.com',
    network  : 'mutiny'
  },
  regtest : {
    hostname : 'http://localhost:3000',
    oracle   : 'http://172.21.0.3:3300',
    network  : 'regtest'
  },
  signet : {
    hostname : 'https://bitescrow-signet.vercel.app',
    oracle   : 'https://mempool.space/signet',
    network  : 'signet',
  },
  testnet : {
    hostname : 'https://bitescrow-testnet.vercel.app',
    oracle   : 'https://mempool.space/testnet',
    network  : 'testnet',
  }
}
