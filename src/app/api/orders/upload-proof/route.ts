import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

function getCloudinarySignature(params: Record<string, string>, apiSecret: string): string {
  // Sort params by key, join as key=value&key=value, append api_secret, then SHA1
  const sorted = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&")
  const toSign = sorted + apiSecret

  // Use Web Crypto API for SHA1 (works in Edge Runtime too)
  const encoder = new TextEncoder()
  return crypto.subtle
    .digest("SHA-1", encoder.encode(toSign))
    .then((buf) => Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join(""))
}

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

    // Upload lên Cloudinary qua signed upload
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "zgl5avbd"
    const apiKey = process.env.CLOUDINARY_API_KEY || "338483815376689"
    const apiSecret = process.env.CLOUDINARY_API_SECRET || "fytK3pHWvMeAwB-e6Vvf-kBSGAE"
    const folder = "mat-tong/payment-proof"
    const publicId = order.orderCode ? `${folder}/order-${order.orderCode}` : `${folder}/order-${order.id}`
    const timestamp = Math.round(Date.now() / 1000)

    // Build params for signature (exclude file, api_key, and signature itself)
    const params: Record<string, string> = {
      folder,
      public_id: publicId,
      timestamp: String(timestamp),
    }

    const signature = await getCloudinarySignature(params, apiSecret)

    // Build form data for upload
    const formData = new FormData()
    formData.append("file", image)
    formData.append("folder", folder)
    formData.append("public_id", publicId)
    formData.append("api_key", apiKey)
    formData.append("timestamp", String(timestamp))
    formData.append("signature", signature)

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    )

    const uploadData = await uploadRes.json()

    if (!uploadRes.ok) {
      console.error("Cloudinary upload error:", JSON.stringify(uploadData))
      return NextResponse.json({ error: uploadData.error?.message || "Lỗi upload ảnh" }, { status: 500 })
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
