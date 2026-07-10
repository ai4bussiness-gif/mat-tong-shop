import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'))
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20')))
  const skip = (page - 1) * limit

  const where = status && status !== 'all' ? { status } : {}

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.order.count({ where }),
  ])

  return NextResponse.json({ orders, total, page, limit, totalPages: Math.ceil(total / limit) })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { items, total, name, email, phone, address, note, paymentMethod, userId } = body

    if (!items?.length || !name || !email || !phone || !address) {
      return NextResponse.json({ error: "Thiếu thông tin bắt buộc" }, { status: 400 })
    }

    const order = await prisma.order.create({
      data: {
        items: JSON.stringify(items),
        total,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        customerAddress: address,
        note: note || null,
        paymentMethod: paymentMethod || "bank_transfer",
        status: "pending",
        paid: false,
        ...(userId && { userId: parseInt(userId) }),
      },
    })

    // Tạo mã đơn hàng: MT-YYMMDD-XXXX
    const now = new Date()
    const dd = String(now.getDate()).padStart(2, '0')
    const mm = String(now.getMonth() + 1).padStart(2, '0')
    const yy = String(now.getFullYear()).slice(-2)
    const seq = String(order.id).padStart(4, '0')
    const orderCode = `MT-${yy}${mm}${dd}-${seq}`
    const transferContent = `CKMT${yy}${mm}${dd}${seq}`

    await prisma.order.update({
      where: { id: order.id },
      data: { orderCode, transferContent },
    })

    return NextResponse.json({
      order: { ...order, orderCode, transferContent },
      success: true,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { id, status, paid } = body

    const order = await prisma.order.update({
      where: { id },
      data: { ...(status && { status }), ...(paid !== undefined && { paid }) },
    })

    return NextResponse.json({ order, success: true })
  } catch {
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 })
  }
}
