'use client'

import { useState, useCallback } from "react"
import { Share2, Check } from "lucide-react"

export function ShareButton() {
  const [copied, setCopied] = useState(false)

  const handleShare = useCallback(async () => {
    const url = window.location.href
    const title = document.title

    // Web Share API — works on mobile (native share sheet)
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
        return
      } catch {
        // user cancelled — do nothing
        return
      }
    }

    // Fallback: copy URL to clipboard
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard not available
    }
  }, [])

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#b8860b] transition-colors font-medium px-4 py-2 border border-gray-800 rounded-lg hover:border-[#b8860b]/30"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-green-400" />
          <span className="text-green-400">Đã copy!</span>
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4" />
          Chia sẻ
        </>
      )}
    </button>
  )
}
