"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface WalletContextType {
  isConnected: boolean
  connect: () => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)

  // Check if wallet was previously connected
  useEffect(() => {
    const connected = localStorage.getItem("walletConnected") === "true"
    setIsConnected(connected)
  }, [])

  const connect = async () => {
    // Simulate wallet connection
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setIsConnected(true)
        localStorage.setItem("walletConnected", "true")
        resolve()
      }, 1000)
    })
  }

  const disconnect = () => {
    setIsConnected(false)
    localStorage.removeItem("walletConnected")
  }

  return <WalletContext.Provider value={{ isConnected, connect, disconnect }}>{children}</WalletContext.Provider>
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
