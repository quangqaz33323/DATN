'use client'
import { PlusIcon, SquarePenIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import AddressModal from './AddressModal'
import { useAddressStore } from '@/zustand/useAddressStore'
import { useRouter } from '@/i18n/routing'

interface OrderSummaryProps {
  totalPrice: number
  items: any[]
}

const OrderSummary = ({ totalPrice, items }: OrderSummaryProps) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '₫'
  const router = useRouter()

  const { list: addressList } = useAddressStore()
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'STRIPE'>('COD')
  const [selectedAddress, setSelectedAddress] = useState<any>(null)
  const [showAddressModal, setShowAddressModal] = useState(false)
  const [couponCodeInput, setCouponCodeInput] = useState('')
  const [coupon, setCoupon] = useState<any>(null)

  const handleCouponCode = async (event: React.FormEvent) => {
    event.preventDefault()

    if (couponCodeInput.trim().toLowerCase() === 'quangwood') {
      setCoupon({
        code: 'quangwood',
        discount: 10,
        description: 'Giảm 10% cho khách hàng thân thiết 🎉',
      })
      toast.success('Áp dụng mã giảm giá thành công!')
    } else {
      toast.error('Mã giảm giá không hợp lệ!')
    }
  }

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedAddress) return toast.error('Vui lòng chọn địa chỉ giao hàng')
    router.push('/orders')
  }

  return (
    <div className="w-full max-w-lg lg:max-w-[360px] bg-[#fdfaf5] border border-[#d9c7a0] text-[#3f2e1d] text-sm rounded-2xl shadow-sm p-7">

      <h2 className="text-2xl font-semibold text-[#5c3d28]">Tóm tắt đơn hàng</h2>


      <p className="text-[#a17c5b] text-xs mt-4 mb-2 font-medium">Phương thức thanh toán</p>
      <div className="space-y-2">
        <label className="flex gap-2 items-center cursor-pointer">
          <input
            type="radio"
            id="COD"
            onChange={() => setPaymentMethod('COD')}
            checked={paymentMethod === 'COD'}
            className="accent-[#5c3d28]"
          />
          <span>Thanh toán khi nhận hàng (COD)</span>
        </label>
        <label className="flex gap-2 items-center cursor-pointer">
          <input
            type="radio"
            id="STRIPE"
            name="payment"
            onChange={() => setPaymentMethod('STRIPE')}
            checked={paymentMethod === 'STRIPE'}
            className="accent-[#5c3d28]"
          />
          <span>Thanh toán qua Stripe</span>
        </label>
      </div>

 
      <div className="my-5 py-4 border-y border-[#d9c7a0] text-[#5c3d28]">
        <p className="text-[#a17c5b] text-xs mb-2 font-medium">Địa chỉ giao hàng</p>

        {selectedAddress ? (
          <div className="flex gap-2 items-center justify-between bg-[#f7f2ea] p-3 rounded-lg">
            <p className="text-sm">
              {selectedAddress.name}, {selectedAddress.city}, {selectedAddress.state}, {selectedAddress.zip}
            </p>
            <SquarePenIcon
              onClick={() => setSelectedAddress(null)}
              className="cursor-pointer hover:text-[#a17c5b]"
              size={18}
            />
          </div>
        ) : (
          <div>
            {addressList.length > 0 && (
              <select
                className="border border-[#d9c7a0] bg-[#fffaf3] p-2 w-full my-3 rounded-lg outline-none focus:ring-2 focus:ring-[#b68a63]"
                onChange={(e) => setSelectedAddress(addressList[Number(e.target.value)])}
              >
                <option value="">-- Chọn địa chỉ --</option>
                {addressList.map((address, index) => (
                  <option key={index} value={index}>
                    {address.name}, {address.city}
                  </option>
                ))}
              </select>
            )}

            <button
              onClick={() => setShowAddressModal(true)}
              className="flex items-center gap-1 text-[#7b5537] mt-2 hover:text-[#5c3d28] transition-all"
            >
              <PlusIcon size={18} /> Thêm địa chỉ mới
            </button>
          </div>
        )}
      </div>


      <div className="pb-4 border-b border-[#d9c7a0]">
        <div className="flex justify-between text-[#5c3d28]">
          <div className="flex flex-col gap-1 text-[#a17c5b]">
            <p>Tạm tính:</p>
            <p>Phí vận chuyển:</p>
            {coupon && <p>Giảm giá:</p>}
          </div>
          <div className="flex flex-col gap-1 font-medium text-right">
            <p>{currency}{totalPrice.toLocaleString()}</p>
            <p>Miễn phí</p>
            {coupon && (
              <p className="text-green-600">
                -{currency}{(coupon.discount / 100 * totalPrice).toFixed(2)}
              </p>
            )}
          </div>
        </div>

  
        {!coupon ? (
          <form
            onSubmit={(e) => toast.promise(handleCouponCode(e), { loading: 'Đang kiểm tra mã...' })}
            className="flex justify-center gap-3 mt-3"
          >
            <input
              onChange={(e) => setCouponCodeInput(e.target.value)}
              value={couponCodeInput}
              type="text"
              placeholder="Nhập mã giảm giá"
              className="border border-[#d9c7a0] bg-[#fffaf3] p-2 rounded-lg w-full outline-none focus:ring-2 focus:ring-[#b68a63]"
            />
            <button
              type="submit"
              className="bg-[#7b5537] text-white px-4 rounded-lg hover:bg-[#5c3d28] active:scale-95 transition-all"
            >
              Áp dụng
            </button>
          </form>
        ) : (
          <div className="flex items-center justify-between mt-3 text-xs bg-[#f7f2ea] p-2 rounded-lg">
            <p>
              Mã: <span className="font-semibold ml-1">{coupon.code.toUpperCase()}</span>
            </p>
            <p>{coupon.description}</p>
            <XIcon
              size={18}
              onClick={() => setCoupon(null)}
              className="cursor-pointer hover:text-red-700 transition"
            />
          </div>
        )}
      </div>


      <div className="flex justify-between py-4 text-lg font-semibold text-[#3f2e1d]">
        <p>Tổng cộng:</p>
        <p>
          {currency}
          {coupon
            ? (totalPrice - (coupon.discount / 100) * totalPrice).toLocaleString()
            : totalPrice.toLocaleString()}
        </p>
      </div>

      <button
        onClick={(e) => toast.promise(handlePlaceOrder(e), { loading: 'Đang đặt hàng...' })}
        className="w-full bg-[#7b5537] text-white py-3 rounded-xl hover:bg-[#5c3d28] active:scale-95 transition-all text-base"
      >
        Đặt hàng ngay
      </button>

      {showAddressModal && <AddressModal setShowAddressModal={setShowAddressModal} />}
    </div>
  )
}

export default OrderSummary
