"use client"

import type React from "react"

import { useState } from "react"
import Navbar from "@/components/navbar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import Image from "next/image"

interface Message {
  id: string
  content: string
  sender: "bot" | "user"
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "그래 뭐 원하는 방향 있어? 방향성이 수정되었어? 중요한 마일스톤이 생겼어? 등등...",
      sender: "bot",
    },
  ])
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setHistory((prev) => [...prev, input])
    setInput("")

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "알겠어. 그 방향으로 도와줄게. 더 구체적인 내용이 있으면 알려줘.",
        sender: "bot",
      }

      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar
        menuItems={["TrendBoard", "Planning", "Stredgy", "About You"]}
        isConnected={true}
        onConnectWallet={() => {}} // No-op since we're already connected
      />

      <div className="flex-1 flex">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col p-6">
          <div className="flex-1 overflow-auto mb-6">
            {messages.map((message) => (
              <div key={message.id} className={`mb-6 ${message.sender === "bot" ? "pr-12" : "pl-12"}`}>
                {message.sender === "bot" && (
                  <div className="flex items-start mb-2">
                    <Image src="logo.png" alt="Bot" width={40} height={20} className="mr-3" />
                    <div className="h-full w-0.5 bg-gray-700 mx-3"></div>
                  </div>
                )}
                <p className={`text-lg ${message.sender === "user" ? "text-right" : ""}`}>{message.content}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              className="bg-gray-800 text-white rounded-full py-6"
              placeholder="응 어쩌고 저쩌고 입력"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button type="submit" className="bg-gray-300 text-black hover:bg-gray-200 rounded-full p-3">
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>

        {/* History Panel */}
        <div className="w-64 bg-black p-6 hidden md:block">
          <h3 className="text-xl mb-6">History</h3>

          <div>
            {history.map((item, index) => (
              <div key={index} className="mb-3 text-gray-400 text-sm">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
