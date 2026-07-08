'use client'

import { Share2 } from "lucide-react"

export function ShareButton() {
  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href)
      .then(() => alert("Đã sao chép liên kết!"))
      .catch(() => {})
  }

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#b8860b] transition-colors font-medium px-4 py-2 border border-gray-800 rounded-lg hover:border-[#b8860b]/30"
    >
      <Share2 className="w-4 h-4" />
      Chia sẻ
    </button>
  )
}
