'use client'

import { useState } from 'react'
import { Star, Quote, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: 'Minh Tuấn',
    location: 'Hà Nội',
    avatar: 'MT',
    rating: 5,
    text: 'Tượng Phật Thích Ca mạ vàng 24K nhận được thật sự vượt xa mong đợi. Chất lượng chế tác tinh xảo từng chi tiết, từ khuôn mặt từ bi đến hoa văn trên tòa sen. Đóng gói cực kỳ cẩn thận. Gia đình tôi rất hoan hỷ.',
    product: 'Tượng Phật Thích Ca Mâu Ni Mạ Vàng 24K',
    long: false,
  },
  {
    id: 2,
    name: 'Thanh Hương',
    location: 'TP. Hồ Chí Minh',
    avatar: 'TH',
    rating: 5,
    text: 'Lần đầu thỉnh tượng online mà không hề thất vọng. Tượng Tara Xanh nhìn thực tế còn đẹp hơn ảnh chụp. Anh chủ shop tư vấn rất tận tâm, giải thích cặn kẽ về ý nghĩa từng chi tiết. Sẽ ủng hộ dài dài.',
    product: 'Tượng Tara Xanh Điêu Khắc Thủ Công',
    long: false,
  },
  {
    id: 3,
    name: 'Đức Anh',
    location: 'Đà Nẵng',
    avatar: 'ĐA',
    rating: 5,
    text: 'Mua bộ Chuông & Chày Kim Cương làm quà cho sư thầy nhân dịp thầy viên tịch. Thầy khen chất lượng đồng và âm thanh chuông rất tốt. Giao hàng nhanh, đóng gói chắc chắn. Rất đáng tin cậy.',
    product: 'Bộ Pháp Khí Chuông & Chày Kim Cương',
    long: false,
  },
  {
    id: 4,
    name: 'Thu Nguyệt',
    location: 'Huế',
    avatar: 'TN',
    rating: 5,
    text: 'Tranh Thangka vẽ tay đẹp xuất sắc! Màu sắc rực rỡ, đường nét tinh tế. Mình treo trong phòng thiền, không gian trở nên linh thiêng hơn hẳn. Cảm ơn shop đã tư vấn nhiệt tình về kích thước phù hợp với không gian thờ.',
    product: 'Tranh Thangka Phật Thích Ca Vẽ Tay',
    long: false,
  },
  {
    id: 5,
    name: 'Hoàng Long',
    location: 'Hải Phòng',
    avatar: 'HL',
    rating: 5,
    text: 'Thỉnh tượng Phật A Di Đà về thờ trong ngày vía Phật, mọi sự đều viên mãn. Tượng 50cm đặt trên bàn thờ rất uy nghi. Chất lượng mạ vàng sáng đẹp, không tì vết. Đóng gỗ chắc chắn, giao tận nhà.',
    product: 'Tượng Phật A Di Đà Mạ Vàng Cao Cấp',
    long: false,
  },
  {
    id: 6,
    name: 'Phương Linh',
    location: 'Cần Thơ',
    avatar: 'PL',
    rating: 5,
    text: 'Mình hơi lo khi đặt tượng kích thước lớn qua mạng, nhưng mọi lo lắng đều tan biến khi nhận hàng. Tượng Vajrakilaya 35.5cm quá uy lực, chế tác cực kỳ công phu. Shop giao hàng tận nhà miễn phí.',
    product: 'Tượng Vajrakilaya Kích Thước Lớn',
    long: false,
  },
  {
    id: 7,
    name: 'Kim Oanh',
    location: 'Nha Trang',
    avatar: 'KO',
    rating: 5,
    text: 'Đặt tượng Quán Thế Âm nghìn tay, lúc mở hộp ra cả nhà đều trầm trồ. Từng cánh tay nhỏ xíu mà chạm khắc tỉ mỉ đến vậy. Thật sự là kiệt tác nghệ thuật. Cảm ơn Mật Tông Shop đã mang Phật pháp đến gần hơn.',
    product: 'Tượng Quán Thế Âm Bồ Tát Nghìn Tay',
    long: false,
  },
  {
    id: 8,
    name: 'Công Thành',
    location: 'Biên Hòa',
    avatar: 'CT',
    rating: 5,
    text: 'Mình là Phật tử thuần thành, đã thỉnh rất nhiều tượng từ nhiều nơi nhưng Mật Tông Shop là nơi làm mình hài lòng nhất. Tượng Phật Dược Sư vừa đẹp vừa linh thiêng. Giá cả hợp lý so với chất lượng.',
    product: 'Tượng Phật Dược Sư Mạ Vàng 24K',
    long: true,
    textLong: 'Mình là Phật tử thuần thành, đã thỉnh rất nhiều tượng từ nhiều nơi nhưng Mật Tông Shop là nơi làm mình hài lòng nhất. Tượng Phật Dược Sư mạ vàng vừa đẹp vừa linh thiêng. Giá cả hợp lý so với chất lượng. Đặc biệt anh chủ shop còn tư vấn rất kỹ về cách bài trí và ý nghĩa của từng tôn tượng — không chỉ bán hàng mà còn truyền đạt Phật pháp. Sẽ còn ủng hộ dài dài và giới thiệu cho bạn đạo.',
  },
  {
    id: 9,
    name: 'Bảo Châu',
    location: 'Vũng Tàu',
    avatar: 'BC',
    rating: 5,
    text: 'Tượng Kim Cương Thủ Bồ Tát mạ vàng quá đẹp, thần thái uy mãnh nhưng vẫn từ bi. Em trai mình mê mẩn ngắm mãi không chán. Đóng gói 3 lớp xốp + thùng gỗ rất chắc chắn.',
    product: 'Tượng Kim Cương Thủ Vajrapani',
    long: true,
    textLong: 'Tượng Kim Cương Thủ Bồ Tát mạ vàng quá đẹp, thần thái uy mãnh nhưng vẫn từ bi. Em trai mình mê mẩn ngắm mãi không chán. Đóng gói 3 lớp xốp + thùng gỗ rất chắc chắn. Ship từ Nepal về Việt Nam mà không hề hấn gì. Mình đã quay video unboxing để đăng lên group Phật tử, ai cũng khen. Một trải nghiệm thỉnh tượng đáng nhớ!',
  },
  {
    id: 10,
    name: 'Mai Anh',
    location: 'Đà Lạt',
    avatar: 'MA',
    rating: 5,
    text: 'Tượng Tara Trắng đặt trong phòng thiền nhìn rất an lành. Chất liệu đồng mạ vàng sáng đẹp, các chi tiết hoa văn tinh xảo. Mỗi sáng ngồi thiền trước tượng thấy tâm an hơn hẳn.',
    product: 'Tượng Tara Trắng Trường Thọ',
    long: false,
  },
  {
    id: 11,
    name: 'Nhật Nam',
    location: 'Quảng Ninh',
    avatar: 'NN',
    rating: 5,
    text: 'Lần đầu mua tượng online tầm giá 80 triệu, mình khá lo lắng. Nhưng từ khâu tư vấn đến giao hàng đều chuyên nghiệp. Tượng Phật A Di Đà 50cm thực tế còn đẹp hơn ảnh. Rất hài lòng!',
    product: 'Tượng Phật A Di Đà Mạ Vàng Cao Cấp',
    long: true,
    textLong: 'Lần đầu mua tượng online tầm giá 80 triệu, mình khá lo lắng. Nhưng từ khâu tư vấn đến giao hàng đều chuyên nghiệp. Tượng Phật A Di Đà 50cm thực tế còn đẹp hơn ảnh chụp rất nhiều — vàng sáng ấm áp, các đường nét chạm khắc sắc sảo. Mình đã so sánh với tượng cùng tầm giá ở các chợ đồ cổ và thấy chất lượng vượt trội hơn hẳn. Rất hài lòng và sẽ tiếp tục thỉnh thêm!',
  },
  {
    id: 12,
    name: 'Diệu Hân',
    location: 'Sóc Trăng',
    avatar: 'DH',
    rating: 5,
    text: 'Nhận được tượng Phật Thích Ca oxidized, nhìn cổ kính trang nghiêm vô cùng. Đặt trên bàn thờ tổ tiên thấy không gian thờ tự trở nên ấm cúng và linh thiêng. Gia đình rất vui.',
    product: 'Tượng Phật Thích Ca Đồng Oxidized',
    long: false,
  },
]

export default function TestimonialSection() {
  const [expanded, setExpanded] = useState<Record<number, boolean>>({})

  const toggleExpand = (id: number) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <section className="py-14 sm:py-20">
      {/* ═══ Header với rating summary ═══ */}
      <div className="container-page mb-10">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
          {/* Rating big number */}
          <div className="text-center flex-shrink-0">
            <div className="text-5xl sm:text-6xl font-bold text-white leading-none">5.0</div>
            <div className="flex items-center justify-center gap-0.5 mt-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#b8860b] text-[#b8860b]" />
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-1">12 đánh giá</p>
          </div>

          {/* Title */}
          <div className="text-center sm:text-left">
            <p className="text-[#b8860b] text-xs sm:text-sm uppercase tracking-[0.2em] font-medium mb-1">
              Khách Hàng Nói Gì
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Cảm Nhận <span className="text-[#b8860b]">Từ Thỉnh Tượng</span>
            </h2>
            <div className="w-12 h-0.5 bg-[#b8860b] mt-3 rounded-full hidden sm:block" />
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-4 sm:ml-auto">
            {[
              { label: 'Hàng thủ công', sub: 'Nepal' },
              { label: 'Giao toàn cầu', sub: 'Miễn phí' },
              { label: 'Đổi trả', sub: '7 ngày' },
            ].map((badge) => (
              <div key={badge.label} className="text-center hidden sm:block">
                <p className="text-white text-xs font-semibold">{badge.label}</p>
                <p className="text-[10px] text-gray-500">{badge.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ Masonry grid (CSS columns cho desktop, grid đơn cho mobile) ═══ */}
      <div className="container-page">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {testimonials.map((t, index) => {
            const isExpanded = expanded[t.id]
            const displayText = t.long && !isExpanded ? t.text : (t.textLong || t.text)
            const showMore = t.long && t.textLong
            // Tạo chiều cao tự nhiên khác nhau cho masonry feel
            const tallVariant = index % 4 === 0 || index % 7 === 0
  
            return (
              <div
                key={t.id}
                className={`${tallVariant ? 'sm:row-span-1' : ''}`}
              >
                <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-5 sm:p-6 hover:border-[#b8860b]/20 transition-all duration-300 group">
                  {/* Quote icon */}
                  <Quote className="w-7 h-7 text-[#b8860b]/10 absolute top-4 right-4 hidden sm:block" />

                  {/* Stars + date */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#b8860b] text-[#b8860b]" />
                      ))}
                    </div>
                  </div>

                  {/* Review text */}
                  <div className="relative">
                    <p className="text-sm text-gray-300 leading-relaxed">
                      &ldquo;{displayText}
                      {showMore && !isExpanded && '…'}
                      &rdquo;
                    </p>
                    {showMore && (
                      <button
                        onClick={() => toggleExpand(t.id)}
                        className="flex items-center gap-1 text-xs text-[#b8860b] hover:text-[#c9971a] mt-2 font-medium transition-colors"
                      >
                        {isExpanded ? (
                          <>Thu gọn <ChevronUp className="w-3 h-3" /></>
                        ) : (
                          <>Xem thêm <ChevronDown className="w-3 h-3" /></>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Product badge */}
                  {t.product && (
                    <div className="mt-3 pt-3 border-t border-gray-800/50">
                      <p className="text-[11px] text-gray-500 flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        {t.product}
                      </p>
                    </div>
                  )}

                  {/* Author */}
                  <div className="flex items-center gap-3 mt-4">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#b8860b]/30 to-[#b8860b]/10 text-[#b8860b] flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {t.avatar}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ═══ Bottom CTA ═══ */}
      <div className="text-center mt-10">
        <p className="text-sm text-gray-500">
          Trên 12 khách hàng đã tin tưởng thỉnh tượng tại Mật Tông
        </p>
      </div>
    </section>
  )
}
