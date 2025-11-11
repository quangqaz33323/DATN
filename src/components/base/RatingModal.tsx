"use client";

import { useRatingStore } from "@/zustand/useRatingStore";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { Star, X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

interface RatingModalProps {
  ratingModal: {
    orderId: string;
    productId: string;
  };
  setRatingModal: (v: { orderId: string; productId: string }) => void;
}

const RatingModal: React.FC<RatingModalProps> = ({ ratingModal, setRatingModal }) => {
  const { getToken } = useAuth();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const addRating = useRatingStore((state) => state.addRating);

  const handleSubmit = async () => {
    if (rating <= 0 || rating > 5) {
      return toast.error("Vui lòng chọn số sao đánh giá");
    }
    if (review.trim().length < 5) {
      return toast.error("Vui lòng viết nhận xét ngắn");
    }

    try {
      const token = await getToken();

      const { data } = await axios.post(
        "/api/rating",
        { productId: ratingModal.productId, orderId: ratingModal.orderId, rating, review },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      addRating(data.rating);
      setRatingModal({
        orderId: "",
        productId: "",
      });
      toast.success("Cảm ơn bạn đã đánh giá!");
    } catch {
      return toast.error("Lỗi khi gửi đánh giá");
    }
  };

  if (!ratingModal.orderId && !ratingModal.productId) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-amber-100 bg-white p-8 shadow-xl">
        <button
          onClick={() =>
            setRatingModal({
              orderId: "",
              productId: "",
            })
          }
          className="absolute top-4 right-4 text-stone-500 transition hover:text-stone-700"
        >
          <X size={22} />
        </button>

        <h2 className="mb-6 text-center text-2xl font-semibold text-stone-700">
          Đánh giá sản phẩm
        </h2>

        <div className="mb-6 flex items-center justify-center gap-2">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              onClick={() => setRating(i + 1)}
              className={`size-8 cursor-pointer transition-transform duration-150 ${
                rating > i ? "fill-amber-500 text-amber-500 drop-shadow-sm" : "text-stone-300"
              } hover:scale-110`}
            />
          ))}
        </div>

        <textarea
          className="w-full resize-none rounded-xl border border-stone-200 p-3 text-stone-700 transition placeholder:text-stone-400 focus:ring-2 focus:ring-amber-400 focus:outline-none"
          placeholder="Chia sẻ trải nghiệm của bạn (tối thiểu 5 ký tự)"
          rows={4}
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <button
          onClick={() =>
            toast.promise(handleSubmit(), {
              loading: "Đang gửi...",
            })
          }
          className="mt-6 w-full rounded-xl bg-amber-600 py-2.5 font-medium text-white shadow-sm transition hover:bg-amber-700 active:scale-95"
        >
          Gửi đánh giá
        </button>
      </div>
    </div>
  );
};

export default RatingModal;
