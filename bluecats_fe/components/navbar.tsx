"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"

interface NavbarProps {
  menuItems?: string[]
  isConnected: boolean
  onConnectWallet: () => void
  onMenuClick?: (menu: string) => void // ✅ 추가
}

export default function Navbar({
  menuItems = ["Product", "About us", "Blog"],
  isConnected,
  onConnectWallet,
  onMenuClick, // ✅ 추가
}: NavbarProps) {
  return (
    <nav className="flex items-center justify-between py-6 px-8 md:px-12">
      <div className="flex items-center">
        <Link href="/">
          <Image src="logo.png" alt="Logo" width={80} height={40} className="h-10 w-auto" />
        </Link>
      </div>

      <div className="hidden md:flex items-center space-x-12">
        {menuItems.map((item) => (
          <button
            key={item}
            onClick={() => onMenuClick?.(item)} // ✅ 클릭 시 부모로 전달
            className="text-white hover:text-primary transition-colors"
          >
            {item}
          </button>
        ))}
      </div>

      <Button
        className={`${isConnected ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-white text-black hover:bg-gray-200"} rounded-full px-8 py-2 flex items-center gap-2`}
        onClick={onConnectWallet}
      >
        <Wallet className="h-4 w-4" />
        {isConnected ? "Connected" : "Connect Wallet"}
      </Button>
    </nav>
  )
}
