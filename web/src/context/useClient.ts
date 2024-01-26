// // Import the package.
// import { createStore } from '@cmdcode/use-store'

// import {
//   EscrowClient,
//   Signer
// } from '@scrow/core'

// // Setup your own custom Store interface.
// export interface ClientStore {
//   client : EscrowClient | null
//   signer : Signer       | null
//   host   : string       | null
//   oracle : string       | null
// }

// // Setup the default values for your store.
// const defaults : ClientStore = {
//   client : null,
//   signer : null,
//   host   : null,
//   oracle : null
// }

// // Export the provider and store hook for use in your app.
// export const {
//   StoreProvider : ClientProvider,
//   useStore      : useClient
// } = createStore(defaults)
