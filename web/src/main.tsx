import React    from 'react'
import ReactDOM from 'react-dom/client'
import App      from './App'

import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'

import { MantineProvider } from '@mantine/core'
import { ConfigProvider }  from '@/context/useConfig'
import { SignerProvider }  from '@/context/useSigner'
import { StoreProvider }   from '@/context/useStore'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider>
      <ConfigProvider>
        <SignerProvider>
          <StoreProvider>
            <App />
          </StoreProvider>
        </SignerProvider>
      </ConfigProvider>
    </MantineProvider>
  </React.StrictMode>
)
