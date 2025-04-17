"use client"

import { WagmiConfig, createConfig } from "wagmi"
import { http } from "viem"
import { mainnet } from "wagmi/chains"
import { injected } from "wagmi/connectors"
import { ReactNode } from "react"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

const wagmiConfig = createConfig({
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
  },
  chains: [mainnet],
  ssr: true,
})

export function WagmiProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiConfig>
  )
}
