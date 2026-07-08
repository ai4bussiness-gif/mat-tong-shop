'use client'

import { useState, useEffect } from "react"
import { Star, ChevronDown, ChevronUp, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Minh Tuấn",
    initials: "MT",
    product: "Tượng Phật Thích Ca Mâu Ni Mạ Vàng 24K",
    rating: 5,
    text: "Tượng đẹp hơn cả mong đợi! Chất lượng gia công tinh xảo, từng đường nét trên tượng rất sắc sảo. Mạ vàng sáng bóng, đúng như mô tả. Giao hàng nhanh, đóng gói cẩn thận. Sẽ ủng hộ tiếp!",
    long: false,
  },
  {
    name: "Thu Hương",
    initials: "TH",
    product: "Tượng Tara Xanh Điêu Khắc Thủ Công",
    rating: 5,
    text: "Tôi rất ưng ý với bức tượng Tara Xanh này. Từng chi tiết từ khuôn mặt, trang phục đến tòa sen đều được chạm khắc tỉ mỉ. Đặt trên bàn thờ nhìn rất trang nghiêm và linh thiêng.",
    long: false,
  },
  {
    name: "Đức Anh",
    initials: "ĐA",
    product: "Bộ Pháp Khí Chuông & Chày Kim Cương",
    rating: 5,
    text: "Bộ chuông chày chất lượng cao, âm thanh trong trẻo. Chày kim cương chạm khắc tinh xảo, chuông có âm vang rất tốt cho thiền định. Đóng gói chắc chắn, giao hàng nhanh.",
    long: false,
  },
  {
    name: "Thanh Ngọc",
    initials: "TN",
    product: "Tranh Thangka Phật Thích Ca Vẽ Tay",
    rating: 5,
    text: "Bức Thangka vẽ tay rất đẹp, màu sắc hài hòa, đường nét tỉ mỉ. Đóng khung gỗ sang trọng. Treo lên tường nhìn không gian thờ tự nhiên trang nghiêm hơn hẳn.",
    long: false,
  },
  {
    name: "Hoàng Long",
    initials: "HL",
    product: "Tượng Phật A Di Đà Mạ Vàng Cao Cấp",
    rating: 5,
    text: "Tượng Phật A Di Đà quá đẹp! Lớp mạ vàng 24K sáng bóng, khuôn mặt từ bi, các chi tiết hoa văn được chạm khắc công phu. Tôi rất hài lòng với chất lượng sản phẩm.",
    long: false,
  },
  {
    name: "Phương Linh",
    initials: "PL",
    product: "Tượng Vajrakilaya Kích Thước Lớn",
    rating: 5,
    text: "Tượng Vajrakilaya kích thước lớn rất uy mãnh. Từng chi tiết từ vòng lửa, pháp khí đến khuôn mặt đều được chế tác vô cùng tỉ mỉ. Đây đúng là tác phẩm nghệ thuật Phật giáo đỉnh cao.",
    long: false,
  },
  {
    name: "Khánh Oanh",
    initials: "KO",
    product: "Tượng Quán Thế Âm Bồ Tát Nghìn Tay",
    rating: 5,
    text: "Tượng Quán Thế Âm nghìn tay thực sự là một kiệt tác. Mỗi cánh tay đều được chạm khắc riêng biệt, các chi tiết trang sức và hoa văn rất tinh xảo. Shop tư vấn nhiệt tình, đóng gói kỹ lưỡng.",
    long: true,
    textLong: "Tượng Quán Thế Âm nghìn tay thực sự là một kiệt tác. Mỗi cánh tay đều được chạm khắc riêng biệt, các chi tiết trang sức và hoa văn rất tinh xảo. Shop tư vấn nhiệt tình, đóng gói kỹ lưỡng. Giao hàng nhanh chóng, đúng hẹn. Tôi sẽ tiếp tục mua thêm các sản phẩm khác từ shop trong thời gian tới.",
  },
  {
    name: "Công Thành",
    initials: "CT",
    product: "Tượng Phật Dược Sư Mạ Vàng 24K",
    rating: 5,
    text: "Tượng Phật Dược Sư mạ vàng rất đẹp, tay nghề điêu luyện. Khuôn mặt Phật hiền từ, ánh mắt nhân từ. Mạ vàng sáng đều, không bị lỗi. Shop gửi kèm giấy chứng nhận và quà tặng rất chu đáo.",
    long: true,
    textLong: "Tượng Phật Dược Sư mạ vàng rất đẹp, tay nghề điêu luyện. Khuôn mặt Phật hiền từ, ánh mắt nhân từ. Mạ vàng sáng đều, không bị lỗi. Shop gửi kèm giấy chứng nhận và quà tặng rất chu đáo. Đặc biệt ấn tượng với dịch vụ khách hàng của shop — họ tư vấn rất kỹ về kích thước phù hợp với không gian thờ của gia đình tôi.",
  },
  {
    name: "Bảo Châu",
    initials: "BC",
    product: "Tượng Kim Cương Thủ Vajrapani",
    rating: 5,
    text: "Tượng Vajrapani uy mãnh và đầy năng lượng. Chất liệu đồng đặc, mạ vàng sáng bóng. Các chi tiết như vòng lửa, chày kim cương được chế tác rất kỹ lưỡng. Rất hài lòng với chất lượng.",
    long: false,
  },
  {
    name: "Minh Anh",
    initials: "MA",
    product: "Tượng Tara Trắng Trường Thọ",
    rating: 5,
    text: "Tara Trắng thật sự rất đẹp và thanh thoát. Khuôn mặt từ bi, các chi tiết trang sức và hoa sen được chạm khắc tinh xảo. Shop giao hàng nhanh, bao bì rất cẩn thận, có xốp bảo vệ nhiều lớp.",
    long: false,
  },
  {
    name: "Tuấn Kiệt",
    initials: "TK",
    product: "Bộ Pháp Khí Chuông & Chày Kim Cương",
    rating: 5,
    text: "Mua bộ chuông chày để phục vụ thiền định, chất lượng vượt xa kỳ vọng. Chuông kêu rất trong và vang, chày cầm chắc tay. Shop tư vấn rất nhiệt tình về cách chọn kích thước phù hợp.",
    long: false,
  },
  {
    name: "Hải Yến",
    initials: "HY",
    product: "Tranh Thangka Tara Xanh Cao Cấp",
    rating: 5,
    text: "Tranh Thangka vẽ tay tinh xảo, màu sắc tươi sáng và hài hòa. Các chi tiết từ khuôn mặt Tara, hoa sen đến ánh sáng đều rất đẹp. Đóng khung chắc chắn, thích hợp làm quà tặng.",
    long: false,
  },
  // ═══ 6 cảm nhận mới ═══
  {
    name: "Gia Bảo",
    initials: "GB",
    product: "Tượng Phật Thích Ca Mâu Ni Mạ Vàng 24K",
    rating: 5,
    text: "Lần đầu mua tượng Phật online mà không hề thất vọng. Tượng đẹp, chắc chắn, mạ vàng sáng loáng. Shop gửi tặng kèm túi vải và giấy chứng nhận rất chuyên nghiệp. Sẽ giới thiệu cho bạn bè.",
    long: false,
  },
  {
    name: "Diễm My",
    initials: "DM",
    product: "Tượng Tara Xanh Điêu Khắc Thủ Công",
    rating: 5,
    text: "Tượng Tara Xanh quá đẹp và linh thiêng. Từng đường nét chạm khắc tinh tế, màu sắc hài hòa. Mình đặt trên bàn thờ phòng khách, ai đến chơi cũng khen. Cảm ơn shop đã tư vấn nhiệt tình!",
    long: false,
  },
  {
    name: "Anh Khoa",
    initials: "AK",
    product: "Tượng Kim Cương Thủ Vajrapani",
    rating: 5,
    text: "Tượng Vajrapani uy mãnh, chất lượng tuyệt vời. Đồng đặc, mạ vàng dày, các chi tiết vòng lửa và chày kim cương chạm khắc rất công phu. Shop giao hàng siêu nhanh, đóng gói cực kỳ cẩn thận.",
    long: true,
    textLong: "Tượng Vajrapani uy mãnh, chất lượng tuyệt vời. Đồng đặc, mạ vàng dày, các chi tiết vòng lửa và chày kim cương chạm khắc rất công phu. Shop giao hàng siêu nhanh, đóng gói cực kỳ cẩn thận với nhiều lớp xốp và thùng gỗ. Tôi đã mua nhiều lần và lần nào cũng hài lòng. Đây là địa chỉ tin cậy cho người tu tập Mật Tông.",
  },
  {
    name: "Quỳnh Trang",
    initials: "QT",
    product: "Tranh Thangka Phật Thích Ca Vẽ Tay",
    rating: 5,
    text: "Bức Thangka vẽ tay tỉ mỉ đến từng chi tiết nhỏ. Màu sắc tự nhiên, đường nét mượt mà. Khung gỗ đẹp, chắc chắn. Treo trong phòng thiền nhìn rất trang nghiêm. Cảm ơn shop đã tư vấn kích thước phù hợp.",
    long: false,
  },
  {
    name: "Trọng Nhân",
    initials: "TN",
    product: "Bộ Pháp Khí Chuông & Chày Kim Cương Mạ Vàng",
    rating: 5,
    text: "Bộ chuông chày chất lượng cao cấp. Chuông kêu trong trẻo, vang xa. Chày kim cương chạm khắc tinh xảo, mạ vàng sáng bóng. Shop tư vấn rất kỹ về cách chọn kích thước. Giao hàng nhanh, đóng gói chắc chắn.",
    long: false,
  },
  {
    name: "Mỹ Linh",
    initials: "ML",
    product: "Tượng Phật Dược Sư Mạ Vàng 24K",
    rating: 5,
    text: "Tượng Phật Dược Sư đẹp tuyệt vời! Khuôn mặt từ bi, lớp mạ vàng sáng đều. Mình đặt trên bàn thờ gia tiên, không gian thờ tự nhiên trang nghiêm hơn hẳn. Shop gửi kèm quà rất chu đáo, cảm ơn shop nhiều!",
    long: false,
  },
]

const MOBILE_INITIAL = 4
const DESKTOP_INITIAL = 8

export default function TestimonialSection() {
  const [showAll, setShowAll] = useState(false)
  const [limit, setLimit] = useState(MOBILE_INITIAL)
  const [expanded, setExpanded] = useState<Record<number, boolean>>({})

  useEffect(() => {
    // Responsive: mobile 4, desktop ≥8
    const check = () => setLimit(window.innerWidth >= 1024 ? DESKTOP_INITIAL : MOBILE_INITIAL)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const visible = showAll ? testimonials : testimonials.slice(0, limit)
  const remaining = testimonials.length - limit

  const toggleExpand = (index: number) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  return (
    <section className="py-16 sm:py-20 bg-[#0f172a]">
      <div className="container-page">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[#b8860b] text-xs sm:text-sm uppercase tracking-[0.2em] font-medium mb-1">
            Khách Hàng Nói Gì
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            Cảm Nhận Từ <span className="text-[#b8860b]">Thỉnh Tượng</span>
          </h2>
          <div className="w-12 h-0.5 bg-[#b8860b] mt-3 rounded-full mx-auto" />
        </div>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-5 space-y-4 sm:space-y-5">
          {visible.map((t, index) => {
            const isExpanded = expanded[index] || false
            const showMoreBtn = t.long && t.textLong
            return (
              <div
                key={index}
                className="break-inside-avoid rounded-xl border border-gray-700/50 bg-[#0b1120] p-5 sm:p-6 hover:border-gray-600 transition-colors"
              >
                {/* Stars */}
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#b8860b] text-[#b8860b]" />
                  ))}
                </div>

                {/* Text */}
                <div className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
                  <Quote className="w-4 h-4 text-[#b8860b]/30 inline-block mr-1 -mt-1" />
                  {t.long && !isExpanded
                    ? t.text.substring(0, 120)
                    : t.text}
                  {showMoreBtn && !isExpanded && <span className="text-gray-500">…</span>}
                </div>

                {/* Expanded long text */}
                {showMoreBtn && isExpanded && (
                  <div className="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
                    {t.textLong}
                  </div>
                )}

                {/* Read more toggle */}
                {showMoreBtn && (
                  <button
                    onClick={() => toggleExpand(index)}
                    className="flex items-center gap-1 text-xs text-[#b8860b] hover:text-[#a07608] transition-colors mb-4 font-medium"
                  >
                    {isExpanded ? (
                      <>Thu gọn <ChevronUp className="w-3 h-3" /></>
                    ) : (
                      <>Xem thêm <ChevronDown className="w-3 h-3" /></>
                    )}
                  </button>
                )}

                {/* Author */}
                <div className="flex items-center gap-3 pt-3 border-t border-gray-800">
                  <div className="w-10 h-10 bg-[#b8860b]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-[#b8860b]">{t.initials}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white">{t.name}</p>
                    <p className="text-xs text-gray-500 truncate">{t.product}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Global Load More */}
        {!showAll && remaining > 0 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-600 text-gray-300 text-sm font-medium rounded-xl hover:bg-white/5 hover:border-[#b8860b] hover:text-[#b8860b] transition-all duration-200"
            >
              Xem thêm ({remaining} đánh giá)
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
