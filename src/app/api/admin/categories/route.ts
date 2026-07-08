import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { slugify } from '@/lib/utils'

export async function GET() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { products: true } } },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json({ categories })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, slug, image, parentId } = body

    if (!name) {
      return NextResponse.json({ error: 'Thiếu tên danh mục' }, { status: 400 })
    }

    const categorySlug = slug || slugify(name)

    const category = await prisma.category.create({
      data: {
        name,
        slug: categorySlug,
        image: image || null,
        parentId: parentId ? parseInt(parentId) : null,
      },
    })

    return NextResponse.json({ category, success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 })
  }
}
