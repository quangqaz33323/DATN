import Banner from "@/components/base/Banner";
import Footer from "@/components/base/Footer";
import LanguageSwitcher from "@/components/base/LanguageSwitcher";
import Navbar from "@/components/base/Navbar";
import { useLocale } from "next-intl";

export default function Home() {
    const locale = useLocale();
 
    return (
        <div>
            <LanguageSwitcher locale={locale} />
            <Banner />
            <Navbar />
            <Footer />
        </div>
    );
}