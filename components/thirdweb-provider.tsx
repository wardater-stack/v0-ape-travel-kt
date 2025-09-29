'use client'

import { ThirdwebProvider } from '@thirdweb-dev/react'
import { ReactNode } from 'react'

interface ThirdWebProviderProps {
  children: ReactNode
}

export function ThirdWebProvider({ children }: ThirdWebProviderProps) {
  // For development/testing, we can use a demo client ID
  const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "demo-client-id"
  const walletConnectProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ""
  
  console.log('ThirdWeb Provider initialized with clientId:', clientId)
  console.log('WalletConnect Project ID:', walletConnectProjectId || 'Not set')
  
  return (
    <ThirdwebProvider
      activeChain="ethereum"
      clientId={clientId}
      walletConnect={{
        // Required for WalletConnect v2 mobile connections
        projectId: walletConnectProjectId || undefined,
        qrModalOptions: {
          themeMode: 'dark',
          mobileWallets: [
            { id: 'metamask', name: 'MetaMask', links: { native: 'metamask://', universal: 'https://metamask.app.link' } },
          ],
        },
      }}
      dAppMeta={{
        name: 'Ape Travel Portal',
        description: 'Web3 travel organizer and concierge on Apechain',
        url: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
        logoUrl: typeof window !== 'undefined' ? `${window.location.origin}/placeholder-logo.png` : 'http://localhost:3000/placeholder-logo.png',
      }}
      supportedChains={[
        {
          chainId: 1,
          rpc: [
            "https://eth-mainnet.g.alchemy.com/v2/demo",
            "https://mainnet.infura.io/v3/demo",
            "https://rpc.ankr.com/eth"
          ],
          nativeCurrency: {
            decimals: 18,
            name: "Ethereum",
            symbol: "ETH",
          },
          shortName: "eth",
          slug: "ethereum",
          testnet: false,
          chain: "ETH",
          name: "Ethereum Mainnet",
        },
        {
          chainId: 11155111,
          rpc: [
            "https://sepolia.infura.io/v3/demo",
            "https://rpc.sepolia.org"
          ],
          nativeCurrency: {
            decimals: 18,
            name: "Ethereum",
            symbol: "ETH",
          },
          shortName: "sepolia",
          slug: "sepolia",
          testnet: true,
          chain: "ETH",
          name: "Sepolia Testnet",
        },
      ]}
    >
      {children}
    </ThirdwebProvider>
  )
}
