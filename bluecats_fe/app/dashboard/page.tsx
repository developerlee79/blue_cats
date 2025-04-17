"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import Navbar from "../../../../../../Downloads/blue_cat-main/components/navbar"
import { Card, CardContent } from "../../../../../../Downloads/blue_cat-main/components/ui/card"
import { Badge } from "../../../../../../Downloads/blue_cat-main/components/ui/badge"
import { Input } from "../../../../../../Downloads/blue_cat-main/components/ui/input"
import { Search } from "lucide-react"
import TrendDetailModal from "../../../../../../Downloads/blue_cat-main/components/trend-detail-modal"

const trendItems = [
  {
    id: 1,
    title: "#1 Vitalik's T-shirts at ETH Seoul",
    tags: ["Casual", "Meme", "Shitpost"],
    content:
      '<span style="color:black;">How about</span> <span style="color:blue;">Upload on X with generated image with your Logo tee?</span>',
  },
  {
    id: 2,
    title: "#2. Speedrunning for meme coin",
    tags: ["Curate", "Tech", "Research"],
    content:
      '<span style="color:black;">How about</span> <span style="color:blue;">Try posting your own meme coin pitch with a fake roadmap made by AI?</span>',
  },
  {
    id: 3,
    title: "#3. LARPing as AI Agent",
    tags: ["Curate", "Tech", "Research"],
    content:
      '<span style="color:black;">How about</span> <span style="color:blue;">Post your brand’s ‘AI persona’ generated name, icon, and vibes only?</span>',
  },
]

export default function DashboardPage() {
  const router = useRouter()
  const [selectedTrend, setSelectedTrend] = useState<(typeof trendItems)[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const handleMenuClick = (menu: string) => {
    const normalized = menu.toLowerCase().replace(/\s+/g, "-")
    if (normalized === "about-you") {
      router.push("/chat")
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Navbar
        menuItems={["TrendBoard", "Planning", "Stredgy", "About You"]}
        isConnected={true}
        onConnectWallet={() => {}}
        onMenuClick={handleMenuClick}
      />

      <div className="flex-1 flex flex-col px-8 md:px-12 py-8">
        <div className="mb-12">
          <h1 className="text-5xl font-bold inline-block mr-4">Whip!</h1>
          <span className="text-2xl">Today&apos;s Curating</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {trendItems.map((item) => (
            <Card
              key={item.id}
              className="bg-white text-black rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow min-h-[400px]"
              onClick={() => setSelectedTrend(item)}
            >
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="bg-gray-100 text-black">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div
                  className="text-gray-700"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-auto">
          <h2 className="text-3xl mb-6">Anything Curious?</h2>
          <div className="relative">
            <Input
              className="bg-gray-700 text-white rounded-full pl-12 pr-4 py-6 text-lg w-full max-w-3xl"
              placeholder='Do you know about "base for ..." meme?'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {selectedTrend && <TrendDetailModal trend={selectedTrend} onClose={() => setSelectedTrend(null)} />}
    </main>
  )
}
