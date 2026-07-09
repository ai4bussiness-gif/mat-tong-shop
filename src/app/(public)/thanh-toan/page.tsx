'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShoppingBag, CreditCard, Banknote, Check, Copy, Upload, ImageUp, Loader, LogIn, User } from "lucide-react"
import { useSession, signIn, signOut } from "next-auth/react"
import { useCartStore } from "@/lib/store"
import { formatPrice } from "@/lib/utils"

export default function CheckoutPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { items, getTotal, getItemCount, clearCart } = useCartStore()
  const [paymentMethod, setPaymentMethod] = useState<'bank_transfer' | 'vnpay'>('bank_transfer')
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', note: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [orderId, setOrderId] = useState<number | null>(null)
  const [orderCode, setOrderCode] = useState<string | null>(null)
  const [transferContent, setTransferContent] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [proofImg, setProofImg] = useState<string | null>(null)

  // Auto-fill from Google session
  useEffect(() => {
    if (session?.user) {
      setForm((prev) => ({
        ...prev,
        name: session.user?.name || prev.name,
        email: session.user?.email || prev.email,
      }))
    }
  }, [session])

  const handleUploadProof = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !orderId) return
    setUploading(true)
    try {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = async () => {
        const base64 = reader.result
        const res = await fetch('/api/orders/upload-proof', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId, image: base64 }),
        })
        const data = await res.json()
        if (res.ok && data.url) {
          setProofImg(data.url)
        } else {
          alert(data.error || 'Upload thất bại')
        }
        setUploading(false)
      }
      reader.onerror = () => {
        alert('Không thể đọc file')
        setUploading(false)
      }
    } catch {
      alert('Lỗi upload')
      setUploading(false)
    }
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = 'Vui lòng nhập họ tên'
    if (!form.email.trim()) errs.email = 'Vui lòng nhập email'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Email không hợp lệ'
    if (!form.phone.trim()) errs.phone = 'Vui lòng nhập số điện thoại'
    else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(form.phone)) errs.phone = 'Số điện thoại không hợp lệ'
    if (!form.address.trim()) errs.address = 'Vui lòng nhập địa chỉ'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    if (items.length === 0) return
    setSubmitting(true)

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          total: getTotal(),
          ...form,
          paymentMethod,
          userId: (session?.user as any)?.id ? parseInt((session?.user as any).id) : undefined,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setOrderId(data.order?.id || null)
        setOrderCode(data.order?.orderCode || null)
        setTransferContent(data.order?.transferContent || null)
        setDone(true)
        clearCart()
      } else {
        alert(data.error || 'Có lỗi xảy ra, vui lòng thử lại!')
      }
    } catch {
      alert('Lỗi kết nối!')
    } finally {
      setSubmitting(false)
    }
  }

  const [copied, setCopied] = useState(false)
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (done) {
    return (
      <div className="bg-[#0b1120] min-h-screen">
        <div className="container-page py-20 text-center">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
            <Check className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Đặt Hàng Thành Công!</h1>
          {orderCode && (
            <p className="text-[#b8860b] font-semibold text-lg mb-1">
              Mã đơn hàng: <span className="text-white">{orderCode}</span>
            </p>
          )}
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Chúng tôi sẽ liên hệ với bạn qua số điện thoại hoặc email trong thời gian sớm nhất.
          </p>
          {paymentMethod === 'bank_transfer' && (
            <>
            <div className="max-w-md mx-auto bg-[#0f172a] border border-gray-800 rounded-xl p-5 mb-6 text-left">
              <h3 className="text-white font-semibold text-sm mb-3">Thông tin chuyển khoản:</h3>
              <div className="space-y-2 text-sm">
                {[
                  { label: 'Ngân hàng', value: 'Vietcombank' },
                  { label: 'Số tài khoản', value: '0021000403922' },
                  { label: 'Chủ tài khoản', value: 'Hoàng Hà' },
                  { label: 'Nội dung CK', value: transferContent || (orderId ? `CKMT${orderId}` : 'Tượng Mật Tông') },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-gray-800 last:border-0">
                    <span className="text-gray-400">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{item.value}</span>
                      <button
                        onClick={() => handleCopy(item.value)}
                        className="p-1 text-gray-500 hover:text-[#b8860b] transition-colors"
                        title="Copy"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {copied && <p className="text-xs text-green-400 mt-2">✓ Đã copy!</p>}
            </div>

            <div className="max-w-md mx-auto bg-[#0f172a] border border-gray-800 rounded-xl p-5 mb-6 text-left">
              <h3 className="text-white font-semibold text-sm mb-3">Xác nhận thanh toán:</h3>
              <p className="text-xs text-gray-400 mb-3">
                Sau khi chuyển khoản, vui lòng gửi ảnh chụp màn hình giao dịch để chúng tôi xác nhận đơn hàng nhanh hơn.
              </p>
              {proofImg ? (
                <div className="space-y-3">
                  <img src={proofImg} alt="Ảnh xác nhận" className="w-full rounded-lg border border-gray-700" />
                  <p className="text-xs text-green-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Đã gửi ảnh xác nhận!
                  </p>
                </div>
              ) : uploading ? (
                <div className="flex items-center gap-2 text-sm text-gray-400 py-3">
                  <Loader className="w-4 h-4 animate-spin" /> Đang tải lên...
                </div>
              ) : (
                <label className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-700 rounded-xl cursor-pointer hover:border-[#b8860b]/40 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleUploadProof}
                  />
                  <ImageUp className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-400">Chọn ảnh chụp chuyển khoản</span>
                </label>
              )}
            </div>
            </>
          )}
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex px-6 py-3 bg-[#b8860b] text-white text-sm font-medium rounded-lg hover:bg-[#a07608] transition-colors"
            >
              Tiếp Tục Mua Sắm
            </Link>
            {session && (
              <Link
                href="/don-hang"
                className="inline-flex px-6 py-3 border border-gray-700 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
              >
                Xem Đơn Hàng
              </Link>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="bg-[#0b1120] min-h-screen">
        <div className="container-page py-20 text-center text-gray-500">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-30" />
          <p className="text-lg mb-4 text-gray-400">Giỏ hàng trống</p>
          <Link href="/" className="text-[#b8860b] hover:underline">Quay lại mua sắm</Link>
        </div>
      </div>
    )
  }

  const fieldClass = (field: string) =>
    `w-full bg-[#1a2236] border ${errors[field] ? 'border-red-500/50' : 'border-gray-700'} rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#b8860b] transition-colors placeholder-gray-500`

  return (
    <div className="bg-[#0b1120] min-h-screen">
      <div className="container-page py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-8">Thanh Toán</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {/* Google Login Banner */}
            {status === "loading" ? (
              <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-4 mb-4">
                <div className="animate-pulse flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-700 rounded-full" />
                  <div className="h-4 w-40 bg-gray-700 rounded" />
                </div>
              </div>
            ) : session?.user ? (
              <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-4 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt=""
                      className="w-10 h-10 rounded-full border border-gray-700"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <p className="text-white text-sm font-medium">{session.user.name}</p>
                    <p className="text-gray-500 text-xs">{session.user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => signOut()}
                  className="text-xs text-gray-500 hover:text-red-400 transition-colors"
                >
                  Thoát
                </button>
              </div>
            ) : (
              <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-400 mb-3">Đăng nhập để điền thông tin nhanh hơn:</p>
                <button
                  onClick={() => signIn("google")}
                  className="flex items-center justify-center gap-2 w-full bg-white hover:bg-gray-100 text-gray-800 text-sm font-medium py-2.5 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Đăng nhập bằng Google</span>
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Thông Tin Giao Hàng</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm text-gray-400 mb-1.5">Họ và tên *</label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: '' }) }}
                      className={fieldClass('name')}
                      placeholder="Nguyễn Văn A"
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: '' }) }}
                      className={fieldClass('email')}
                      placeholder="email@example.com"
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Số điện thoại *</label>
                    <input
                      required
                      value={form.phone}
                      onChange={(e) => { setForm({ ...form, phone: e.target.value }); setErrors({ ...errors, phone: '' }) }}
                      className={fieldClass('phone')}
                      placeholder="090 123 4567"
                    />
                    {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm text-gray-400 mb-1.5">Địa chỉ *</label>
                    <input
                      required
                      value={form.address}
                      onChange={(e) => { setForm({ ...form, address: e.target.value }); setErrors({ ...errors, address: '' }) }}
                      className={fieldClass('address')}
                      placeholder="Số nhà, đường, phường, quận, thành phố"
                    />
                    {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm text-gray-400 mb-1.5">Ghi chú</label>
                    <textarea
                      value={form.note}
                      onChange={(e) => setForm({ ...form, note: e.target.value })}
                      className="w-full bg-[#1a2236] border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#b8860b] transition-colors resize-none placeholder-gray-500"
                      rows={3}
                      placeholder="Ghi chú cho đơn hàng..."
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Phương Thức Thanh Toán</h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 bg-[#1a2236] border border-gray-700 rounded-xl cursor-pointer hover:border-[#b8860b]/30 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'bank_transfer'}
                      onChange={() => setPaymentMethod('bank_transfer')}
                      className="accent-[#b8860b]"
                    />
                    <Banknote className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-white">Chuyển Khoản Ngân Hàng</p>
                      <p className="text-xs text-gray-500">Vietcombank 0021000403922 - Hoàng Hà</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 bg-[#1a2236] border border-gray-700 rounded-xl cursor-pointer hover:border-[#b8860b]/30 transition-colors opacity-60">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'vnpay'}
                      onChange={() => setPaymentMethod('vnpay')}
                      className="accent-[#b8860b]"
                      disabled
                    />
                    <CreditCard className="w-5 h-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-400">VNPay (Sắp ra mắt)</p>
                      <p className="text-xs text-gray-600">Thanh toán qua thẻ ATM, Visa/Mastercard</p>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-[#b8860b] text-white text-sm font-semibold rounded-lg hover:bg-[#a07608] transition-colors disabled:opacity-50"
              >
                {submitting ? 'Đang xử lý...' : `Xác Nhận Đơn Hàng (${formatPrice(getTotal())})`}
              </button>
            </form>
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-white mb-4">Đơn Hàng ({getItemCount()} sản phẩm)</h2>
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-800 rounded-md overflow-hidden flex-shrink-0">
                      <img src={item.image || '/placeholder.svg'} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-300 line-clamp-1">{item.name}</p>
                      <p className="text-xs text-gray-500">x{item.quantity}</p>
                    </div>
                    <p className="text-xs font-medium text-white">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-800 pt-3 space-y-2 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Tạm tính</span>
                  <span className="text-white">{formatPrice(getTotal())}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Vận chuyển</span>
                  <span className="text-green-400">Miễn phí</span>
                </div>
                <div className="border-t border-gray-800 pt-2 flex justify-between font-bold text-base">
                  <span className="text-white">Tổng cộng</span>
                  <span className="text-[#b8860b]">{formatPrice(getTotal())}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
