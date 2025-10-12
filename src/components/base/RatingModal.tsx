'use client'

import { Star, X } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'

interface RatingModalProps {
  ratingModal: {
    orderId: string
    productId: string
  }
  setRatingModal: (v: {
    orderId: string
    productId: string
  }) => void
}

const RatingModal: React.FC<RatingModalProps> = ({ ratingModal, setRatingModal }) => {
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState('')

  const handleSubmit = async () => {
    if (rating <= 0 || rating > 5) {
      return toast.error('Vui lòng chọn số sao đánh giá')
    }
    if (review.trim().length < 5) {
      return toast.error('Vui lòng viết nhận xét ngắn')
    }
    setRatingModal({
      orderId: "",
      productId: "",
    })
    toast.success('Cảm ơn bạn đã đánh giá!')
  }

  if (!ratingModal.orderId && !ratingModal.productId) return null

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="relative bg-white w-full max-w-md p-8 rounded-2xl shadow-xl border border-amber-100">
    
        <button
          onClick={() => setRatingModal({
            orderId: "",
            productId: "",
          })}
          className="absolute top-4 right-4 text-stone-500 hover:text-stone-700 transition"
        >
          <X size={22} />
        </button>


        <h2 className="text-2xl font-semibold text-stone-700 mb-6 text-center">
          Đánh giá sản phẩm
        </h2>


        <div className="flex items-center justify-center gap-2 mb-6">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              onClick={() => setRating(i + 1)}
              className={`size-8 cursor-pointer transition-transform duration-150 ${
                rating > i
                  ? 'text-amber-500 fill-amber-500 drop-shadow-sm'
                  : 'text-stone-300'
              } hover:scale-110`}
            />
          ))}
        </div>

 
        <textarea
          className="w-full p-3 text-stone-700 border border-stone-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-amber-400 transition placeholder:text-stone-400"
          placeholder="Chia sẻ trải nghiệm của bạn (tối thiểu 5 ký tự)"
          rows={4}
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />


        <button
          onClick={() =>
            toast.promise(handleSubmit(), {
              loading: 'Đang gửi...',
              success: 'Đánh giá thành công!',
              error: 'Đã có lỗi, vui lòng thử lại',
            })
          }
          className="w-full mt-6 bg-amber-600 text-white py-2.5 rounded-xl font-medium hover:bg-amber-700 active:scale-95 transition shadow-sm"
        >
          Gửi đánh giá
        </button>
      </div>
    </div>
  )
}

export default RatingModal
