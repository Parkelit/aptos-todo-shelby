import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react'
import { ShelbyClientProvider } from '@shelby-protocol/react'
import { ShelbyClient } from '@shelby-protocol/sdk/browser'
import { Network } from '@aptos-labs/ts-sdk'
import App from './App'
import './index.css'

const queryClient = new QueryClient()

const shelbyClient = new ShelbyClient({
  apiKey: import.meta.env.VITE_SHELBY_API_KEY || '',
  network: Network.SHELBYNET,
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AptosWalletAdapterProvider autoConnect={true}>
        <ShelbyClientProvider client={shelbyClient}>
          <App />
        </ShelbyClientProvider>
      </AptosWalletAdapterProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
