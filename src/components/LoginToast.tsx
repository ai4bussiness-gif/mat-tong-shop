"use client"

import { useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react"

const BLESSINGS = [
  "Chúc bạn thân tâm an lạc, vạn sự viên thành dưới ánh từ quang của chư Phật. 🙏",
  "Cầu mong Tam Bảo gia hộ cho bạn và gia đình luôn bình an, hạnh phúc. Nam mô A Di Đà Phật.",
  "Chúc bạn luôn an nhiên tự tại, sớm viên thành tâm nguyện trên con đường giác ngộ.",
  "Nguyện cầu chư Phật Mật Tông gia trì cho bạn thân khoẻ tâm an, trí tuệ khai minh.",
]

let lastBlessing = -1

function pickBlessing(): string {
  let idx: number
  do {
    idx = Math.floor(Math.random() * BLESSINGS.length)
  } while (idx === lastBlessing && BLESSINGS.length > 1)
  lastBlessing = idx
  return BLESSINGS[idx]
}

export function LoginToast() {
  const { data: session, status } = useSession()
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState("")
  const shownRef = useRef(false)

  // Detect login transition
  useEffect(() => {
    if (status === "authenticated" && session && !shownRef.current) {
      shownRef.current = true
      setMessage(`Đăng nhập thành công! ${pickBlessing()}`)
      setShow(true)
    }
  }, [status, session])

  // Auto-dismiss timer
  useEffect(() => {
    if (!show) return
    const timer = setTimeout(() => setShow(false), 5500)
    return () => clearTimeout(timer)
  }, [show])

  if (!show) return null

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[999] w-[90vw] max-w-md animate-slide-down">
      <div className="bg-emerald-900/90 backdrop-blur border border-emerald-700/50 text-emerald-100 rounded-xl px-5 py-3 shadow-2xl text-sm leading-relaxed">
        {message}
      </div>
    </div>
  )
}
