import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { slugify } from '@/lib/utils'

export async function GET() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json({ products })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, slug, description, price, images, dimensions, weight, material, vendor, inStock, featured, categoryId } = body

    if (!name || !price) {
      return NextResponse.json({ error: 'Thiếu tên hoặc giá sản phẩm' }, { status: 400 })
    }

    const productSlug = slug || slugify(name)

    const product = await prisma.product.create({
      data: {
        name,
        slug: productSlug,
        description: description || '',
        price: parseFloat(price),
        images: images || '[]',
        dimensions: dimensions || null,
        weight: weight || null,
        material: material || null,
        vendor: vendor || 'Mật Tông',
        inStock: inStock !== undefined ? inStock : true,
        featured: featured || false,
        categoryId: categoryId ? parseInt(categoryId) : null,
      },
      include: { category: true },
    })

    return NextResponse.json({ product, success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 })
  }
}
