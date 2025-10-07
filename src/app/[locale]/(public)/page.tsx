import Footer from "@/components/base/Footer";
import LanguageSwitcher from "@/components/base/LanguageSwitcher";
import { useLocale } from "next-intl";

export default function Home() {
    const locale = useLocale();
 
    return (
        <div>
            <LanguageSwitcher locale={locale} />
            <Footer/>
        </div>
    );
}