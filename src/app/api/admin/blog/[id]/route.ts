import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json()
    const { title, slug, content, excerpt, image, published } = body

    const data: any = {}
    if (title !== undefined) data.title = title
    if (slug !== undefined) data.slug = slug
    if (content !== undefined) data.content = content
    if (excerpt !== undefined) data.excerpt = excerpt || null
    if (image !== undefined) data.image = image || null
    if (published !== undefined) {
      data.published = published
      data.publishedAt = published ? new Date() : null
    }

    const post = await prisma.blogPost.update({
      where: { id: parseInt(id) },
      data,
    })

    return NextResponse.json({ post, success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await prisma.blogPost.delete({ where: { id: parseInt(id) } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 })
  }
}
