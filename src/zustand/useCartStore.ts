import { GetTokenOptions } from "@clerk/types";
import axios from "axios";
import { create } from "zustand";

interface CartState {
  total: number;
  cartItems: Record<string, number>;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  deleteItemFromCart: (productId: string) => void;
  clearCart: () => void;
  loadCartItems: (getToken: (options?: GetTokenOptions) => Promise<string | null>) => Promise<void>;
  uploadCartItems: (
    getToken: (options?: GetTokenOptions) => Promise<string | null>
  ) => Promise<void>;
}

let debounceUploadCartItems: NodeJS.Timeout | null = null;

export const useCartStore = create<CartState>((set, get) => ({
  total: 0,
  cartItems: {},

  addToCart: (productId) =>
    set((state) => {
      const newCart = { ...state.cartItems };
      newCart[productId] = (newCart[productId] || 0) + 1;
      return {
        cartItems: newCart,
        total: state.total + 1,
      };
    }),

  removeFromCart: (productId) =>
    set((state) => {
      const newCart = { ...state.cartItems };
      if (newCart[productId]) {
        newCart[productId] -= 1;
        if (newCart[productId] <= 0) delete newCart[productId];
        return {
          cartItems: newCart,
          total: Math.max(0, state.total - 1),
        };
      }
      return state;
    }),

  deleteItemFromCart: (productId) =>
    set((state) => {
      const newCart = { ...state.cartItems };
      const quantity = newCart[productId] || 0;
      delete newCart[productId];
      return {
        cartItems: newCart,
        total: Math.max(0, state.total - quantity),
      };
    }),

  clearCart: () => set({ cartItems: {}, total: 0 }),

  loadCartItems: async (getToken: (options?: GetTokenOptions) => Promise<string | null>) => {
    try {
      const token = await getToken();
      if (!token) return;
      const { data } = await axios.get("/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ cartItems: data?.cartItems ?? {}, total: data?.total ?? 0 });
    } catch (error) {
      console.error("loadCartItems error", error);
    }
  },

  uploadCartItems: async (getToken: (options?: GetTokenOptions) => Promise<string | null>) => {
    try {
      if (debounceUploadCartItems) {
        clearTimeout(debounceUploadCartItems);
      }
      debounceUploadCartItems = setTimeout(async () => {
        const token = await getToken();
        const { cartItems } = get();
        await axios.post(
          "/api/cart",
          { cart: cartItems },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }, 1000);
    } catch (error) {
      console.error("uploadCartItems error", error);
    }
  },
}));
