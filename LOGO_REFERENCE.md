# Logo Reference

## Logo URL
```
https://res.cloudinary.com/zgl5avbd/image/upload/v1783574851/mat-tong/logo.png
```

## CSS Classes (trong `globals.css`)
| Class | Mục đích |
|---|---|
| `.logo-gold` | Filter màu vàng đồng (brightness + sepia + saturate) |
| `.logo-shimmer` | Wrapper div — hiệu ứng lấp lánh quét ngang |
| `.logo-glow` | Wrapper div — hiệu ứng phát sáng pulse nhẹ |

## 6 vị trí logo xuất hiện

### 1. Header desktop
**File:** `src/components/layout/Header.tsx` — dòng ~42
**Size:** 48px
```tsx
<Link href="/" className="flex items-center gap-2">
  <div className="logo-shimmer logo-glow">
    <img className="logo-gold" style={{ height: '48px', maxWidth: 'none' }} />
  </div>
</Link>
```

### 2. Header mobile menu (sidebar)
**File:** `src/components/layout/Header.tsx` — dòng ~154
**Size:** 40px
```tsx
<Link href="/" onClick={() => setMenuOpen(false)}>
  <div className="logo-shimmer logo-glow">
    <img className="logo-gold" style={{ height: '40px', maxWidth: 'none' }} />
  </div>
</Link>
```

### 3. Footer
**File:** `src/components/layout/Footer.tsx` — dòng ~37
**Size:** 42px
```tsx
<Link href="/" className="inline-block">
  <div className="logo-shimmer logo-glow">
    <img className="logo-gold" style={{ height: '42px', maxWidth: 'none' }} />
  </div>
</Link>
```

### 4. Admin login page
**File:** `src/app/admin/login/page.tsx` — dòng ~46
**Size:** 48px
```tsx
<Link href="/" className="inline-block mb-2">
  <div className="logo-shimmer logo-glow">
    <img className="logo-gold" style={{ height: '48px', maxWidth: 'none' }} />
  </div>
</Link>
```

### 5. Admin sidebar
**File:** `src/app/admin/layout.tsx` — dòng ~49
**Size:** 32px
```tsx
<Link href="/" className="flex-shrink-0">
  <div className="logo-shimmer logo-glow">
    <img className="logo-gold" style={{ height: '32px', maxWidth: 'none' }} />
  </div>
</Link>
```

### 6. Admin mobile top bar
**File:** `src/app/admin/layout.tsx` — dòng ~117
**Size:** 24px
```tsx
<div className="logo-shimmer logo-glow">
  <img className="logo-gold" style={{ height: '24px', maxWidth: 'none' }} />
</div>
```

## Khi sửa logo
1. Đổi URL ảnh ở cả **6 vị trí** trên
2. Nếu cần chỉnh hiệu ứng, sửa class trong `globals.css`
3. Chạy `npx next build` kiểm tra lỗi
4. Push lên GitHub → Vercel auto-deploy
