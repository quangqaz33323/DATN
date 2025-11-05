import { create } from "zustand";
import { addressDummyData } from "@/assets/assets";
import { Address } from "@/types";
import { GetTokenOptions } from "@clerk/types";
import axios from "axios";

interface AddressStore {
  list: Address[];
  addAddress: (address: Address) => void;
  resetAddresses: () => void;
  loadAddresses: (getToken: (options?: GetTokenOptions) => Promise<string | null>) => Promise<void>;
}

export const useAddressStore = create<AddressStore>((set) => ({
  list: [addressDummyData],

  addAddress: (address) =>
    set((state) => ({
      list: [...state.list, address],
    })),

  resetAddresses: () => set({ list: [addressDummyData] }),

  loadAddresses: async (getToken) => {
    try {
      const token = await getToken();
      if (!token) return;

      const { data } = await axios.get("/api/address", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ list: data.addresses });
    } catch (error) {
      console.error("loadAddresses error", error);
    }
  },
}));
