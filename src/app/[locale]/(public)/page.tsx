import Banner from "@/components/base/Banner";
import BestSelling from "@/components/base/BestSelling";
import Footer from "@/components/base/Footer";
import Hero from "@/components/base/Hero";
import LatestProducts from "@/components/base/LatestProducts";
import Navbar from "@/components/base/Navbar";
import Newsletter from "@/components/base/Newsletter";
import OurSpecs from "@/components/base/OurSpec";
import { useLocale } from "next-intl";

export default function Home() {
    const locale = useLocale();
 
    return (
        <main>
            <Banner />
            <Navbar locale={locale} />
            <Hero />
            <LatestProducts />
            <BestSelling />
            <OurSpecs/>
            <Newsletter />
            <Footer />
        </main>
    );
}