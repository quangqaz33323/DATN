'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import { orderDummyData } from "@/assets/assets"
import Loading from "@/components/base/Loading"
import { Order } from "@/types"

export default function StoreOrders() {
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const fetchOrders = async () => {
        setOrders(orderDummyData)
        setLoading(false)
    }

    const updateOrderStatus = async (orderId: string, status: string) => {
        // Logic to update order status
    }

    const openModal = (order: Order) => {
        setSelectedOrder(order)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setSelectedOrder(null)
        setIsModalOpen(false)
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    if (loading) return <Loading />

    return (
        <div className="text-stone-700 mb-28">
            <h1 className="text-3xl font-semibold mb-6">
                Đơn hàng <span className="text-amber-700 font-semibold">Cửa hàng</span>
            </h1>

            {orders.length === 0 ? (
                <p className="text-center text-stone-400 text-lg">Chưa có đơn hàng nào.</p>
            ) : (
                <div className="overflow-x-auto max-w-5xl rounded-xl shadow-sm border border-amber-200 bg-amber-50/60">
                    <table className="w-full text-sm text-left text-stone-700">
                        <thead className="bg-amber-100 text-amber-900 uppercase text-xs tracking-wider">
                            <tr>
                                {["STT", "Khách hàng", "Tổng tiền", "Thanh toán", "Mã giảm", "Trạng thái", "Ngày đặt"].map((heading, i) => (
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
                                    className="hover:bg-amber-100/60 transition cursor-pointer"
                                    onClick={() => openModal(order)}
                                >
                                    <td className="pl-6 text-amber-700 font-medium">
                                        {index + 1}
                                    </td>
                                    <td className="px-5 py-3">{order.user?.name}</td>
                                    <td className="px-5 py-3 font-semibold text-stone-800">
                                        ₫{order.total.toLocaleString()}
                                    </td>
                                    <td className="px-5 py-3">{order.paymentMethod}</td>
                                    <td className="px-5 py-3">
                                        {order.isCouponUsed ? (
                                            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full font-medium">
                                                {order.coupon?.code}
                                            </span>
                                        ) : (
                                            "—"
                                        )}
                                    </td>
                                    <td className="px-5 py-3" onClick={(e) => e.stopPropagation()}>
                                        <select
                                            value={order.status}
                                            onChange={e => updateOrderStatus(order.id, e.target.value)}
                                            className="border border-amber-300 rounded-md text-sm focus:ring focus:ring-amber-200 focus:border-amber-400 bg-amber-50"
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
                    className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 text-stone-700 text-sm"
                >
                    <div
                        onClick={e => e.stopPropagation()}
                        className="bg-white rounded-2xl shadow-lg max-w-3xl w-full p-8 border border-amber-200"
                    >
                        <h2 className="text-2xl font-semibold text-amber-800 mb-6 text-center">
                            Chi tiết đơn hàng
                        </h2>

                        <div className="mb-5">
                            <h3 className="font-semibold text-stone-800 mb-2">Thông tin khách hàng</h3>
                            <div className="space-y-1 text-stone-600">
                                <p><span className="text-amber-700 font-medium">Tên:</span> {selectedOrder.user?.name}</p>
                                <p><span className="text-amber-700 font-medium">Email:</span> {selectedOrder.user?.email}</p>
                                <p><span className="text-amber-700 font-medium">SĐT:</span> {selectedOrder.address?.phone}</p>
                                <p><span className="text-amber-700 font-medium">Địa chỉ:</span> {`${selectedOrder.address?.street}, ${selectedOrder.address?.city}, ${selectedOrder.address?.state}, ${selectedOrder.address?.zip}, ${selectedOrder.address?.country}`}</p>
                            </div>
                        </div>

                        <div className="mb-5">
                            <h3 className="font-semibold text-stone-800 mb-2">Sản phẩm</h3>
                            <div className="space-y-3">
                                {selectedOrder.orderItems.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex items-center gap-4 border border-amber-100 bg-amber-50/40 rounded-lg p-3"
                                    >
                                        <Image
                                            src={typeof item.product.images?.[0] === 'string' ? item.product.images[0] : item.product.images?.[0]?.src || '/placeholder.jpg'}
                                            alt={item.product?.name || 'Product image'}
                                            width={64}
                                            height={64}
                                            className="w-16 h-16 object-cover rounded-md border border-amber-100"
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
                            <p><span className="text-amber-700 font-medium">Phương thức thanh toán:</span> {selectedOrder.paymentMethod}</p>
                            <p><span className="text-amber-700 font-medium">Đã thanh toán:</span> {selectedOrder.isPaid ? "Có" : "Chưa"}</p>
                            {selectedOrder.isCouponUsed && (
                                <p><span className="text-amber-700 font-medium">Mã giảm giá:</span> {selectedOrder.coupon?.code} ({selectedOrder.coupon?.discount}% giảm)</p>
                            )}
                            <p><span className="text-amber-700 font-medium">Trạng thái:</span> {selectedOrder.status}</p>
                            <p><span className="text-amber-700 font-medium">Ngày đặt hàng:</span> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                        </div>

                        <div className="flex justify-center">
                            <button
                                onClick={closeModal}
                                className="px-6 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-full font-medium shadow transition-all"
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}