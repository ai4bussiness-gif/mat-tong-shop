export type Product = {
  id: number
  name: string
  slug: string
  description: string
  price: number
  images: string
  dimensions: string | null
  weight: string | null
  material: string | null
  vendor: string
  inStock: boolean
  featured: boolean
  categoryId: number | null
  category: { id: number; name: string; slug: string } | null
  createdAt: string | Date
}

export type Category = {
  id: number
  name: string
  slug: string
  image: string | null
  parentId: number | null
}

export type Order = {
  id: number
  items: string
  total: number
  customerName: string
  customerEmail: string
  customerPhone: string
  customerAddress: string
  note: string | null
  status: string
  paymentMethod: string
  paid: boolean
  createdAt: string
}
