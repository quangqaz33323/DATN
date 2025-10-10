import { create } from 'zustand'

interface CartState {
  total: number
  cartItems: Record<string, number>
  addToCart: (productId: string) => void
  removeFromCart: (productId: string) => void
  deleteItemFromCart: (productId: string) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>((set) => ({
  total: 0,
  cartItems: {},

  addToCart: (productId) =>
    set((state) => {
      const newCart = { ...state.cartItems }
      newCart[productId] = (newCart[productId] || 0) + 1
      return {
        cartItems: newCart,
        total: state.total + 1
      }
    }),

  removeFromCart: (productId) =>
    set((state) => {
      const newCart = { ...state.cartItems }
      if (newCart[productId]) {
        newCart[productId] -= 1
        if (newCart[productId] <= 0) delete newCart[productId]
        return {
          cartItems: newCart,
          total: Math.max(0, state.total - 1)
        }
      }
      return state
    }),

  deleteItemFromCart: (productId) =>
    set((state) => {
      const newCart = { ...state.cartItems }
      const quantity = newCart[productId] || 0
      delete newCart[productId]
      return {
        cartItems: newCart,
        total: Math.max(0, state.total - quantity)
      }
    }),

  clearCart: () => set({ cartItems: {}, total: 0 })
}))
