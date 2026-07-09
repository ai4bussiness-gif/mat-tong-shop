import Link from "next/link"

export function HeroSlider() {
  return (
    <section className="relative bg-[#0f172a] overflow-hidden">
      <div className="relative min-h-[450px] sm:min-h-[550px] lg:min-h-[650px] flex items-center justify-center">
        {/* Hero background image */}
        <img
          src="https://res.cloudinary.com/zgl5avbd/image/upload/v1/mat-tong/hero-banner.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/85 via-[#0f172a]/65 to-[#0f172a]/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />

        {/* Decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#b8860b]/5 rounded-full blur-3xl" />

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <p className="text-[#b8860b] text-sm sm:text-base uppercase tracking-[0.25em] font-medium mb-4">
            Bộ Sưu Tập Tượng Phật Thủ Công
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-5">
            Tượng Phật Mật Tông
            <br />
            <span className="text-[#b8860b]">Thủ Công Nepal</span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Tượng đồng mạ vàng 24K nhập khẩu trực tiếp từ Nepal, Tây Tạng.
            Hàng thủ công 100% từ các nghệ nhân chế tác.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/danh-muc/phat"
              className="inline-flex px-8 py-4 bg-[#b8860b] text-white text-base font-semibold rounded-xl hover:bg-[#a07608] transition-colors shadow-lg shadow-[#b8860b]/25"
            >
              Khám Phá Ngay
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
