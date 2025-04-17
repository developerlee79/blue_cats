"use client"

import { useEffect } from "react"
import Navbar from "../../../../../../Downloads/blue_cat-main/components/navbar"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const companyName = "Blah Blah"

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/dashboard")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <main className="min-h-screen flex flex-col relative overflow-hidden">
      <Navbar isConnected={true} onConnectWallet={() => {}} />

      <div className="absolute inset-0 z-0 opacity-20">
        <Image src="/images/bluecat.png" alt="Background Logo" fill style={{ objectFit: "cover" }} priority />
      </div>

      <div className="flex-1 flex flex-col items-start justify-center px-12 z-10">
        <h1 className="text-5xl font-bold mb-4">Welcome Back,</h1>
        <h2 className="text-5xl font-bold">{companyName} Team!</h2>
      </div>
    </main>
  )
}