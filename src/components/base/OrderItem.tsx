// OrderItem.tsx
"use client";

import Image from "next/image";
import { DotIcon } from "lucide-react";
import { useState } from "react";
import type { Order } from "@/types";
import { useRatingStore } from "@/zustand/useRatingStore";
import Rating from "./Rating";
import RatingModal from "./RatingModal";

const OrderItem = ({ order }: { order: Order }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "VND";
  const [ratingModal, setRatingModal] = useState<{ orderId: string; productId: string } | null>(
    null
  );
  const { ratings } = useRatingStore();

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "bg-emerald-50 text-emerald-700 ring-emerald-200";
      case "CONFIRMED":
        return "bg-amber-50 text-amber-700 ring-amber-200";
      default:
        return "bg-gray-50 text-gray-600 ring-gray-200";
    }
  };

  return (
    <>
      {/* Desktop Row */}
      <tr className="hidden lg:table-row">
        <td className="py-6 pr-4 pl-6 align-top">
          <div className="space-y-4">
            {order.orderItems.map((item, idx) => {
              const existingRating = ratings.find(
                (r) => r.orderId === order.id && r.productId === item.product.id
              );

              return (
                <div
                  key={idx}
                  className="flex gap-4 rounded-lg bg-gray-50/50 p-4 ring-1 ring-gray-100 transition-all hover:ring-amber-200"
                >
                  <div className="flex-shrink-0">
                    <div className="h-16 w-16 overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-gray-200">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex-1 space-y-1">
                    <p className="line-clamp-2 font-medium text-gray-900">{item.product.name}</p>
                    <p className="text-sm text-gray-600">
                      {currency}
                      {item.price.toLocaleString()} × {item.quantity}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                    </p>

                    <div className="mt-2">
                      {existingRating ? (
                        <Rating value={existingRating.rating} />
                      ) : (
                        <button
                          onClick={() =>
                            setRatingModal({ orderId: order.id, productId: item.product.id })
                          }
                          disabled={order.status !== "DELIVERED"}
                          className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                            order.status === "DELIVERED"
                              ? "bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95"
                              : "cursor-not-allowed bg-gray-100 text-gray-400"
                          }`}
                        >
                          Đánh giá
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </td>

        <td className="px-6 py-6 text-center font-semibold text-gray-900">
          {currency}
          {order.total.toLocaleString()}
        </td>

        <td className="px-6 py-6 align-top text-sm text-gray-700">
          <div className="max-w-xs">
            <p className="font-medium">{order.address.name}</p>
            <p className="text-gray-600">{order.address.street}</p>
            <p className="text-gray-600">
              {order.address.city}, {order.address.state}
            </p>
            <p className="text-xs text-gray-500">{order.address.phone}</p>
          </div>
        </td>

        <td className="px-6 py-6 align-top">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ring-1 ${getStatusStyle(
              order.status
            )}`}
          >
            <DotIcon className="h-3 w-3" />
            {order.status === "DELIVERED"
              ? "Đã giao"
              : order.status === "CONFIRMED"
                ? "Đã xác nhận"
                : "Đang xử lý"}
          </span>
        </td>
      </tr>

      {/* Mobile Card */}
      <tr className="lg:hidden">
        <td colSpan={4} className="block p-0">
          <div className="space-y-3 p-4">
            {order.orderItems.map((item, idx) => {
              const existingRating = ratings.find(
                (r) => r.orderId === order.id && r.productId === item.product.id
              );

              return (
                <div key={idx} className="flex gap-3">
                  <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-md bg-white shadow ring-1 ring-gray-200">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      width={56}
                      height={56}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="line-clamp-1 text-sm font-medium text-gray-900">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {currency}
                      {item.price.toLocaleString()} × {item.quantity}
                    </p>
                    {existingRating ? (
                      <Rating value={existingRating.rating} />
                    ) : (
                      order.status === "DELIVERED" && (
                        <button
                          onClick={() =>
                            setRatingModal({ orderId: order.id, productId: item.product.id })
                          }
                          className="mt-1 text-xs font-medium text-emerald-600 hover:text-emerald-700"
                        >
                          Đánh giá ngay
                        </button>
                      )
                    )}
                  </div>
                </div>
              );
            })}

            <div className="flex items-center justify-between border-t border-gray-100 pt-3">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {currency}
                  {order.total.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">{order.orderItems.length} sản phẩm</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ring-1 ${getStatusStyle(order.status)}`}
              >
                {order.status === "DELIVERED"
                  ? "Đã giao"
                  : order.status === "CONFIRMED"
                    ? "Xác nhận"
                    : "Xử lý"}
              </span>
            </div>

            <div className="space-y-0.5 text-xs text-gray-600">
              <p className="font-medium">{order.address.name}</p>
              <p>
                {order.address.street}, {order.address.city}
              </p>
              <p className="text-gray-500">{order.address.phone}</p>
            </div>
          </div>
        </td>
      </tr>

      {/* Rating Modal */}
      {ratingModal && <RatingModal ratingModal={ratingModal} setRatingModal={setRatingModal} />}
    </>
  );
};

export default OrderItem;
