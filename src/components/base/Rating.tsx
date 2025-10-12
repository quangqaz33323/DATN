import { Star } from "lucide-react";
import React from "react";

interface RatingProps {
  value?: number;
  size?: number;
  showValue?: boolean;
}

const Rating: React.FC<RatingProps> = ({ value = 4, size = 20, showValue = false }) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`transition-transform duration-200 ${
            value > i
              ? "text-amber-500 fill-amber-500 drop-shadow-sm"
              : "text-gray-300 fill-gray-200"
          } hover:scale-110`}
          style={{ width: size, height: size }}
        />
      ))}
      {showValue && (
        <span className="ml-2 text-sm font-medium text-stone-600">
          {value.toFixed(1)} / 5
        </span>
      )}
    </div>
  );
};

export default Rating;
