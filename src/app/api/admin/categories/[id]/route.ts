import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()
    const { name, slug, image, parentId } = body

    const data: any = {}
    if (name !== undefined) data.name = name
    if (slug !== undefined) data.slug = slug
    if (image !== undefined) data.image = image || null
    if (parentId !== undefined) data.parentId = parentId ? parseInt(parentId) : null

    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data,
    })

    return NextResponse.json({ category, success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    // Unlink products first
    await prisma.product.updateMany({
      where: { categoryId: parseInt(id) },
      data: { categoryId: null },
    })
    await prisma.category.delete({ where: { id: parseInt(id) } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 })
  }
}
