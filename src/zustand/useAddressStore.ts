import { create } from 'zustand'
import { addressDummyData } from '@/assets/assets'
import { Address } from '@/types'


interface AddressStore {
  list: Address[]
  addAddress: (address: Address) => void
  resetAddresses: () => void
}

export const useAddressStore = create<AddressStore>((set) => ({
  list: [addressDummyData],

  addAddress: (address) =>
    set((state) => ({
      list: [...state.list, address],
    })),

  resetAddresses: () => set({ list: [addressDummyData] }),
}))
