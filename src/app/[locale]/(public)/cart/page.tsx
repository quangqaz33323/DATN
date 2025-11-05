"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Trash2Icon } from "lucide-react";
import { useCartStore } from "@/zustand/useCartStore";
import { useProductStore } from "@/zustand/useProductStore";
import PageTitle from "@/components/base/PageTitle";
import Counter from "@/components/base/Counter";
import OrderSummary from "@/components/base/OrderSummary";

export default function Cart() {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "VND";

  const { cartItems, deleteItemFromCart } = useCartStore();
  const { list: products } = useProductStore();

  const [cartArray, setCartArray] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const createCartArray = () => {
    let total = 0;
    const array: any[] = [];

    for (const [productId, quantity] of Object.entries(cartItems || {})) {
      const product = products.find((p) => p.id === productId);
      if (product) {
        array.push({ ...product, quantity });
        total += product.price * Number(quantity);
      }
    }

    setCartArray(array);
    setTotalPrice(total);
  };

  useEffect(() => {
    if (products.length > 0) {
      createCartArray();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems, products]);

  const handleDelete = (id: string) => deleteItemFromCart(id);

  if (cartArray.length === 0) {
    return (
      <div className="mx-6 flex min-h-[80vh] items-center justify-center text-slate-400">
        <h1 className="text-2xl font-semibold sm:text-4xl">Giỏ hàng trống</h1>
      </div>
    );
  }

  return (
    <div className="mx-6 min-h-screen text-slate-800">
      <div className="mx-auto max-w-7xl">
        <PageTitle
          heading="Giỏ hàng của tôi"
          text="Sản phẩm trong giỏ hàng"
          linkText="Tiếp tục mua sắm"
        />

        <div className="flex items-start justify-between gap-5 max-lg:flex-col">
          <table className="w-full max-w-4xl table-auto text-slate-600">
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
                  <td className="my-4 flex gap-3">
                    <div className="flex items-center justify-center gap-3 rounded-sm bg-slate-100 p-2">
                      <Image
                        src={item.images?.[0] || "/placeholder.png"}
                        alt={item.name}
                        className="h-14 w-auto rounded-sm object-contain"
                        width={45}
                        height={45}
                      />
                    </div>
                    <div>
                      <p className="font-medium max-sm:text-sm">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.category}</p>
                      <p className="text-sm">
                        {currency} {item.price.toLocaleString()}
                      </p>
                    </div>
                  </td>

                  <td className="text-center">
                    <Counter productId={item.id} />
                  </td>

                  <td className="text-center">
                    {currency} {(item.price * item.quantity).toLocaleString()}
                  </td>

                  <td className="text-center max-md:hidden">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="rounded-sm p-2 text-red-500 transition-colors hover:bg-red-50 active:scale-95"
                      aria-label={`Delete ${item.name}`}
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
  );
}
