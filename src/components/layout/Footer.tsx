import Link from "next/link"
import { siteConfig } from "@/lib/constants"
import { categories } from "@/lib/constants"
import { Globe, Camera, Video, Music2, Mail, Phone, ShieldCheck, Truck, HeadphonesIcon, CreditCard } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#0b1120] text-gray-400 border-t border-gray-800">
      {/* Features bar — inspired by nidhiratna.com */}
      <div className="border-b border-gray-800">
        <div className="container-page py-6 sm:py-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: ShieldCheck, label: "Thanh Toán An Toàn", desc: "100% bảo mật" },
              { icon: Truck, label: "Vận Chuyển Nhanh", desc: "Giao hàng tận nơi" },
              { icon: HeadphonesIcon, label: "Hỗ Trợ 24/7", desc: "Tư vấn nhiệt tình" },
              { icon: CreditCard, label: "Thanh Toán Linh Hoạt", desc: "CK, VNPay" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#b8860b]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-[#b8860b]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-page py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
        {/* Brand */}
        <div>
          <Link href="/" className="inline-block">
            <div className="logo-shimmer logo-glow">
              <img
                src="https://res.cloudinary.com/zgl5avbd/image/upload/v1783574851/mat-tong/logo.png"
                alt="Mật Tông"
                className="logo-gold"
                style={{ height: '42px', maxWidth: 'none' }}
              />
            </div>
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed mb-6 mt-4">
            Chuyên tượng Phật Mật Tông thủ công nhập khẩu Nepal, Tây Tạng. Tượng đồng, pháp khí, tranh Thangka, linh phẩm chính gốc.
          </p>
          <div className="flex items-center gap-3">
            <a href={siteConfig.social.facebook} className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#b8860b]/20 hover:text-[#b8860b] transition-all" aria-label="Facebook">
              <Globe className="w-4 h-4" />
            </a>
            <a href={siteConfig.social.instagram} className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#b8860b]/20 hover:text-[#b8860b] transition-all" aria-label="Instagram">
              <Camera className="w-4 h-4" />
            </a>
            <a href={siteConfig.social.youtube} className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#b8860b]/20 hover:text-[#b8860b] transition-all" aria-label="YouTube">
              <Video className="w-4 h-4" />
            </a>
            <a href={siteConfig.social.tiktok} className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#b8860b]/20 hover:text-[#b8860b] transition-all" aria-label="TikTok">
              <Music2 className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-5 uppercase tracking-wider">Danh Mục</h4>
          <ul className="space-y-3">
            {categories.slice(0, 8).map((cat) => (
              <li key={cat.slug}>
                <Link href={`/danh-muc/${cat.slug}`} className="text-sm text-gray-400 hover:text-white transition-colors">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-5 uppercase tracking-wider">Liên Kết</h4>
          <ul className="space-y-3">
            <li><Link href="/blog" className="text-sm text-gray-400 hover:text-white transition-colors">Bài Viết</Link></li>
            <li><Link href="/gio-hang" className="text-sm text-gray-400 hover:text-white transition-colors">Giỏ Hàng</Link></li>
            <li><Link href="/lien-he" className="text-sm text-gray-400 hover:text-white transition-colors">Liên Hệ</Link></li>
            <li><span className="text-sm text-gray-600">Chính sách đổi trả</span></li>
            <li><span className="text-sm text-gray-600">Chính sách vận chuyển</span></li>
            <li><span className="text-sm text-gray-600">Hướng dẫn thỉnh tượng</span></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-5 uppercase tracking-wider">Liên Hệ</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-[#b8860b]" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Email</p>
                <a href={`mailto:${siteConfig.email}`} className="text-sm text-gray-300 hover:text-white transition-colors">
                  {siteConfig.email}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4 text-[#b8860b]" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Điện thoại</p>
                <a href={`tel:${siteConfig.phone}`} className="text-sm text-gray-300 hover:text-white transition-colors">
                  {siteConfig.phone}
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container-page py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Mật Tông. Tất cả quyền được bảo lưu.</p>
          <p className="text-gray-600">Nhập khẩu trực tiếp từ Nepal · Hàng thủ công 100%</p>
        </div>
      </div>
    </footer>
  )
}
