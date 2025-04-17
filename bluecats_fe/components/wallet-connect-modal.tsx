"use client"

import { useState } from "react"
import { useConnect } from "wagmi"
import { injected } from "wagmi/connectors"
import { X } from "lucide-react"
import Image from "next/image"

interface WalletConnectModalProps {
  onConnect: () => void
  onClose: () => void
}

const wallets = [
  {
    id: "metamask",
    name: "MetaMask",
    icon: "/placeholder.svg",
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    icon: "/placeholder.svg",
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    icon: "/placeholder.svg",
  },
  {
    id: "phantom",
    name: "Phantom",
    icon: "/placeholder.svg",
  },
]

export default function WalletConnectModal({ onConnect, onClose }: WalletConnectModalProps) {
  const [connecting, setConnecting] = useState(false)
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)

  const { connect } = useConnect()

  const handleWalletSelect = async (walletId: string) => {
    setSelectedWallet(walletId)
    setConnecting(true)
  
    try {
      if (walletId === "metamask") {
        const result = await connect({ connector: injected() })
        console.log("✅ 연결 성공:", result)
        onConnect()
      } else {
        alert(`${walletId} 연결은 아직 구현되지 않았습니다.`)
      }
    } catch (err) {
      console.error("❌ 지갑 연결 실패:", err)
      alert("지갑 연결에 실패했습니다. 혹시 메타마스크가 설치되어 있나요?")
    } finally {
      setConnecting(false)
    }
  }
  

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#1a1528] text-white rounded-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Connect Wallet</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {connecting ? (
          <div className="text-center py-8">
            <div className="animate-pulse mb-4">
              Connecting to {wallets.find((w) => w.id === selectedWallet)?.name}...
            </div>
            <div className="w-8 h-8 border-t-2 border-primary rounded-full animate-spin mx-auto"></div>
          </div>
        ) : (
          <div className="space-y-3">
            {wallets.map((wallet) => (
              <button
                key={wallet.id}
                className="w-full bg-[#2a2139] hover:bg-[#352a4a] transition-colors rounded-lg p-4 flex items-center"
                onClick={() => handleWalletSelect(wallet.id)}
              >
                <Image src={wallet.icon} alt={wallet.name} width={40} height={40} className="mr-4" />
                <span>{wallet.name}</span>
              </button>
            ))}
          </div>
        )}

        <div className="mt-6 text-xs text-gray-400 text-center">
          By connecting your wallet, you agree to our Terms of Service and Privacy Policy
        </div>
      </div>
    </div>
  )
}
