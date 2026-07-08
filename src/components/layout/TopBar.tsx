'use client'

import Link from "next/link"
import { Globe, Camera, Video, Music2, Image } from "lucide-react"
import { siteConfig } from "@/lib/constants"

export function TopBar() {
  return (
    <div className="bg-[#0f172a] text-white text-[13px]">
      <div className="container-page flex items-center justify-between h-10">
        <div className="flex items-center gap-4">
          <a href={siteConfig.social.facebook} className="hover:text-[#b8860b] transition-colors" aria-label="Facebook">
            <Globe className="w-4 h-4" />
          </a>
          <a href={siteConfig.social.instagram} className="hover:text-[#b8860b] transition-colors" aria-label="Instagram">
            <Camera className="w-4 h-4" />
          </a>
          <a href={siteConfig.social.youtube} className="hover:text-[#b8860b] transition-colors" aria-label="YouTube">
            <Video className="w-4 h-4" />
          </a>
          <a href={siteConfig.social.tiktok} className="hover:text-[#b8860b] transition-colors" aria-label="TikTok">
            <Music2 className="w-4 h-4" />
          </a>
          <a href={siteConfig.social.pinterest} className="hover:text-[#b8860b] transition-colors" aria-label="Pinterest">
            <Image className="w-4 h-4" />
          </a>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[#b8860b] font-semibold">{siteConfig.freeShipping}</span>
        </div>
      </div>
    </div>
  )
}
