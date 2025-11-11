"use client";

import { useEffect, useState } from "react";
import PageTitle from "@/components/base/PageTitle";
import OrderItem from "@/components/base/OrderItem";
import { Order } from "@/types";
import { useAuth, useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import axios from "axios";
import { Link, useRouter } from "@/i18n/routing";
import Loading from "@/components/base/Loading";

export default function Orders() {
  const { getToken } = useAuth();
  const { user, isLoaded } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = await getToken();
        const { data } = await axios.get("/api/orders", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(data.orders);
        setLoading(false);
      } catch (error: any) {
        toast.error(error?.response?.data?.error || error?.message || "Không thể tải đơn hàng");
      }
    };

    if (isLoaded) {
      if (user) fetchOrders();
      else router.push("/");
    }
  }, [isLoaded, user, getToken, router]);

  if (!isLoaded || loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {orders.length > 0 ? (
          <>
            <PageTitle
              heading="Đơn hàng của tôi"
              text={`Tổng cộng ${orders.length} đơn hàng`}
              linkText="Về trang chủ"
            />

            <div className="mt-8 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full table-auto divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Sản phẩm
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                        Tổng tiền
                      </th>
                      <th className="hidden px-6 py-4 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                        Địa chỉ
                      </th>
                      <th className="hidden px-6 py-4 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                        Trạng thái
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {orders.map((order) => (
                      <OrderItem key={order.id} order={order} />
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile View */}
              <div className="lg:hidden">
                {orders.map((order) => (
                  <div key={order.id} className="border-t border-gray-100 p-4">
                    <OrderItem order={order} />
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
            <div className="mx-auto mb-6 h-32 w-32 opacity-20">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-amber-700">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">Chưa có đơn hàng nào</h1>
            <p className="mt-3 max-w-md text-gray-600">
              Khám phá các sản phẩm gỗ thủ công tinh xảo tại{" "}
              <span className="font-semibold text-amber-700">QuangWoodcraft</span>
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-amber-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-amber-800"
            >
              Xem sản phẩm
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
