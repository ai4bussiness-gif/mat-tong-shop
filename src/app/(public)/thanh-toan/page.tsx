'use client'

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShoppingBag, CreditCard, Banknote, Check, Copy } from "lucide-react"
import { useCartStore } from "@/lib/store"
import { formatPrice } from "@/lib/utils"

export default function CheckoutPage() {
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
            <div className="max-w-md mx-auto bg-[#0f172a] border border-gray-800 rounded-xl p-5 mb-6 text-left">
              <h3 className="text-white font-semibold text-sm mb-3">Thông tin chuyển khoản:</h3>
              <div className="space-y-2 text-sm">
                {[
                  { label: 'Ngân hàng', value: 'Vietcombank' },\n                  { label: 'Số tài khoản', value: '0021000403922' },\n                  { label: 'Chủ tài khoản', value: 'Hoàng Hà' },
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
          )}
          <Link
            href="/"
            className="inline-flex px-6 py-3 bg-[#b8860b] text-white text-sm font-medium rounded-lg hover:bg-[#a07608] transition-colors"
          >
            Tiếp Tục Mua Sắm
          </Link>
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
