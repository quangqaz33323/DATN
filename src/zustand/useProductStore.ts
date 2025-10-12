import { create } from 'zustand'
import { productDummyData } from '@/assets/assets'
import { Product } from '@/types'


interface ProductState {
  list: Product[]
  setProduct: (products: Product[]) => void
  clearProduct: () => void
}

export const useProductStore = create<ProductState>((set) => ({
  list: productDummyData,

  setProduct: (products) => set({ list: products }),

  clearProduct: () => set({ list: [] }),
}))
