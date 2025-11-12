import { categories } from "@/assets/assets";

const CategoriesMarquee = () => {
  return (
    <div className="group relative mx-auto w-full max-w-[1380px] overflow-hidden select-none sm:my-20">
      <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-20 bg-gradient-to-r from-[#FAF6F0] to-transparent" />

      <div className="flex min-w-[200%] animate-[marqueeScroll_15s_linear_infinite] gap-4 group-hover:[animation-play-state:paused] sm:animate-[marqueeScroll_35s_linear_infinite]">
        {[...categories, ...categories, ...categories, ...categories].map((category, index) => (
          <button
            key={index}
            className="rounded-lg bg-[#EADBC8] px-6 py-2 text-xs whitespace-nowrap text-[#5B3921] shadow-sm transition-all duration-300 hover:bg-[#C49A6C] hover:text-white active:scale-95 sm:text-sm"
          >
            {category}
          </button>
        ))}
      </div>

      <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-20 bg-gradient-to-l from-[#FAF6F0] to-transparent md:w-40" />
    </div>
  );
};

export default CategoriesMarquee;
