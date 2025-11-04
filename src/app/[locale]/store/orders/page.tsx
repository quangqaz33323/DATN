"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { orderDummyData } from "@/assets/assets";
import Loading from "@/components/base/Loading";
import { Order } from "@/types";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "sonner";

export default function StoreOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { getToken } = useAuth();

  const fetchOrders = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/store/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(data.orders);
    } catch (error) {
      console.log(error);
      toast.error("Lấy danh sách đơn hàng thất bại.");
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const token = await getToken();
      await axios.put(
        "/api/store/orders",
        { orderId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrders((prev) =>
        prev.map((order) => (order.id === orderId ? { ...order, status } : order))
      );
      toast.success("Cập nhật trạng thái đơn hàng thành công.");
    } catch (error) {
      console.log(error);
      toast.error("Cập nhật trạng thái đơn hàng thất bại.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="mb-28 text-stone-700">
      <h1 className="mb-6 text-3xl font-semibold">
        Đơn hàng <span className="font-semibold text-amber-700">Cửa hàng</span>
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-lg text-stone-400">Chưa có đơn hàng nào.</p>
      ) : (
        <div className="max-w-5xl overflow-x-auto rounded-xl border border-amber-200 bg-amber-50/60 shadow-sm">
          <table className="w-full text-left text-sm text-stone-700">
            <thead className="bg-amber-100 text-xs tracking-wider text-amber-900 uppercase">
              <tr>
                {[
                  "STT",
                  "Khách hàng",
                  "Tổng tiền",
                  "Thanh toán",
                  "Mã giảm",
                  "Trạng thái",
                  "Ngày đặt",
                ].map((heading, i) => (
                  <th key={i} className="px-5 py-3 font-semibold">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100">
              {orders.map((order, index) => (
                <tr
                  key={order.id}
                  className="cursor-pointer transition hover:bg-amber-100/60"
                  onClick={() => openModal(order)}
                >
                  <td className="pl-6 font-medium text-amber-700">{index + 1}</td>
                  <td className="px-5 py-3">{order.user?.name}</td>
                  <td className="px-5 py-3 font-semibold text-stone-800">
                    ₫{order.total.toLocaleString()}
                  </td>
                  <td className="px-5 py-3">{order.paymentMethod}</td>
                  <td className="px-5 py-3">
                    {order.isCouponUsed ? (
                      <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">
                        {order.coupon?.code}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-5 py-3" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className="rounded-md border border-amber-300 bg-amber-50 text-sm focus:border-amber-400 focus:ring focus:ring-amber-200"
                    >
                      <option value="ORDER_PLACED">Đã đặt</option>
                      <option value="PROCESSING">Đang xử lý</option>
                      <option value="SHIPPED">Đã giao</option>
                      <option value="DELIVERED">Hoàn tất</option>
                    </select>
                  </td>
                  <td className="px-5 py-3 text-stone-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && selectedOrder && (
        <div
          onClick={closeModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 text-sm text-stone-700 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl rounded-2xl border border-amber-200 bg-white p-8 shadow-lg"
          >
            <h2 className="mb-6 text-center text-2xl font-semibold text-amber-800">
              Chi tiết đơn hàng
            </h2>

            <div className="mb-5">
              <h3 className="mb-2 font-semibold text-stone-800">Thông tin khách hàng</h3>
              <div className="space-y-1 text-stone-600">
                <p>
                  <span className="font-medium text-amber-700">Tên:</span>{" "}
                  {selectedOrder.user?.name}
                </p>
                <p>
                  <span className="font-medium text-amber-700">Email:</span>{" "}
                  {selectedOrder.user?.email}
                </p>
                <p>
                  <span className="font-medium text-amber-700">SĐT:</span>{" "}
                  {selectedOrder.address?.phone}
                </p>
                <p>
                  <span className="font-medium text-amber-700">Địa chỉ:</span>{" "}
                  {`${selectedOrder.address?.street}, ${selectedOrder.address?.city}, ${selectedOrder.address?.state}, ${selectedOrder.address?.zip}, ${selectedOrder.address?.country}`}
                </p>
              </div>
            </div>

            <div className="mb-5">
              <h3 className="mb-2 font-semibold text-stone-800">Sản phẩm</h3>
              <div className="space-y-3">
                {selectedOrder.orderItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 rounded-lg border border-amber-100 bg-amber-50/40 p-3"
                  >
                    <Image
                      src={
                        typeof item.product.images?.[0] === "string"
                          ? item.product.images[0]
                          : item.product.images?.[0]?.src || "/placeholder.jpg"
                      }
                      alt={item.product?.name || "Product image"}
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-md border border-amber-100 object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-stone-800">{item.product?.name}</p>
                      <p>Số lượng: {item.quantity}</p>
                      <p>Giá: ₫{item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6 text-stone-600">
              <p>
                <span className="font-medium text-amber-700">Phương thức thanh toán:</span>{" "}
                {selectedOrder.paymentMethod}
              </p>
              <p>
                <span className="font-medium text-amber-700">Đã thanh toán:</span>{" "}
                {selectedOrder.isPaid ? "Có" : "Chưa"}
              </p>
              {selectedOrder.isCouponUsed && (
                <p>
                  <span className="font-medium text-amber-700">Mã giảm giá:</span>{" "}
                  {selectedOrder.coupon?.code} ({selectedOrder.coupon?.discount}% giảm)
                </p>
              )}
              <p>
                <span className="font-medium text-amber-700">Trạng thái:</span>{" "}
                {selectedOrder.status}
              </p>
              <p>
                <span className="font-medium text-amber-700">Ngày đặt hàng:</span>{" "}
                {new Date(selectedOrder.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="flex justify-center">
              <button
                onClick={closeModal}
                className="rounded-full bg-amber-700 px-6 py-2 font-medium text-white shadow transition-all hover:bg-amber-800"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
