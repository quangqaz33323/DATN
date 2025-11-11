import { Rating } from "@/types";
import axios from "axios";
import { create } from "zustand";
import { GetTokenOptions } from "@clerk/types";

interface RatingState {
  ratings: Rating[];
  addRating: (newRating: Rating) => void;
  loadRatings: (getToken: (options?: GetTokenOptions) => Promise<string | null>) => Promise<void>;
}

export const useRatingStore = create<RatingState>((set) => ({
  ratings: [],

  addRating: (newRating: Rating) =>
    set((state: { ratings: Rating[] }) => ({
      ratings: [...state.ratings, newRating],
    })),

  loadRatings: async (getToken) => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/rating", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ ratings: data.ratings || [] });
    } catch (error) {
      console.error("loadRatings error", error);
    }
  },
}));
