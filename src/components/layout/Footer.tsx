import Link from "next/link"
import { siteConfig } from "@/lib/constants"
import { categories } from "@/lib/constants"
import { Globe, Camera, Video, Music2, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-[#0b1120] text-gray-400 border-t border-gray-800">
      {/* Main footer */}
      <div className="container-page py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 lg:gap-12">
        {/* Brand */}
        <div>
          <h3 className="text-white text-2xl font-bold tracking-wider mb-6">
            MẬT <span className="text-[#b8860b]">TÔNG</span>
          </h3>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-6">
            Chuyên tượng Phật Mật Tông thủ công nhập khẩu Nepal, Tây Tạng. Tượng đồng, pháp khí, tranh Thangka, linh phẩm chính gốc.
          </p>
          <div className="flex items-center gap-4">
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
          <h4 className="text-white text-base font-semibold mb-6 relative pl-3 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-[#b8860b]">
            Danh Mục
          </h4>
          <ul className="space-y-3.5">
            {categories.slice(0, 8).map((cat) => (
              <li key={cat.slug}>
                <Link href={`/danh-muc/${cat.slug}`} className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white text-base font-semibold mb-6 relative pl-3 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-[#b8860b]">
            Liên Kết
          </h4>
          <ul className="space-y-3.5">
            <li><Link href="/blog" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">Bài Viết</Link></li>
            <li><Link href="/gio-hang" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">Giỏ Hàng</Link></li>
            <li><Link href="/admin" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">Quản Trị</Link></li>
            <li><span className="text-sm sm:text-base text-gray-500">Chính sách đổi trả</span></li>
            <li><span className="text-sm sm:text-base text-gray-500">Chính sách vận chuyển</span></li>
            <li><span className="text-sm sm:text-base text-gray-500">Hướng dẫn thỉnh tượng</span></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white text-base font-semibold mb-6 relative pl-3 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-0.5 before:bg-[#b8860b]">
            Liên Hệ
          </h4>
          <ul className="space-y-5">
            <li className="flex items-start gap-3">
              <div className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Mail className="w-4 h-4 text-[#b8860b]" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Email</p>
                <a href={`mailto:${siteConfig.email}`} className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">
                  {siteConfig.email}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Phone className="w-4 h-4 text-[#b8860b]" />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-0.5">Điện thoại</p>
                <a href={`tel:${siteConfig.phone}`} className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors">
                  {siteConfig.phone}
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="container-page py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Mật Tông. Tất cả quyền được bảo lưu.</p>
          <p>Nhập khẩu trực tiếp từ Nepal · Hàng thủ công 100%</p>
        </div>
      </div>
    </footer>
  )
}
