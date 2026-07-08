import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get("category")
  const featured = searchParams.get("featured")
  const search = searchParams.get("search")
  const sort = searchParams.get("sort") || "newest"
  const limit = parseInt(searchParams.get("limit") || "50")
  const offset = parseInt(searchParams.get("offset") || "0")

  const where: any = {}

  if (category) {
    where.category = { slug: category }
  }

  if (featured === "true") {
    where.featured = true
  }

  if (search) {
    where.OR = [
      { name: { contains: search } },
      { slug: { contains: search } },
    ]
  }

  let orderBy: any = { createdAt: "desc" }
  if (sort === "price-asc") orderBy = { price: "asc" }
  if (sort === "price-desc") orderBy = { price: "desc" }
  if (sort === "name-asc") orderBy = { name: "asc" }

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true },
      orderBy,
      take: limit,
      skip: offset,
    }),
    prisma.product.count({ where }),
  ])

  return NextResponse.json({ products, total })
}
