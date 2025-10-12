import { Rating } from '@/types'
import { create } from 'zustand'


interface RatingState {
  ratings: Rating[]
  addRating: (newRating: Rating) => void
}

export const useRatingStore = create<RatingState>((set) => ({
  ratings: [],

  addRating: (newRating: Rating) =>
    set((state: { ratings: Rating[] }) => ({
      ratings: [...state.ratings, newRating],
    })),
}))