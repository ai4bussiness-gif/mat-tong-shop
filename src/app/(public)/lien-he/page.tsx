import Link from "next/link"
import { Mail, Phone, MapPin, Clock, MessageCircle, PlayCircle, Camera } from "lucide-react"
import { ContactForm } from "@/components/ui/ContactForm"
import { siteConfig } from "@/lib/constants"

export const dynamic = "force-dynamic"

export default function ContactPage() {
  return (
    <div className="bg-[#0b1120] min-h-screen">
      <div className="container-page py-8 sm:py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#b8860b] transition-colors">Trang Chủ</Link>
          <span className="text-gray-600">/</span>
          <span className="text-gray-300 font-medium">Liên Hệ</span>
        </nav>

        {/* Page Header */}
        <div className="mb-10">
          <p className="text-[#b8860b] text-xs sm:text-sm uppercase tracking-[0.2em] font-medium mb-1">
            Liên Hệ
          </p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            {siteConfig.name} <span className="text-[#b8860b]">Liên Hệ</span>
          </h1>
          <div className="w-12 h-0.5 bg-[#b8860b] mt-3 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn. Hãy liên hệ với chúng tôi qua các kênh dưới đây hoặc gửi tin nhắn qua form bên cạnh.
            </p>

            <div className="space-y-5">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#b8860b]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#b8860b]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">Email</h3>
                  <a href={`mailto:${siteConfig.email}`} className="text-sm text-gray-400 hover:text-[#b8860b] transition-colors">
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#b8860b]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#b8860b]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">Điện Thoại</h3>
                  <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="text-sm text-gray-400 hover:text-[#b8860b] transition-colors">
                    {siteConfig.phone}
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#b8860b]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[#b8860b]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">Địa Chỉ</h3>
                  <p className="text-sm text-gray-400">
                    {siteConfig.address}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#b8860b]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#b8860b]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-1">Giờ Làm Việc</h3>
                  <p className="text-sm text-gray-400">
                    Thứ 2 - Thứ 7: 8:00 - 18:00<br />
                    Chủ Nhật: 9:00 - 12:00
                  </p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="pt-4 border-t border-gray-800">
              <h3 className="text-sm font-semibold text-white mb-4">Mạng Xã Hội</h3>
              <div className="flex gap-3">
                {siteConfig.social.facebook !== '#' && (
                  <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-[#b8860b]/10 hover:text-[#b8860b] transition-all">
                    <MessageCircle className="w-4 h-4" />
                  </a>
                )}
                {siteConfig.social.youtube !== '#' && (
                  <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-[#b8860b]/10 hover:text-[#b8860b] transition-all">
                    <PlayCircle className="w-4 h-4" />
                  </a>
                )}
                {siteConfig.social.instagram !== '#' && (
                  <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-[#b8860b]/10 hover:text-[#b8860b] transition-all">
                    <Camera className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="rounded-xl border border-gray-800 bg-[#0f172a] p-6 sm:p-8">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-6">
                Gửi Tin Nhắn
              </h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
