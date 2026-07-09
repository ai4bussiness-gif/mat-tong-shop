# Mật Tông Shop — Project Reference 📖

> File này là tài liệu tham chiếu chính thức cho dự án.
> Cập nhật mỗi khi có thay đổi cấu trúc lớn.

---

## 1. Tech Stack

| Công nghệ | Phiên bản | Ghi chú |
|---|---|---|
| Next.js | 16.2.10 | Turbopack, App Router (`src/`) |
| Tailwind CSS | v4 | `@import "tailwindcss"` (không dùng `@tailwind` cũ) |
| Prisma | ~5.22 | ORM, Neon PostgreSQL |
| Zustand | — | Cart state, persist localStorage |
| Auth | JWT | Admin panel |
| Font | Inter | next/font/google, subset vietnamese |
| Deploy | Vercel | Auto-deploy từ GitHub master |

---

## 2. Directory Structure

```
mat-tong-shop/
├── middleware.ts              # Admin guard + Cache-Control headers
├── next.config.ts
├── package.json
├── prisma/
│   ├── schema.prisma          # Category, Product, Order, BlogPost, Contact
│   └── seed.ts                # 6 danh mục, 48 sản phẩm, 3 bài viết (Cloudinary)
└── src/
    ├── app/
    │   ├── layout.tsx         # Root layout (body: bg #030712, text #e2e8f0)
    │   ├── globals.css        # CSS vars, dark theme, @plugin typography
    │   ├── not-found.tsx      # Custom 404
    │   ├── robots.txt
    │   ├── sitemap.xml
    │   ├── (public)/          # Route group — public pages
    │   │   ├── layout.tsx     # TopBar + Header + main + Footer + CartDrawer
    │   │   ├── page.tsx       # Trang chủ
    │   │   ├── blog/
    │   │   ├── danh-muc/
    │   │   ├── don-hang/
    │   │   ├── gio-hang/
    │   │   ├── lien-he/
    │   │   ├── san-pham/
    │   │   ├── thanh-toan/
    │   │   └── tim-kiem/
    │   ├── admin/             # Admin panel (JWT protected)
    │   └── api/               # API routes
    ├── components/
    │   ├── layout/            # Header, Footer, TopBar, CartDrawer
    │   ├── sections/          # TestimonialSection, VideoSection, CollectionSection
    │   └── ui/                # ProductCard, ProductGrid, HeroSlider, ShareButton, Carousel
    └── lib/                   # store.ts, db.ts, auth.ts, constants.ts, utils.ts
```

---

## 3. Routes

| Route | File | Type |
|---|---|---|
| `/` | `src/app/(public)/page.tsx` | Server (async) |
| `/gio-hang` | `src/app/(public)/gio-hang/page.tsx` | Client |
| `/thanh-toan` | `src/app/(public)/thanh-toan/page.tsx` | Client |
| `/tim-kiem` | `src/app/(public)/tim-kiem/page.tsx` | Client |
| `/danh-muc/[slug]` | `src/app/(public)/danh-muc/[slug]/page.tsx` | Server |
| `/san-pham/[slug]` | `src/app/(public)/san-pham/[slug]/page.tsx` | Client |
| `/blog` | `src/app/(public)/blog/page.tsx` | Server |
| `/blog/[slug]` | `src/app/(public)/blog/[slug]/page.tsx` | Server (async) |
| `/lien-he` | `src/app/(public)/lien-he/page.tsx` | — |
| `/admin/*` | `src/app/admin/*` | Client + middleware guard |

---

## 4. Color Scheme

| Token | Value | Usage |
|---|---|---|
| Body bg | `#030712` | Nền chính (gần đen) |
| Card bg | `#0a0f1e` | Card, section (tối hơn body 1 chút) |
| Card border | `#1e293b` | Viền card |
| **Accent** | **`#b8860b`** | Nút, link, highlight (vàng đồng) |
| Accent hover | `#d4a017` | Hover nút |
| Text primary | `#e2e8f0` | Văn bản chính (gần trắng) |
| Text muted | `#94a3b8` | Văn bản phụ |
| Text dim | `#6b7280` | Ít quan trọng nhất |
| Header bg | `#0b1120` | Header + footer |

---

## 5. Database Models

**Category:** id, name, slug, image, createdAt
**Product:** id, name, slug, description, price, images (JSON string[]), dimensions, weight, material, vendor, inStock, featured, categoryId, createdAt
**Order:** id, items (JSON), total, name, email, phone, address, note, paymentMethod, status, createdAt
**BlogPost:** id, title, slug, content (HTML), excerpt, image, published, publishedAt, createdAt
**Contact:** id, name, email, phone, message, createdAt

---

## 6. Key Components & Their Behavior

### Cart
- **Header button:** `router.push('/gio-hang')` — navigate trực tiếp (reliable mobile)
- **Product detail:** "Thêm Vào Giỏ" → Zustand addItem + dispatch `'open-cart'` → CartDrawer mở
- **CartDrawer:** Slide-out từ phải, có "Xem Giỏ Hàng" → `/gio-hang` và "Thanh Toán" → `/thanh-toan`

### ShareButton
- **Mobile** (Web Share API): `navigator.share()` → native share sheet
- **Desktop** (fallback): `navigator.clipboard.writeText()` → toast "Đã copy!"
- Dùng ở: trang sản phẩm + trang blog

### TestimonialSection
- 18 reviews, masonry layout (columns-1/2/3)
- Responsive load: mobile 4, desktop 8
- "Xem thêm" → hiện tất cả
- Individual "Xem thêm" cho review dài

### Admin
- JWT auth, middleware bảo vệ `/admin/*`
- Dashboard: thống kê đơn hàng
- CRUD: sản phẩm, danh mục, bài viết
- Quản lý đơn hàng: xem + update status

---

## 7. Change Log

| Date | Change | Files Affected |
|---|---|---|
| — | Dark theme Cart/Checkout/Search | `gio-hang/page.tsx`, `thanh-toan/page.tsx`, `tim-kiem/page.tsx` |
| — | Sitemap + robots.txt | `src/app/sitemap.xml`, `src/app/robots.txt` |
| — | Custom 404 | `src/app/not-found.tsx` |
| — | Mã đơn hàng + copy bank info | `thanh-toan/page.tsx` |
| — | Checkout validation | `thanh-toan/page.tsx` |
| — | Loading skeleton | `tim-kiem/page.tsx`, `ProductGrid.tsx` |
| — | Social links thật | `constants.ts` |
| — | Cache-Control headers | `middleware.ts` |
| — | Cart button fix (router.push) | `Header.tsx` |
| — | Cart drawer dark theme | `CartDrawer.tsx` |
| — | Root layout dark bg | `layout.tsx`, `globals.css` |
| — | Remove newsletter | `(public)/page.tsx` |
| — | Remove related products | `blog/[slug]/page.tsx` |
| — | Testimonial 18 items + load-more | `TestimonialSection.tsx` |
| — | Footer features bar | `Footer.tsx` |
| — | ShareButton Web Share API | `ShareButton.tsx`, `san-pham/[slug]/page.tsx` |
| — | Increase contrast (bg #030712) | `layout.tsx`, `globals.css` |
| — | Add 6 testimonials (total 18) | `TestimonialSection.tsx` |
| 2026-07-09 | Thêm 30+ sản phẩm (total 57), 4 categories mới | `prisma/seed.ts` |
| 2026-07-09 | Upload 68 ảnh lên Cloudinary `zgl5avbd` | `scripts/`, `prisma/seed.ts`, `.env` |
| 2026-07-09 | Fix gen_remove — AI xoá nhầm tượng, bỏ transformation | `prisma/seed.ts` |
| 2026-07-09 | Upload hero banner + video poster lên Cloudinary | `HeroSlider.tsx`, `VideoSection.tsx` |
| 2026-07-09 | **Tái cấu trúc danh mục: 13 → 6** — bỏ Thangka, Pháp Khí, Tượng Lớn, Linh Vật; gộp Di Lặc→Phật, Dakini→Phật Mẫu, Guru→Đại Sư; chuyển Garuda→Hộ Pháp | `prisma/seed.ts`, `src/lib/constants.ts`, `src/app/(public)/page.tsx`, `src/app/not-found.tsx`, `src/components/ui/HeroSlider.tsx`, `src/components/sections/HomeSections.tsx` |
| 2026-07-09 | Grid danh mục: 2 hàng × 3 cột desktop, ảnh to hơn `aspect-[4/5]` | `src/app/(public)/page.tsx` |
| 2026-07-09 | Push code + re-seed DB Neon (48 products) | GitHub master |
| 2026-07-09 | Đổi logo text → ảnh logo crop 300×80, height 48px | `src/components/layout/Header.tsx` |
| 2026-07-09 | Thêm favicon từ Cloudinary | `src/app/layout.tsx` |
| 2026-07-09 | Update metadata title + description | `src/app/layout.tsx` |
|| 2026-07-09 | Bỏ "Explore our" + "Collections" khỏi heading section — giữ thuần tên danh mục | `src/app/(public)/page.tsx` |
|| 2026-07-09 | Thêm "Chư" vào heading: "Chư Phật", "Chư Bồ Tát"... tách 2 màu (xám + vàng) | `src/app/(public)/page.tsx` |
|| 2026-07-09 | Việt hóa: Danh Mục, Mới Nhất, Bài Viết; tăng size catalogue (text-4xl) | `src/app/(public)/page.tsx` |
|| 2026-07-09 | Bỏ chữ phụ "Mới Nhất" trùng với heading chính | `src/app/(public)/page.tsx` |
|| 2026-07-09 | Mobile menu: text "MẬT TÔNG" → logo image | `src/components/layout/Header.tsx` |
|---

## 8. Commands

```bash
# Development
npx next dev -p 3001

# Build
npx next build

# Database
npx prisma db push      # Push schema
npx tsx prisma/seed.ts   # Seed data

# Git
git add -A && git commit -m "..." && git push origin master

# Kill stuck node (EADDRINUSE)
taskkill //F //IM node.exe
```

---

## 9. Quick Reference — "Cần sửa X thì vào đâu?"

| Yêu cầu | File cần sửa |
|---|---|
| Đổi màu sắc chủ đạo | `globals.css` (CSS vars) + `layout.tsx` (body classes) |
| Thêm/xoá section trang chủ | `src/app/(public)/page.tsx` |
| Sửa menu header | `src/components/layout/Header.tsx` |
| Sửa footer | `src/components/layout/Footer.tsx` |
| Sửa nút giỏ hàng header | `Header.tsx` (dòng 96-107) |
| Sửa cart page | `gio-hang/page.tsx` |
| Sửa checkout | `thanh-toan/page.tsx` |
| Sửa product detail | `san-pham/[slug]/page.tsx` |
| Sửa blog list | `blog/page.tsx` |
| Sửa blog content | `blog/[slug]/page.tsx` |
| Sửa testimonial | `TestimonialSection.tsx` |
| Sửa share button | `ShareButton.tsx` |
| Sửa product card | `ProductCard.tsx` |
| Sửa cart drawer | `CartDrawer.tsx` |
| Sửa admin | `src/app/admin/*` |
| Sửa database schema | `prisma/schema.prisma` |
| Sửa seed data | `prisma/seed.ts` |
| Sửa API | `src/app/api/*` |
| Thêm page mới | Tạo `src/app/(public)/<tên>/page.tsx` |
