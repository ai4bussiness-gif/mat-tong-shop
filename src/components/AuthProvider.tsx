"use client"

import { SessionProvider } from "next-auth/react"
import { LoginToast } from "./LoginToast"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <LoginToast />
    </SessionProvider>
  )
}
