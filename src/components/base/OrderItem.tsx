'use client'

import Image from "next/image"
import { DotIcon } from "lucide-react"
import { useState } from "react"
import type {  Order } from "@/types"
import { useRatingStore } from "@/zustand/useRatingStore"
import Rating from "./Rating"
import RatingModal from "./RatingModal"


const OrderItem = ({ order }: { order: Order }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "VND"
  const [ratingModal, setRatingModal] = useState<{
    orderId: string
    productId: string
  }>({
    orderId: "",
    productId: "",
  })
  const { ratings } = useRatingStore((state) => state)

  return (
    <>
      <tr className="text-sm">
        <td className="text-left">
          <div className="flex flex-col gap-6">
            {order?.orderItems?.map((item, index) => {
              const existingRating = ratings.find(
                (r) => order.id === r.orderId && item.product.id === r.productId
              )

              return (
                <div
                  key={index}
                  className="flex items-center gap-5 rounded-xl bg-amber-50/40 p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-amber-100"
                >
      
                  <div className="w-20 h-20 flex items-center justify-center bg-amber-100 rounded-lg overflow-hidden">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      width={70}
                      height={70}
                      className="object-contain"
                    />
                  </div>

         
                  <div className="flex flex-col justify-center text-sm text-slate-700">
                    <p className="font-semibold text-amber-900 text-base tracking-wide">
                      {item.product.name}
                    </p>
                    <p className="text-slate-600">
                      {currency}
                      {item.price} · Qty: {item.quantity}
                    </p>
                    <p className="text-slate-500 text-xs mb-1">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>

                    <div className="mt-1">
                      {existingRating ? (
                        <Rating value={existingRating.rating} />
                      ) : (
                        <button
                          onClick={() =>
                            setRatingModal({
                              orderId: order.id,
                              productId: item.product.id,
                            })
                          }
                          disabled={order.status !== "DELIVERED"}
                          className={`rounded-md border border-green-400 px-3 py-1 text-sm font-medium transition-all ${
                            order.status === "DELIVERED"
                              ? "text-green-600 hover:bg-green-50 active:scale-[0.97]"
                              : "text-slate-400 cursor-not-allowed opacity-60"
                          }`}
                        >
                          Rate Product
                        </button>
                      )}
                    </div>

                    {ratingModal && (
                      <RatingModal
                        ratingModal={ratingModal}
                        setRatingModal={setRatingModal}
                      />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </td>

   
        <td className="text-center max-md:hidden text-amber-800 font-medium">
          {currency}
          {order.total}
        </td>

      
        <td className="text-left max-md:hidden text-slate-700 leading-tight">
          <p>
            {order?.address?.name}, {order?.address?.street}
          </p>
          <p>
            {order?.address?.city}, {order?.address?.state}, {order?.address?.zip}
          </p>
          <p>{order?.address?.country}</p>
          <p className="text-slate-500 text-sm">{order?.address?.phone}</p>
        </td>

     
        <td className="text-left text-sm max-md:hidden">
          <div
            className={`flex items-center justify-center gap-1 px-3 py-1 rounded-full font-medium shadow-sm ${
              order.status === "CONFIRMED"
                ? "text-yellow-700 bg-yellow-100"
                : order.status === "DELIVERED"
                ? "text-green-700 bg-green-100"
                : "text-slate-600 bg-slate-100"
            }`}
          >
            <DotIcon size={10} />
            {order.status.replace(/_/g, " ").toLowerCase()}
          </div>
        </td>
      </tr>

    
      <tr className="md:hidden">
        <td colSpan={5}>
          <div className="text-slate-700 text-sm mt-3">
            <p>
              {order?.address?.name}, {order?.address?.street}
            </p>
            <p>
              {order?.address?.city}, {order?.address?.state}, {order?.address?.zip}
            </p>
            <p>{order?.address?.country}</p>
            <p className="text-slate-500 text-xs">{order?.address?.phone}</p>
          </div>
          <div className="flex justify-center mt-3">
            <span
              className={`text-center px-5 py-1.5 rounded-full font-medium ${
                order?.status === "DELIVERED"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {order?.status?.replace(/_/g, " ").toLowerCase()}
            </span>
          </div>
        </td>
      </tr>

      <tr>
        <td colSpan={4}>
          <div className="border-b border-amber-200 w-5/6 mx-auto mt-2" />
        </td>
      </tr>
    </>
  )
}

export default OrderItem
