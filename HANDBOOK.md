# HANDBOOK — Bàn Giao Dự Án Next.js E‑commerce

> File này dành cho **AI (Hermes / Claude Code)**, không phải cho khách hàng.
> Sau khi nhận `credentials.json` từ khách, làm theo các bước dưới đây.

---

## 1. Tổng quan dự án

| Mục | Giá trị |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| CSS | Tailwind CSS v4 |
| Database | PostgreSQL (Neon) + Prisma ORM |
| Auth Google | Auth.js v5 + @auth/prisma-adapter |
| Admin | JWT (jose) — riêng, không dùng Auth.js |
| State | Zustand (cart) |
| Ảnh | Cloudinary |
| Deploy | Vercel — auto từ GitHub master |
| Domain | Tuỳ client (mặc định `.vercel.app`) |

---

## 2. Nhận credentials từ client

Client sẽ gửi file `credentials.json` có cấu trúc:

```json
{
  "site": {
    "name": "Tên Shop",
    "tagline": "Tagline ngắn",
    "description": "Mô tả SEO dài",
    "email": "info@shop.com",
    "phone": "0900 000 000",
    "address": "Địa chỉ",
    "domain": "https://shop.vercel.app",
    "currency": "₫",
    "freeShipping": "Miễn Phí Vận Chuyển...",
    "social": {
      "facebook": "https://facebook.com/...",
      "instagram": "https://instagram.com/...",
      "youtube": "https://youtube.com/@...",
      "tiktok": "https://tiktok.com/@...",
      "pinterest": "https://pinterest.com/..."
    }
  },
  "bank": {
    "bankName": "Vietcombank",
    "accountNumber": "0021000403922",
    "accountHolder": "Hoàng Hà"
  },
  "env": {
    "DATABASE_URL": "postgresql://...",
    "GOOGLE_CLIENT_ID": "...",
    "GOOGLE_CLIENT_SECRET": "...",
    "AUTH_SECRET": "...",
    "AUTH_URL": "https://shop.vercel.app",
    "CLOUDINARY_CLOUD_NAME": "...",
    "CLOUDINARY_API_KEY": "...",
    "CLOUDINARY_API_SECRET": "...",
    "ADMIN_EMAIL": "admin@shop.com",
    "ADMIN_PASSWORD": "...",
    "JWT_SECRET": "..."
  },
  "media": {
    "logoUrl": "https://res.cloudinary.com/.../logo.png",
    "faviconUrl": "https://res.cloudinary.com/.../favicon.png",
    "heroBannerUrl": "https://res.cloudinary.com/.../hero.jpg",
    "videoUrl": "https://res.cloudinary.com/.../promo.mp4",
    "videoPosterUrl": "https://res.cloudinary.com/.../poster.jpg"
  }
}
```

---

## 3. Thứ tự thực hiện

### Bước 1 — Tạo file `.env.local`

```env
DATABASE_URL={env.DATABASE_URL}
GOOGLE_CLIENT_ID={env.GOOGLE_CLIENT_ID}
GOOGLE_CLIENT_SECRET={env.GOOGLE_CLIENT_SECRET}
AUTH_SECRET={env.AUTH_SECRET}
AUTH_URL={env.AUTH_URL}
AUTH_TRUST_HOST=true
CLOUDINARY_CLOUD_NAME={env.CLOUDINARY_CLOUD_NAME}
CLOUDINARY_API_KEY={env.CLOUDINARY_API_KEY}
CLOUDINARY_API_SECRET={env.CLOUDINARY_API_SECRET}
JWT_SECRET={env.JWT_SECRET}
ADMIN_EMAIL={env.ADMIN_EMAIL}
ADMIN_PASSWORD={env.ADMIN_PASSWORD}
```

### Bước 2 — Thay `src/lib/constants.ts`

```diff
- name: 'Mật Tông',
+ name: '{site.name}',

- tagline: '...',
+ tagline: '{site.tagline}',

- description: '...',
+ description: '{site.description}',

- email: 'info@mattongshop.com',
+ email: '{site.email}',

- phone: '0977 693 109',
+ phone: '{site.phone}',

- address: 'Việt Nam',
+ address: '{site.address}',

- freeShipping: 'Miễn Phí Vận Chuyển Toàn Cầu',
+ freeShipping: '{site.freeShipping}',
```

Cập nhật `social.facebook`, `.instagram`, `.youtube`, `.tiktok`, `.pinterest`.

### Bước 3 — Thay Metadata (layout.tsx)

**File:** `src/app/layout.tsx`
- `title:` → tên shop mới
- `description:` → mô tả mới
- `icons.icon` + `icons.apple` → `{media.faviconUrl}`

**File:** `src/app/(public)/layout.tsx`
- `title:` → tên shop mới
- `description:` → mô tả mới

### Bước 4 — Thay Logo URL (6 chỗ)

Tất cả logo đều là URL Cloudinary. Dùng search & replace đồng loạt:

```
old: https://res.cloudinary.com/zgl5avbd/image/upload/v1783574851/mat-tong/logo.png
new: {media.logoUrl}
```

Các file chứa logo:
1. `src/components/layout/Header.tsx` — dòng 50, 219
2. `src/components/layout/Footer.tsx` — dòng 40
3. `src/app/admin/layout.tsx` — dòng 53, 125
4. `src/app/admin/login/page.tsx` — dòng 49

### Bước 5 — Thay Favicon

**File:** `src/app/layout.tsx` — dòng 22-23
```
icon: {media.faviconUrl}
apple: {media.faviconUrl}
```

### Bước 6 — Thay Hero Banner + Video

**File:** `src/components/ui/HeroSlider.tsx` — dòng 9
```
src: {media.heroBannerUrl}
```

**File:** `src/components/sections/VideoSection.tsx` — dòng 13, 16
```
poster: {media.videoPosterUrl}
src: {media.videoUrl}
```

### Bước 7 — Thay Bank Info

**File:** `src/app/(public)/thanh-toan/page.tsx` — dòng 147-150, 373
```
Ngân hàng → {bank.bankName}
Số tài khoản → {bank.accountNumber}
Chủ tài khoản → {bank.accountHolder}
```

### Bước 8 — Thay số điện thoại ChatWidget

**File:** `src/components/ui/ChatWidget.tsx` — dòng 8
```
PHONE_NUMBER = "0977693109" → {site.phone}
```

### Bước 9 — Thay sitemap + robots.txt

**File:** `src/app/sitemap.xml/route.ts` — dòng 4
```
baseUrl = 'https://mat-tong-shop.vercel.app' → '{env.AUTH_URL}'
```

**File:** `src/app/robots.txt/route.ts` — dòng 7
```
Sitemap: https://mat-tong-shop.vercel.app/sitemap.xml → {env.AUTH_URL}/sitemap.xml
```

### Bước 10 — Thay copyright Footer

**File:** `src/components/layout/Footer.tsx` — dòng 126
```
© {new Date().getFullYear()} Mật Tông → © {new Date().getFullYear()} {site.name}
```

### Bước 11 — Reseed database (nếu cần)

```bash
npx prisma db push --accept-data-loss
npx tsx prisma/seed.ts
```

Seed data mẫu sẽ tạo 48 products + 6 categories. Nếu client có ảnh riêng, cần:
1. Upload ảnh lên Cloudinary client
2. Cập nhật `prisma/seed.ts` với URL mới
3. Reseed

> **Lưu ý:** Nếu client KHÔNG mua kèm data ảnh, seed mặc định vẫn dùng ảnh từ Cloudinary cũ (zgl5avbd). Cần báo client tự upload ảnh sản phẩm và cập nhật seed.

### Bước 12 — Push lên GitHub + Vercel deploy

```bash
git add -A
git commit -m "chore: init client [Tên Khách Hàng]"
git push origin master
```

Sau đó lên Vercel dashboard → Project → Settings → Environment Variables, set toàn bộ env vars từ credentials.json (trùng với .env.local).

**Hoặc** dùng Vercel CLI (nếu có token):
```bash
vercel env add DATABASE_URL
vercel env add GOOGLE_CLIENT_ID
# ... thêm từng biến
vercel deploy --prod
```

### Bước 13 — Kiểm tra

- [ ] Trang chủ load ảnh + nội dung mới
- [ ] Google login hoạt động (thử với email test)
- [ ] Admin login được
- [ ] Thanh toán hiện đúng bank info
- [ ] Sitemap / robots.txt trỏ đúng domain
- [ ] Favicon hiển thị

---

## 4. Lưu ý quan trọng

| Vấn đề | Xử lý |
|---|---|
| **Google OAuth callback** | Client phải tự thêm redirect URI trong Google Cloud Console. Hermes không thể auto làm qua API. |
| **Cloudinary upload ảnh sản phẩm (48 ảnh)** | Ảnh seed mặc định là của shop cũ. Nếu client muốn ảnh mới: upload lên Cloudinary client → cập nhật URL trong seed → reseed. |
| **Domain thật** | Client mua domain → trỏ CNAME về `cname.vercel-dns.com` → cập nhật AUTH_URL. |
| **Google Search Console** | Client verify domain → submit sitemap. |
| **AUTH_TRUST_HOST** | Luôn set `true` trên Vercel. |
| **Client secret Google** | Google chỉ hiển thị secret 1 lần khi tạo. Yêu cầu client lưu ngay. |

---

## 5. Tài liệu tham khảo

- `PROJECT_REFERENCE.md` — cấu trúc dự án, change log
- `CLAUDE.md` — convention code
- `prisma/schema.prisma` — schema database
- `src/lib/constants.ts` — toàn bộ config shop
