'use client'

import { dummyAdminDashboardData } from "@/assets/assets"
import Loading from "@/components/base/Loading"
import OrdersAreaChart from "@/components/base/OrdersAreaChart"
import { AdminDashboardData } from "@/types"

import { CircleDollarSignIcon, ShoppingBasketIcon, StoreIcon, TagsIcon } from "lucide-react"
import { useEffect, useState } from "react"

export default function AdminDashboard() {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "₫"

  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState<AdminDashboardData>({
    products: 0,
    revenue: "",
    orders: 0,
    stores: 0,
    allOrders: [],
  })

  const dashboardCardsData = [
    { title: "Sản phẩm", value: dashboardData.products, icon: ShoppingBasketIcon },
    { title: "Doanh thu", value: `${currency}${dashboardData.revenue}`, icon: CircleDollarSignIcon },
    { title: "Đơn hàng", value: dashboardData.orders, icon: TagsIcon },
    { title: "Cửa hàng", value: dashboardData.stores, icon: StoreIcon },
  ]

  const fetchDashboardData = async () => {
    setDashboardData(dummyAdminDashboardData)
    setLoading(false)
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  if (loading) return <Loading />

  return (
    <div className="text-stone-700">
      <h1 className="text-3xl font-semibold text-amber-900">
        Bảng điều khiển <span className="text-stone-500 font-normal">QuangWoodcraft</span>
      </h1>


      <div className="flex flex-wrap gap-6 my-10 mt-6">
        {dashboardCardsData.map((card, index) => (
          <div
            key={index}
            className="flex items-center justify-between flex-1 min-w-[250px] bg-amber-50 border border-amber-100 shadow-sm p-5 rounded-2xl hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col gap-1 text-sm">
              <p className="text-stone-500">{card.title}</p>
              <b className="text-2xl font-semibold text-amber-800">{card.value}</b>
            </div>
            <card.icon
              size={48}
              className="w-11 h-11 p-2.5 text-amber-700 bg-amber-100 rounded-full"
            />
          </div>
        ))}
      </div>

      <div className="bg-white border border-amber-100 rounded-2xl p-10 shadow-sm">
        <h2 className="text-lg font-medium text-stone-600 mb-4">Thống kê doanh thu theo thời gian</h2>
        <OrdersAreaChart allOrders={dashboardData.allOrders} />
      </div>
    </div>
  )
}
