export const siteConfig = {
  name: 'Mật Tông',
  tagline: 'Tượng Phật Thủ Công & Vật Phẩm Mật Tông',
  description: 'Chuyên tượng Phật Mật Tông thủ công nhập khẩu Nepal, Tây Tạng. Tượng đồng, pháp khí, tranh Thangka, linh phẩm chính gốc.',
  email: 'info@mattongshop.com',
  phone: '0977 693 109',
  address: 'Việt Nam',
  social: {
    facebook: '#',
    instagram: '#',
    youtube: '#',
    tiktok: '#',
    pinterest: '#',
  },
  currency: '₫',
  freeShipping: 'Miễn Phí Vận Chuyển Toàn Cầu',
}

export const categories = [
  { slug: 'tuong-phat', name: 'Tượng Phật', image: '' },
  { slug: 'tuong-bo-tat', name: 'Tượng Bồ Tát', image: '' },
  { slug: 'tuong-tara', name: 'Tượng Tara', image: '' },
  { slug: 'tuong-dakini', name: 'Tượng Dakini', image: '' },
  { slug: 'tuong-guru', name: 'Tượng Guru', image: '' },
  { slug: 'tuong-than-tai', name: 'Tượng Thần Tài', image: '' },
  { slug: 'tuong-lon', name: 'Tượng Kích Thước Lớn', image: '' },
  { slug: 'phap-khi', name: 'Pháp Khí', image: '' },
  { slug: 'tranh-thangka', name: 'Tranh Thangka', image: '' },
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
  'tuong-phat': 'Buddha',
  'tuong-bo-tat': 'Bodhisattva',
  'tuong-tara': 'Tara',
  'tuong-dakini': 'Dakini',
  'tuong-guru': 'Guru',
  'tuong-than-tai': 'Wealth Deity',
}
