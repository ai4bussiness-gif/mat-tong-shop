import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="bg-[#0b1120] min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="text-8xl sm:text-9xl font-bold text-[#b8860b]/20 mb-4 leading-none">404</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Trang Không Tìm Thấy
        </h1>
        <p className="text-gray-400 mb-8 leading-relaxed">
          Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
          Hãy quay lại trang chủ hoặc khám phá các danh mục bên dưới.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-[#b8860b] text-white text-sm font-medium rounded-lg hover:bg-[#a07608] transition-colors"
          >
            Về Trang Chủ
          </Link>
          <Link
            href="/danh-muc/phat"
            className="inline-flex items-center px-6 py-3 border border-gray-700 text-gray-300 text-sm font-medium rounded-lg hover:border-[#b8860b]/30 hover:text-white transition-colors"
          >
            Khám Phá Sản Phẩm
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-3 gap-3">
          {[
            { href: '/danh-muc/phat', label: 'Phật' },
            { href: '/danh-muc/bo-tat', label: 'Bồ Tát' },
            { href: '/danh-muc/phat-mau', label: 'Phật Mẫu' },
            { href: '/danh-muc/than-tai', label: 'Thần Tài' },
            { href: '/danh-muc/ho-phap', label: 'Hộ Pháp' },
            { href: '/lien-he', label: 'Liên Hệ' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-center px-3 py-2.5 bg-[#0f172a] border border-gray-800 rounded-lg text-xs text-gray-400 hover:text-white hover:border-[#b8860b]/30 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
