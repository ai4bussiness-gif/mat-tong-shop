import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { slugify } from '@/lib/utils'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()
    const { name, slug, description, price, images, dimensions, weight, material, vendor, inStock, featured, categoryId } = body

    const data: any = {}
    if (name !== undefined) data.name = name
    if (slug !== undefined) data.slug = slug
    if (description !== undefined) data.description = description
    if (price !== undefined) data.price = parseFloat(price)
    if (images !== undefined) data.images = images
    if (dimensions !== undefined) data.dimensions = dimensions || null
    if (weight !== undefined) data.weight = weight || null
    if (material !== undefined) data.material = material || null
    if (vendor !== undefined) data.vendor = vendor
    if (inStock !== undefined) data.inStock = inStock
    if (featured !== undefined) data.featured = featured
    if (categoryId !== undefined) data.categoryId = categoryId ? parseInt(categoryId) : null

    // Auto-generate slug from name if name changed and no explicit slug
    if (name !== undefined && slug === undefined) {
      data.slug = slugify(name)
    }

    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data,
      include: { category: true },
    })

    return NextResponse.json({ product, success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await prisma.product.delete({ where: { id: parseInt(id) } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 })
  }
}
