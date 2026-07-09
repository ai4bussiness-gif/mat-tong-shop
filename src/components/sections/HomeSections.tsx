'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import type { Product, Category } from "@/types"
import { CollectionSection } from "./CollectionSection"
import { categories, COLLECTION_NAMES } from "@/lib/constants"

export function HomeSections({ products }: { products: Product[] }) {
  // Group products by category slug
  const byCategory: Record<string, Product[]> = {}

  for (const p of products) {
    const slug = p.category?.slug
    if (slug) {
      if (!byCategory[slug]) byCategory[slug] = []
      byCategory[slug].push(p)
    }
  }

  // Show collection sections for the key categories that match nidhiratna's layout
  const collectionOrder = ['phat', 'bo-tat', 'phat-mau', 'ho-phap', 'dai-su', 'than-tai']

  return (
    <>
      {collectionOrder.map((slug) => {
        const items = byCategory[slug] || []
        const catName = COLLECTION_NAMES[slug] || slug
        return (
          <CollectionSection
            key={slug}
            title={`Bộ Sưu Tập ${catName}`}
            viewAllHref={`/danh-muc/${slug}`}
            products={items}
          />
        )
      })}
    </>
  )
}
