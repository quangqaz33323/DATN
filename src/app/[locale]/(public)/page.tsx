import Banner from "@/components/base/Banner";
import BestSelling from "@/components/base/BestSelling";
import Footer from "@/components/base/Footer";
import Hero from "@/components/base/Hero";
import Navbar from "@/components/base/Navbar";
import { useLocale } from "next-intl";

export default function Home() {
    const locale = useLocale();
 
    return (
        <main>
            <Banner />
            <Navbar locale={locale} />
            <Hero />
            <BestSelling/>
            <Footer />
        </main>
    );
}