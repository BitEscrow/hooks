import React    from 'react'
import ReactDOM from 'react-dom/client'
import App      from './App'

import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'

import { MantineProvider } from '@mantine/core'
import { ClientProvider }  from '@scrow/hooks/client'
import { SignerProvider }  from '@/hooks/useSigner'
import { StoreProvider }   from '@/hooks/useProposal'
import { client_config }   from '@/config'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <ClientProvider config={client_config}>
        <SignerProvider>
          <StoreProvider>
            <App />
          </StoreProvider>
        </SignerProvider>
      </ClientProvider>
    </MantineProvider>
  </React.StrictMode>
)
