'use client'

import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Minh Tuấn',
    location: 'Hà Nội',
    avatar: 'MT',
    rating: 5,
    text: 'Tượng Phật Thích Ca mạ vàng 24K nhận được thật sự vượt xa mong đợi. Chất lượng chế tác tinh xảo từng chi tiết, từ khuôn mặt từ bi đến hoa văn trên tòa sen. Đóng gói cực kỳ cẩn thận. Gia đình tôi rất hoan hỷ.',
    product: 'Tượng Phật Thích Ca Mâu Ni Mạ Vàng 24K',
    date: '2026-06',
  },
  {
    id: 2,
    name: 'Thanh Hương',
    location: 'TP. Hồ Chí Minh',
    avatar: 'TH',
    rating: 5,
    text: 'Lần đầu thỉnh tượng online mà không hề thất vọng. Tượng Tara Xanh nhìn thực tế còn đẹp hơn ảnh chụp. Anh chủ shop tư vấn rất tận tâm, giải thích cặn kẽ về ý nghĩa từng chi tiết. Sẽ ủng hộ dài dài.',
    product: 'Tượng Tara Xanh (Green Tara) Điêu Khắc Thủ Công',
    date: '2026-05',
  },
  {
    id: 3,
    name: 'Đức Anh',
    location: 'Đà Nẵng',
    avatar: 'ĐA',
    rating: 5,
    text: 'Mua bộ Chuông & Chày Kim Cương làm quà cho sư thầy, thầy khen chất lượng đồng và âm thanh chuông rất tốt. Giao hàng nhanh, đóng gói chắc chắn. Rất đáng tin cậy.',
    product: 'Bộ Pháp Khí Chuông & Chày Kim Cương Mạ Vàng',
    date: '2026-04',
  },
  {
    id: 4,
    name: 'Thu Nguyệt',
    location: 'Huế',
    avatar: 'TN',
    rating: 5,
    text: 'Tranh Thangka vẽ tay đẹp xuất sắc! Màu sắc rực rỡ, đường nét tinh tế. Mình treo trong phòng thiền, không gian trở nên linh thiêng hơn hẳn. Cảm ơn shop đã tư vấn nhiệt tình.',
    product: 'Tranh Thangka Phật Thích Ca Vẽ Tay',
    date: '2026-03',
  },
  {
    id: 5,
    name: 'Hoàng Long',
    location: 'Hải Phòng',
    avatar: 'HL',
    rating: 5,
    text: 'Thỉnh tượng Phật A Di Đà về thờ trong ngày vía Phật A Di Đà, mọi sự đều viên mãn. Tượng 50cm đặt trên bàn thờ rất uy nghi. Chất lượng mạ vàng sáng đẹp, không tì vết.',
    product: 'Tượng Phật A Di Đà Đồng Mạ Vàng Cao Cấp',
    date: '2026-02',
  },
  {
    id: 6,
    name: 'Phương Linh',
    location: 'Cần Thơ',
    avatar: 'PL',
    rating: 5,
    text: 'Mình hơi lo khi đặt tượng kích thước lớn qua mạng, nhưng mọi lo lắng đều tan biến khi nhận hàng. Tượng Vajrakilaya 35.5cm quá uy lực, chế tác cực kỳ công phu. Shop giao hàng tận nhà miễn phí.',
    product: 'Tượng Vajrakilaya Kích Thước Lớn',
    date: '2026-01',
  },
]

const itemsPerPage = 3

export default function TestimonialSection() {
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(testimonials.length / itemsPerPage)
  const currentItems = testimonials.slice(page * itemsPerPage, (page + 1) * itemsPerPage)

  return (
    <section className="mt-16 sm:mt-20">
      {/* Section header */}
      <div className="text-center mb-10">
        <p className="text-[#b8860b] text-xs sm:text-sm uppercase tracking-[0.2em] font-medium mb-2">
          Khách Hàng Nói Gì
        </p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
          Cảm Nhận <span className="text-[#b8860b]">Từ Thỉnh Tượng</span>
        </h2>
        <div className="w-12 h-0.5 bg-[#b8860b] mt-4 mx-auto rounded-full" />
      </div>

      {/* Testimonial cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {currentItems.map((t) => (
          <div
            key={t.id}
            className="bg-[#0f172a] border border-gray-800 rounded-xl p-5 sm:p-6 relative group hover:border-[#b8860b]/30 transition-colors"
          >
            {/* Quote icon */}
            <Quote className="w-8 h-8 text-[#b8860b]/10 absolute top-4 right-4" />

            {/* Stars */}
            <div className="flex items-center gap-0.5 mb-4">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#b8860b] text-[#b8860b]" />
              ))}
            </div>

            {/* Quote text */}
            <p className="text-sm text-gray-300 leading-relaxed mb-5 line-clamp-5">
              &ldquo;{t.text}&rdquo;
            </p>

            {/* Product badge */}
            <p className="text-[11px] text-gray-500 mb-4 italic">
              {t.product}
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 border-t border-gray-800 pt-4">
              <div className="w-10 h-10 rounded-full bg-[#b8860b]/20 text-[#b8860b] flex items-center justify-center text-sm font-bold flex-shrink-0">
                {t.avatar}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-white truncate">{t.name}</p>
                <p className="text-xs text-gray-500">{t.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={() => setPage(Math.max(0, page - 1))}
            disabled={page === 0}
            className="p-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-[#b8860b] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === page ? 'bg-[#b8860b] w-6' : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
            disabled={page === totalPages - 1}
            className="p-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-[#b8860b] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  )
}
