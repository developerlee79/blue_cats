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
      <div className="bg-white text-black rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">{trend.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-wrap gap-2 mb-6">
            {trend.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-gray-100">
                {tag}
              </Badge>
            ))}
          </div>

          <p className="text-gray-700 mb-6">{trend.content}</p>

          <div className="bg-gray-100 p-6 rounded-lg">
            <p className="text-gray-500 text-center">Detailed content will be loaded here from API/DB</p>
          </div>
        </div>
      </div>
    </div>
  )
}
