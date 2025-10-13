'use client'

import { useEffect, useState } from "react"
import { orderDummyData } from "@/assets/assets"
import PageTitle from "@/components/base/PageTitle"
import OrderItem from "@/components/base/OrderItem"
import { Order } from "@/types"

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    setOrders(orderDummyData)
  }, [])

  return (
    <div className="min-h-[70vh] mx-6 bg-[#FDFBF7] text-[#5C4033]">
      {orders.length > 0 ? (
        <div className="my-20 max-w-7xl mx-auto">
          <PageTitle
            heading="Đơn hàng của tôi"
            text={`Hiển thị tổng cộng ${orders.length} đơn hàng`}
            linkText="Về trang chủ"
          />

          <div className="overflow-x-auto mt-10">
            <table className="w-full max-w-5xl text-[#5C4033] table-auto border-separate border-spacing-y-8 border-spacing-x-4 mx-auto">
              <thead>
                <tr className="text-left text-[#8B5E3C] font-medium border-b border-[#D2B48C] text-sm sm:text-base">
                  <th className="pb-3">Sản phẩm</th>
                  <th className="text-center pb-3">Tổng tiền</th>
                  <th className="pb-3">Địa chỉ</th>
                  <th className="pb-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <OrderItem order={order} key={order.id} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">
          <h1 className="text-2xl sm:text-4xl font-semibold text-[#8B5E3C]">
            Bạn chưa có đơn hàng nào
          </h1>
          <p className="text-[#A07855] mt-3">
            Hãy khám phá các sản phẩm gỗ tinh xảo tại{" "}
            <span className="font-medium">QuangWoodcraft</span>.
          </p>
        </div>
      )}
    </div>
  )
}
