import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET() {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 50 })
  return NextResponse.json({ orders })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { items, total, name, email, phone, address, note, paymentMethod } = body

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
      },
    })

    return NextResponse.json({ order, success: true })
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
