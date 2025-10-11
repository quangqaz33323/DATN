import { categories } from "@/assets/assets";

const CategoriesMarquee = () => {


    return (
        <div className="overflow-hidden w-full relative max-w-[1380px] mx-auto select-none group sm:my-20">
         
            <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-[#FAF6F0] to-transparent" />
            
           
            <div className="flex min-w-[200%] animate-[marqueeScroll_15s_linear_infinite] sm:animate-[marqueeScroll_35s_linear_infinite] group-hover:[animation-play-state:paused] gap-4" >
                {[...categories, ...categories, ...categories, ...categories].map((category, index) => (
                    <button
                        key={index}
                        className="px-6 py-2 whitespace-nowrap bg-[#EADBC8] rounded-lg text-[#5B3921] text-xs sm:text-sm hover:bg-[#C49A6C] hover:text-white active:scale-95 transition-all duration-300 shadow-sm"
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-[#FAF6F0] to-transparent" />
        </div>
    );
};

export default CategoriesMarquee;
