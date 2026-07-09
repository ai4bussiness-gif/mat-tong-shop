'use client'

import { useState, useEffect } from "react"
import { MessageCircle, Send, X, ChevronRight } from "lucide-react"

// ═══ CẤU HÌNH ═══
const TELEGRAM_USERNAME = "Mat_Tong_Bot" // Bot hỗ trợ Mật Tông
const PHONE_NUMBER = "0977693109"          // ← sđt liên hệ

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <>
      {/* Nút float */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#b8860b] hover:bg-[#d4a017] text-white rounded-full shadow-xl shadow-black/30 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
        aria-label="Hỗ trợ"
      >
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Panel chat */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-[#0f172a] border border-gray-700 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden animate-in slide-in-from-bottom-4">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#b8860b] to-[#d4a017] p-4">
            <p className="text-white font-semibold text-sm">Mật Tông</p>
            <p className="text-white/80 text-xs mt-0.5">Hỗ trợ khách hàng</p>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3">
            <p className="text-sm text-gray-400 leading-relaxed">
              Chào bạn! Bạn cần hỗ trợ gì về sản phẩm hoặc đơn hàng?
            </p>

            {/* Telegram */}
            <a
              href={`https://t.me/${TELEGRAM_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-[#0088cc]/10 border border-[#0088cc]/20 rounded-xl hover:bg-[#0088cc]/20 transition-colors group"
            >
              <div className="w-9 h-9 bg-[#0088cc] rounded-full flex items-center justify-center flex-shrink-0">
                <Send className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">Telegram</p>
                <p className="text-xs text-gray-500">Phản hồi nhanh nhất</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors" />
            </a>

            {/* Gọi điện */}
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex items-center gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-xl hover:bg-green-500/20 transition-colors group"
            >
              <div className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white">{PHONE_NUMBER}</p>
                <p className="text-xs text-gray-500">Gọi trực tiếp</p>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors" />
            </a>
          </div>

          {/* Footer hint */}
          <div className="px-4 pb-3">
            <p className="text-[11px] text-gray-600 text-center">
              Thứ 2 - CN, 8:00 - 22:00
            </p>
          </div>
        </div>
      )}
    </>
  )
}
