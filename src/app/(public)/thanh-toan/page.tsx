'use client'

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShoppingBag, CreditCard, Banknote, Check } from "lucide-react"
import { useCartStore } from "@/lib/store"
import { formatPrice } from "@/lib/utils"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotal, getItemCount, clearCart } = useCartStore()
  const [paymentMethod, setPaymentMethod] = useState<'bank_transfer' | 'vnpay'>('bank_transfer')
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', note: '' })
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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

      if (res.ok) {
        setDone(true)
        clearCart()
      } else {
        alert('Có lỗi xảy ra, vui lòng thử lại!')
      }
    } catch {
      alert('Lỗi kết nối!')
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div className="container-page py-20 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Đặt Hàng Thành Công!</h1>
        <p className="text-gray-500 mb-6">Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
        <p className="text-sm text-gray-400 mb-6">
          {paymentMethod === 'bank_transfer'
            ? 'Vui lòng chuyển khoản theo thông tin trong email xác nhận.'
            : ''}
        </p>
        <Link
          href="/"
          className="inline-flex px-6 py-3 bg-[#b8860b] text-white text-sm font-medium rounded-lg hover:bg-[#a07608] transition-colors"
        >
          Tiếp Tục Mua Sắm
        </Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container-page py-20 text-center text-gray-400">
        <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-50" />
        <p className="text-lg mb-4">Giỏ hàng trống</p>
        <Link href="/" className="text-[#b8860b] hover:underline">Quay lại mua sắm</Link>
      </div>
    )
  }

  return (
    <div className="container-page py-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#0f172a] mb-8">Thanh Toán</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border border-[#e2e8f0] rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Thông Tin Giao Hàng</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-1.5">Họ và tên *</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#b8860b]/20 focus:border-[#b8860b]"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#b8860b]/20 focus:border-[#b8860b]"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Số điện thoại *</label>
                  <input
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#b8860b]/20 focus:border-[#b8860b]"
                    placeholder="090 123 4567"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-1.5">Địa chỉ *</label>
                  <input
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#b8860b]/20 focus:border-[#b8860b]"
                    placeholder="Số nhà, đường, phường, quận, thành phố"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium mb-1.5">Ghi chú</label>
                  <textarea
                    value={form.note}
                    onChange={(e) => setForm({ ...form, note: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#b8860b]/20 focus:border-[#b8860b] resize-none"
                    rows={3}
                    placeholder="Ghi chú cho đơn hàng..."
                  />
                </div>
              </div>
            </div>

            <div className="border border-[#e2e8f0] rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Phương Thức Thanh Toán</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 border border-[#e2e8f0] rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'bank_transfer'}
                    onChange={() => setPaymentMethod('bank_transfer')}
                    className="accent-[#b8860b]"
                  />
                  <Banknote className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium">Chuyển Khoản Ngân Hàng</p>
                    <p className="text-xs text-gray-400">VietinBank 108865812222 - Mật Tông</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 border border-[#e2e8f0] rounded-lg cursor-pointer hover:bg-gray-50 transition-colors opacity-60">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'vnpay'}
                    onChange={() => setPaymentMethod('vnpay')}
                    className="accent-[#b8860b]"
                    disabled
                  />
                  <CreditCard className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium">VNPay (Sắp ra mắt)</p>
                    <p className="text-xs text-gray-400">Thanh toán qua thẻ ATM, Visa/Mastercard</p>
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
          <div className="border border-[#e2e8f0] rounded-lg p-6 sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Đơn Hàng ({getItemCount()} sản phẩm)</h2>
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-50 rounded-md overflow-hidden flex-shrink-0">
                    <img src={item.image || '/placeholder.svg'} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs line-clamp-1">{item.name}</p>
                    <p className="text-xs text-gray-400">x{item.quantity}</p>
                  </div>
                  <p className="text-xs font-medium">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-[#e2e8f0] pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Tạm tính</span>
                <span>{formatPrice(getTotal())}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Vận chuyển</span>
                <span className="text-green-600">Miễn phí</span>
              </div>
              <div className="border-t border-[#e2e8f0] pt-2 flex justify-between font-bold text-base">
                <span>Tổng cộng</span>
                <span className="text-[#b8860b]">{formatPrice(getTotal())}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
