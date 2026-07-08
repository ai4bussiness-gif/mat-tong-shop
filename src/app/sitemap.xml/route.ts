import { prisma } from '@/lib/db'

export async function GET() {
  const baseUrl = 'https://mat-tong-shop.vercel.app'

  const [products, categories, posts] = await Promise.all([
    prisma.product.findMany({ select: { slug: true, updatedAt: true } }),
    prisma.category.findMany({ select: { slug: true } }),
    prisma.blogPost.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
  ])

  const staticPages = [
    { loc: '', priority: '1.0', changefreq: 'daily' },
    { loc: '/blog', priority: '0.8', changefreq: 'weekly' },
    { loc: '/gio-hang', priority: '0.5', changefreq: 'monthly' },
    { loc: '/thanh-toan', priority: '0.3', changefreq: 'monthly' },
    { loc: '/tim-kiem', priority: '0.4', changefreq: 'monthly' },
    { loc: '/lien-he', priority: '0.6', changefreq: 'monthly' },
  ]

  const urls = [
    ...staticPages.map(p => ({
      loc: `${baseUrl}${p.loc}`,
      lastmod: new Date().toISOString(),
      priority: p.priority,
      changefreq: p.changefreq as string,
    })),
    ...products.map(p => ({
      loc: `${baseUrl}/san-pham/${p.slug}`,
      lastmod: p.updatedAt.toISOString(),
      priority: '0.9',
      changefreq: 'weekly' as string,
    })),
    ...categories.map(c => ({
      loc: `${baseUrl}/danh-muc/${c.slug}`,
      lastmod: new Date().toISOString(),
      priority: '0.7',
      changefreq: 'weekly' as string,
    })),
    ...posts.map(p => ({
      loc: `${baseUrl}/blog/${p.slug}`,
      lastmod: p.updatedAt.toISOString(),
      priority: '0.8',
      changefreq: 'monthly' as string,
    })),
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
