"use client";
import { PlusIcon, SquarePenIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import AddressModal from "./AddressModal";
import { useAddressStore } from "@/zustand/useAddressStore";
import { useRouter } from "@/i18n/routing";
import { Protect, useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";

interface OrderSummaryProps {
  totalPrice: number;
  items: any[];
}

const OrderSummary = ({ totalPrice, items }: OrderSummaryProps) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "₫";
  const router = useRouter();

  const { list: addressList } = useAddressStore();
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "STRIPE">("COD");
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [couponCodeInput, setCouponCodeInput] = useState("");
  const [coupon, setCoupon] = useState<any>(null);

  const handleCouponCode = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (!user) {
        return toast.error("Vui lòng đăng nhập để sử dụng mã giảm giá");
      }

      const token = await getToken();
      const { data } = await axios.post(
        "/api/coupon",
        {
          code: couponCodeInput,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCoupon(data.coupon);
      toast.success("Coupon applied successfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.error || error?.message || "Coupon not found");
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAddress) return toast.error("Vui lòng chọn địa chỉ giao hàng");
    router.push("/orders");
  };

  return (
    <div className="w-full max-w-lg rounded-sm border border-[#d9c7a0] bg-[#fdfaf5] p-5 text-sm text-[#3f2e1d] shadow-sm lg:max-w-[360px]">
      <h2 className="text-xl font-semibold text-[#5c3d28]">Tóm tắt đơn hàng</h2>

      <p className="mt-3 mb-1 text-xs font-medium text-[#a17c5b]">Phương thức thanh toán</p>
      <div className="space-y-2">
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="radio"
            id="COD"
            onChange={() => setPaymentMethod("COD")}
            checked={paymentMethod === "COD"}
            className="h-3 w-3 accent-[#5c3d28]"
          />
          <span>Thanh toán khi nhận hàng (COD)</span>
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input
            type="radio"
            id="STRIPE"
            name="payment"
            onChange={() => setPaymentMethod("STRIPE")}
            checked={paymentMethod === "STRIPE"}
            className="h-3 w-3 accent-[#5c3d28]"
          />
          <span>Thanh toán qua Stripe</span>
        </label>
      </div>

      <div className="my-4 border-y border-[#d9c7a0] py-3 text-[#5c3d28]">
        <p className="mb-2 text-xs font-medium text-[#a17c5b]">Địa chỉ giao hàng</p>

        {selectedAddress ? (
          <div className="flex items-center justify-between gap-2 rounded-sm bg-[#f7f2ea] p-2">
            <p className="text-sm">
              {selectedAddress.name}, {selectedAddress.city}, {selectedAddress.state},{" "}
              {selectedAddress.zip}
            </p>
            <SquarePenIcon
              onClick={() => setSelectedAddress(null)}
              className="cursor-pointer hover:text-[#a17c5b]"
              size={16}
            />
          </div>
        ) : (
          <div>
            {addressList.length > 0 && (
              <select
                className="my-2 w-full rounded-sm border border-[#d9c7a0] bg-[#fffaf3] p-2 text-sm outline-none focus:ring-1 focus:ring-[#b68a63]"
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
              className="mt-2 flex items-center gap-1 text-sm text-[#7b5537] transition-all hover:text-[#5c3d28]"
            >
              <PlusIcon size={16} /> Thêm địa chỉ mới
            </button>
          </div>
        )}
      </div>

      <div className="border-b border-[#d9c7a0] pb-3">
        <div className="flex justify-between text-sm text-[#5c3d28]">
          <div className="flex flex-col gap-1 text-[#a17c5b]">
            <p>Tạm tính:</p>
            <p>Phí vận chuyển:</p>
            {coupon && <p>Giảm giá:</p>}
          </div>
          <div className="flex flex-col gap-1 text-right text-sm font-medium">
            <p>
              {totalPrice.toLocaleString()} {currency}
            </p>
            <p>
              <Protect plan={"plus"} fallback={`100000 ${currency}`}>
                Miễn phí
              </Protect>
            </p>
            {coupon && (
              <p className="text-green-600">
                -{((coupon.discount / 100) * totalPrice).toFixed(2)} {currency}
              </p>
            )}
          </div>
        </div>

        {!coupon ? (
          <form
            onSubmit={(e) => toast.promise(handleCouponCode(e), { loading: "Đang kiểm tra mã..." })}
            className="mt-3 flex gap-2"
          >
            <input
              onChange={(e) => setCouponCodeInput(e.target.value)}
              value={couponCodeInput}
              type="text"
              placeholder="Nhập mã giảm giá"
              className="w-full rounded-sm border border-[#d9c7a0] bg-[#fffaf3] p-2 text-sm outline-none focus:ring-1 focus:ring-[#b68a63]"
            />
            <button
              type="submit"
              className="rounded-sm bg-[#7b5537] px-3 text-sm text-nowrap text-white transition-all hover:bg-[#5c3d28] active:scale-95"
            >
              Áp dụng
            </button>
          </form>
        ) : (
          <div className="mt-3 flex items-center justify-between rounded-sm bg-[#f7f2ea] p-2 text-xs">
            <p>
              Mã: <span className="ml-1 font-semibold">{coupon.code.toUpperCase()}</span>
            </p>
            <p>{coupon.description}</p>
            <XIcon
              size={16}
              onClick={() => setCoupon(null)}
              className="cursor-pointer transition hover:text-red-700"
            />
          </div>
        )}
      </div>

      <div className="flex justify-between py-3 text-lg font-semibold text-[#3f2e1d]">
        <p>Tổng cộng:</p>
        <p>
          <Protect
            plan={"plus"}
            fallback={`${
              coupon
                ? (totalPrice + 100000 - (coupon.discount / 100) * totalPrice).toLocaleString()
                : (totalPrice + 100000).toLocaleString()
            } ${currency}`}
          >
            {coupon
              ? (totalPrice - (coupon.discount / 100) * totalPrice).toLocaleString()
              : totalPrice.toLocaleString()}{" "}
            {currency}
          </Protect>
        </p>
      </div>

      <button
        onClick={(e) => toast.promise(handlePlaceOrder(e), { loading: "Đang đặt hàng..." })}
        className="w-full rounded-sm bg-[#7b5537] py-2 text-sm text-white transition-all hover:bg-[#5c3d28] active:scale-95"
      >
        Đặt hàng ngay
      </button>

      {showAddressModal && <AddressModal setShowAddressModal={setShowAddressModal} />}
    </div>
  );
};

export default OrderSummary;
