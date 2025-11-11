"use client";

import Loading from "@/components/base/Loading";
import OrdersAreaChart from "@/components/base/OrdersAreaChart";
import ProductsPieChart from "@/components/base/ProductsPieChart";
import { AdminDashboardData } from "@/types";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { CircleDollarSign, Package, Store, Tag, TrendingUp, PieChart } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const { getToken } = useAuth();
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "₫";

  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<AdminDashboardData>({
    products: 0,
    revenue: "",
    orders: 0,
    stores: 0,
    allOrders: [],
  });

  const dashboardCardsData = [
    {
      title: "Sản phẩm",
      value: dashboardData.products,
      icon: Package,
      color: "bg-amber-100 text-amber-700",
    },
    {
      title: "Doanh thu",
      value: `${dashboardData.revenue} ${currency}`,
      icon: CircleDollarSign,
      color: "bg-emerald-100 text-emerald-700",
    },
    {
      title: "Đơn hàng",
      value: dashboardData.orders,
      icon: Tag,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Cửa hàng",
      value: dashboardData.stores,
      icon: Store,
      color: "bg-purple-100 text-purple-700",
    },
  ];

  const fetchDashboardData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDashboardData(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/30 to-white p-6">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-amber-900">Bảng điều khiển</h1>
        <p className="mt-1 text-lg text-stone-600">
          <span className="font-medium text-amber-800">QuangWoodcraft</span> — Theo dõi hiệu suất
          kinh doanh
        </p>
      </div>

      {/* Stats Cards */}
      <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardCardsData.map((card, index) => (
          <div
            key={index}
            className={`group relative overflow-hidden rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-stone-500">{card.title}</p>
                <p className="mt-2 text-3xl font-bold text-stone-800">{card.value}</p>
              </div>
              <div
                className={`rounded-full p-3 ${card.color} transition-transform group-hover:scale-110`}
              >
                <card.icon size={28} />
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Revenue Chart */}
        <div className="rounded-3xl border border-amber-100 bg-white p-7 shadow-lg transition-shadow hover:shadow-xl">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-semibold text-stone-800">
                <TrendingUp size={22} className="text-emerald-600" />
                Thống kê doanh thu
              </h2>
              <p className="mt-1 text-sm text-stone-500">Tổng quan theo thời gian</p>
            </div>
          </div>
          <div className="h-80 lg:h-96">
            <OrdersAreaChart allOrders={dashboardData.allOrders} />
          </div>
        </div>

        {/* Product Category Chart */}
        <div className="rounded-3xl border border-amber-100 bg-white p-7 shadow-lg transition-shadow hover:shadow-xl">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-xl font-semibold text-stone-800">
                <PieChart size={22} className="text-amber-600" />
                Phân loại sản phẩm
              </h2>
              <p className="mt-1 text-sm text-stone-500">Tỷ lệ theo chất liệu</p>
            </div>
          </div>
          <div className="flex h-80 items-center justify-center lg:h-96">
            <div className="w-full">
              <ProductsPieChart
                data={[
                  { name: "Gỗ", value: 45, color: "#f59e0b" },
                  { name: "Kim loại", value: 25, color: "#6b7280" },
                  { name: "Nhựa", value: 15, color: "#3b82f6" },
                  { name: "Khác", value: 15, color: "#10b981" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <p className="mt-12 text-center text-sm text-stone-400">
        Cập nhật lần cuối: {new Date().toLocaleString("vi-VN")}
      </p>
    </div>
  );
}
