"use client"

import { useState } from "react"
import Navbar from "../../../../../Downloads/blue_cat-main/components/navbar"
import { Button } from "../../../../../Downloads/blue_cat-main/components/ui/button"
import { Upload } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import WalletConnectModal from "../../../../../Downloads/blue_cat-main/components/wallet-connect-modal"

export default function Home() {
  const router = useRouter()
  const [isUploading, setIsUploading] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [companyName, setCompanyName] = useState("Blah Blah")

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)
      setTimeout(() => {
        setIsUploading(false)
        router.push("/analysis")
      }, 2000)
    }
  }

  const handleConnectWallet = () => {
    if (!isConnected) {
      setShowModal(true)
    }
  }

  const handleWalletConnected = () => {
    setIsConnected(true)
    setShowModal(false)
    router.push("/login") // ✅ 연결되면 /login으로 이동 (Welcome 화면)
  }

  return (
    <main className="min-h-screen flex flex-col relative">
      <Navbar isConnected={isConnected} onConnectWallet={handleConnectWallet} />

      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome!</h1>
        <h2 className="text-4xl font-bold mb-16">Can you give information about you?</h2>

        <div className="mb-8">
          <Button
            className="bg-white text-black hover:bg-gray-100 rounded-full px-8 py-6 text-lg flex items-center gap-2"
            disabled={isUploading}
          >
            <label className="cursor-pointer flex items-center gap-2">
              <Upload className="h-5 w-5" />
              {isUploading ? "Uploading..." : "Upload File"}
              <input type="file" className="hidden" onChange={handleFileUpload} />
            </label>
          </Button>
        </div>

        <button
          onClick={() => router.push("/chat")}
          className="text-gray-300 hover:text-white transition-colors mb-24"
        >
          Or you can start chat
        </button>

        <div className="text-gray-400 text-center max-w-md">
          <p>
            We can&apos;t use your data for our service&apos;s train data.
            <br />
            They will be only used for personalized service. <Link href="/privacy" className="text-primary hover:underline">learn more</Link>.
          </p>
        </div>
      </div>

      {showModal && <WalletConnectModal onConnect={handleWalletConnected} onClose={() => setShowModal(false)} />}
    </main>
  )
}
