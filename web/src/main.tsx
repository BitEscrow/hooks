import React    from 'react'
import ReactDOM from 'react-dom/client'
import App      from './App'

import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'

import { BrowserRouter }   from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import { ClientProvider }  from '@scrow/hooks/client'
import { SessionProvider } from '@scrow/hooks/draft'
import { SignerProvider }  from '@/hooks/useSigner'
import { ConfigProvider }  from '@/hooks/useConfig'
import { servers }         from './config'

const default_config = servers['mutiny']

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider>
        <ConfigProvider>
          <ClientProvider config={default_config}>
            <SignerProvider config={default_config}>
              <SessionProvider>
                <App />
              </SessionProvider>
            </SignerProvider>
          </ClientProvider>
        </ConfigProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
)
