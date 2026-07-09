import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const { orderId, image } = await req.json()

    if (!orderId || !image) {
      return NextResponse.json({ error: "Thiếu mã đơn hàng hoặc ảnh" }, { status: 400 })
    }

    // Xác thực đơn hàng tồn tại
    const order = await prisma.order.findUnique({ where: { id: orderId } })
    if (!order) {
      return NextResponse.json({ error: "Không tìm thấy đơn hàng" }, { status: 404 })
    }

    // Upload lên Cloudinary
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "zgl5avbd"
    const apiKey = process.env.CLOUDINARY_API_KEY || "338483815376689"
    const apiSecret = process.env.CLOUDINARY_API_SECRET || "fytK3pHWvMeAwB-e6Vvf-kBSGAE"

    const formData = new FormData()
    formData.append("file", image)
    formData.append("upload_preset", "ml_default")
    formData.append("public_id", `payment-proof/${order.orderCode || `order-${order.id}`}`)
    formData.append("folder", "mat-tong/payment-proof")

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    )

    const uploadData = await uploadRes.json()

    if (!uploadRes.ok) {
      console.error("Cloudinary upload error:", uploadData)
      return NextResponse.json({ error: "Lỗi upload ảnh" }, { status: 500 })
    }

    const imageUrl = uploadData.secure_url

    // Lưu URL vào order
    await prisma.order.update({
      where: { id: orderId },
      data: { paymentProof: imageUrl },
    })

    return NextResponse.json({ url: imageUrl, success: true })
  } catch (error) {
    console.error("Upload proof error:", error)
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 })
  }
}
