"use client"

import { useEffect, useState } from "react"
import Navbar from "../../../../../../Downloads/blue_cat-main/components/navbar"
import { useRouter } from "next/navigation"

export default function AnalysisPage() {
  const router = useRouter()
  const [companyName, setCompanyName] = useState("자료 넣은 회사")
  const [isConnected, setIsConnected] = useState(true) // Assume connected on this page

  useEffect(() => {
    // Simulate redirect after 5 seconds
    const timer = setTimeout(() => {
      router.push("/dashboard")
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar
        isConnected={isConnected}
        onConnectWallet={() => {}} // No-op since we're already connected
      />

      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-5xl font-bold mb-16">Great, So You Are...</h1>

        <div className="bg-white text-gray-600 rounded-3xl p-12 mb-16 w-full max-w-3xl">
          <p className="text-2xl">
            Brief text about {companyName}
            <br />
            (분석 결과)
          </p>
        </div>

        <h2 className="text-3xl font-bold">Welcome! Your Sniper is ready.</h2>
      </div>
    </main>
  )
}
