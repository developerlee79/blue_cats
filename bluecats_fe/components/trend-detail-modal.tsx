"use client"

import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface TrendDetailModalProps {
  trend: {
    id: number
    title: string
    tags: string[]
    content: string
  }
  onClose: () => void
}

export default function TrendDetailModal({ trend, onClose }: TrendDetailModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white text-black rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold underline">{trend.title} is now Trending</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Tags */}
        <div className="px-6 pt-4">
          <div className="flex flex-wrap gap-2 mb-4">
            {trend.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-gray-100 text-black">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Trend Analysis */}
        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">When?</h3>
              <p className="text-sm">from April 16th 2025<br />there were some posts<br />talking about the theme</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">About what?</h3>
              <p className="text-sm">Vitalik Vuterin, founder of Ethereum<br />wore a t-shirt with Ok Jimin's face.<br />And it became viral in web3.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Why?</h3>
              <p className="text-sm">"Super Cool",<br />"Awesome" were mentioned continuously</p>
            </div>
          </div>

          {/* Suggestions */}
          <h3 className="text-lg font-semibold mb-4">Marketing Suggestion</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-3 rounded-lg">
              Logo Tee Post on X
            </button>
            <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-3 rounded-lg">
              Make T-shirts Goods for 25th meet-up
            </button>
            <button className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-3 rounded-lg">
              Suggest Other Ideas
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
