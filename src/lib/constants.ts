export const siteConfig = {
  name: 'Mật Tông',
  tagline: 'Tượng Phật Thủ Công Mật Tông',
  description: 'Chuyên tượng Phật Mật Tông thủ công nhập khẩu Nepal, Tây Tạng. Tượng đồng mạ vàng 24K, linh phẩm Phật giáo chính gốc.',
  email: 'info@mattongshop.com',
  phone: '0977 693 109',
  address: 'Việt Nam',
  social: {
    facebook: 'https://facebook.com/mattongshop',
    instagram: 'https://instagram.com/mattongshop',
    youtube: 'https://youtube.com/@mattongshop',
    tiktok: 'https://tiktok.com/@mattongshop',
    pinterest: 'https://pinterest.com/mattongshop',
  },
  currency: '₫',
  freeShipping: 'Miễn Phí Vận Chuyển Toàn Cầu',
}

export const categories = [
  { slug: 'phat', name: 'Phật', image: '' },
  { slug: 'bo-tat', name: 'Bồ Tát', image: '' },
  { slug: 'phat-mau', name: 'Phật Mẫu', image: '' },
  { slug: 'ho-phap', name: 'Hộ Pháp', image: '' },
  { slug: 'dai-su', name: 'Đại Sư', image: '' },
  { slug: 'than-tai', name: 'Thần Tài', image: '' },
] as const

export const sortOptions = [
  { value: 'newest', label: 'Mới Nhất' },
  { value: 'price-asc', label: 'Giá: Thấp → Cao' },
  { value: 'price-desc', label: 'Giá: Cao → Thấp' },
  { value: 'name-asc', label: 'Tên: A → Z' },
] as const

export const orderStatusMap: Record<string, string> = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  shipping: 'Đang giao',
  delivered: 'Đã giao',
  cancelled: 'Đã hủy',
}

export const COLLECTION_NAMES: Record<string, string> = {
  'phat': 'Phật',
  'bo-tat': 'Bồ Tát',
  'phat-mau': 'Phật Mẫu',
  'ho-phap': 'Hộ Pháp',
  'dai-su': 'Đại Sư',
  'than-tai': 'Thần Tài',
}
