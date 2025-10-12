'use client'

import { useCartStore } from '@/zustand/useCartStore'

const Counter = ({ productId }: { productId: string }) => {
  const { cartItems, addToCart, removeFromCart } = useCartStore()

  const quantity = cartItems[productId] || 0

  return (
    <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 rounded-full border border-[#C9A66B] bg-[#F9F4EE] text-[#4A2C17] shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]">
      <button
        onClick={() => removeFromCart(productId)}
        disabled={quantity <= 0}
        className="w-7 h-7 flex items-center justify-center rounded-full border border-[#C9A66B] hover:bg-[#EADBC8] active:scale-95 transition disabled:opacity-40 disabled:hover:bg-transparent"
      >
        −
      </button>

      <p className="min-w-[24px] text-center font-semibold select-none">
        {quantity}
      </p>

      <button
        onClick={() => addToCart(productId)}
        className="w-7 h-7 flex items-center justify-center rounded-full border border-[#C9A66B] hover:bg-[#EADBC8] active:scale-95 transition"
      >
        +
      </button>
    </div>
  )
}

export default Counter
