import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { AuthProvider } from "@/components/AuthProvider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-heading",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Mật Tông — Tượng Phật Thủ Công Mật Tông",
  description:
    "Chuyên tượng Phật Mật Tông thủ công nhập khẩu Nepal, Tây Tạng. Tượng đồng mạ vàng 24K, linh phẩm Phật giáo chính gốc.",
  icons: {
    icon: "https://res.cloudinary.com/zgl5avbd/image/upload/v1783574994/mat-tong/favicon.png",
    apple: "https://res.cloudinary.com/zgl5avbd/image/upload/v1783574994/mat-tong/favicon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className={`h-full antialiased ${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[#030712] text-[#e2e8f0] font-sans">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
