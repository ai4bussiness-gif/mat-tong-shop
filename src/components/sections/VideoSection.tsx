'use client'

export function VideoSection() {
  return (
    <section className="relative bg-[#0b1120] overflow-hidden min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] flex items-center">
      {/* Background video — auto play, loop, muted */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="https://nidhiratna.com/cdn/shop/files/preview_images/998756c0488a47149b677dce72f49e96.thumbnail.0000000000.jpg"
      >
        <source
          src="https://nidhiratna.com/cdn/shop/videos/c/vp/998756c0488a47149b677dce72f49e96/998756c0488a47149b677dce72f49e96.HD-1080p-4.8Mbps-45620052.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-[#0b1120]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="container-page">
          <div className="flex flex-col items-start max-w-xl">
            <p className="text-[#b8860b] text-xs sm:text-sm uppercase tracking-[0.2em] font-medium mb-3">
              Pháp Ấn Mật Tông
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
              Nghi Lễ Nhập Tượng &amp;{" "}
              <span className="text-[#b8860b]">Khai Quang</span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-lg mt-4">
              Nghi lễ nhập tượng và khai quang được thực hiện bởi các Lama cao cấp tại Nepal,
              đảm bảo linh khí và sự thiêng liêng cho tôn tượng theo đúng nghi thức Mật Tông.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
