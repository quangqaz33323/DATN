import { create } from "zustand";
import { Product } from "@/types";
import axios from "axios";

interface ProductState {
  list: Product[];
  setProduct: (products: Product[]) => void;
  clearProduct: () => void;
  loadProducts: (storeId?: string) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  list: [],

  setProduct: (products) => set({ list: products }),

  clearProduct: () => set({ list: [] }),

  loadProducts: async (storeId?: string) => {
    try {
      const { data } = await axios.get("/api/products" + (storeId ? `?storeId=${storeId}` : ""));
      set({ list: data.products });
    } catch (error) {
      console.error("loadProducts error", error);
    }
  },
}));
