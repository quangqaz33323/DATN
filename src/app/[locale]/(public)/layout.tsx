import Banner from "@/components/base/Banner";
import Footer from "@/components/base/Footer";
import Navbar from "@/components/base/Navbar";
import { useLocale } from "next-intl";
import {ReactNode} from "react";


export default function PublicLayout({children}: {children: ReactNode}) {
    const locale = useLocale();
    return (
      <main>
        <Banner />
        <Navbar locale={locale} />
        {children}
        <Footer />
      </main>
    );
}