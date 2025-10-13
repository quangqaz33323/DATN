import BestSelling from "@/components/base/BestSelling";
import Hero from "@/components/base/Hero";
import LatestProducts from "@/components/base/LatestProducts";
import Newsletter from "@/components/base/Newsletter";
import OurSpecs from "@/components/base/OurSpec";

export default function Home() {
 
    return (
       <div>
            <Hero />
            <LatestProducts />
            <BestSelling />
            <OurSpecs />
            <Newsletter />
        </div>
    );
}