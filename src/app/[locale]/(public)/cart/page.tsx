'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import { Trash2Icon } from "lucide-react"
import { useCartStore } from "@/zustand/useCartStore"
import { useProductStore } from "@/zustand/useProductStore"
import PageTitle from "@/components/base/PageTitle"
import Counter from "@/components/base/Counter"
import OrderSummary from "@/components/base/OrderSummary"

export default function Cart() {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'VND'

  const { cartItems, deleteItemFromCart } = useCartStore()
  const { list: products } = useProductStore()

  const [cartArray, setCartArray] = useState<any[]>([])
  const [totalPrice, setTotalPrice] = useState(0)

  const createCartArray = () => {
    let total = 0
    const array = []

    for (const [productId, quantity] of Object.entries(cartItems)) {
      const product = products.find(p => p.id === productId)
      if (product) {
        array.push({ ...product, quantity })
        total += product.price * quantity
      }
    }

    setCartArray(array)
    setTotalPrice(total)
  }

  useEffect(() => {
    if (products.length > 0) {
      createCartArray()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems, products])

  const handleDelete = (id: string) => deleteItemFromCart(id)


  if (cartArray.length === 0) {
    return (
      <div className="min-h-[80vh] mx-6 flex items-center justify-center text-slate-400">
        <h1 className="text-2xl sm:text-4xl font-semibold">Giỏ hàng trống</h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen mx-6 text-slate-800">
      <div className="max-w-7xl mx-auto">

        <PageTitle heading="Giỏ hàng của tôi" text="Sản phẩm trong giỏ hàng" linkText="Tiếp tục mua sắm" />

        <div className="flex items-start justify-between gap-5 max-lg:flex-col">

          <table className="w-full max-w-4xl text-slate-600 table-auto">
            <thead>
              <tr className="max-sm:text-sm">
                <th className="text-left">Sản phẩm</th>
                <th>Số lượng</th>
                <th>Thành tiền</th>
                <th className="max-md:hidden">Xoá</th>
              </tr>
            </thead>
            <tbody>
              {cartArray.map((item, index) => (
                <tr key={index} className="space-x-2">
                  <td className="flex gap-3 my-4">
                    <div className="flex gap-3 items-center justify-center bg-slate-100 size-18 rounded-md">
                      <Image
                        src={item.images?.[0] || "/placeholder.png"}
                        alt={item.name}
                        className="h-14 w-auto"
                        width={45}
                        height={45}
                      />
                    </div>
                    <div>
                      <p className="max-sm:text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.category}</p>
                      <p>{currency}{item.price.toLocaleString()}</p>
                    </div>
                  </td>

                  <td className="text-center">
                    <Counter productId={item.id} />
                  </td>

                  <td className="text-center">
                    {currency}{(item.price * item.quantity).toLocaleString()}
                  </td>

                  <td className="text-center max-md:hidden">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-500 hover:bg-red-50 p-2.5 rounded-full active:scale-95 transition-all"
                    >
                      <Trash2Icon size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

  
          <OrderSummary totalPrice={totalPrice} items={cartArray} />
        </div>
      </div>
    </div>
  )
}
