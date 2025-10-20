'use client'

import { useEffect, useState } from "react"
import { ArrowRightIcon } from "lucide-react"
import SellerNavbar from "./StoreNavbar"
import SellerSidebar from "./StoreSidebar"
import { dummyStoreData } from "@/assets/assets"
import Loading from "../base/Loading"
import { Store } from "@/types"
import { Link } from "@/i18n/routing"

const StoreLayout = ({ children }: { children: React.ReactNode }) => {

    const [isSeller, setIsSeller] = useState(false)
    const [loading, setLoading] = useState(true)
    const [storeInfo, setStoreInfo] = useState<Store | null>(null)

    const fetchIsSeller = async () => {
        // Giả lập kiểm tra quyền seller
        setIsSeller(true)
        setStoreInfo(dummyStoreData)
        setLoading(false)
    }

    useEffect(() => {
        fetchIsSeller()
    }, [])

    return loading ? (
        <Loading />
    ) : isSeller ? (
        <div className="flex flex-col h-screen bg-amber-50">

            <SellerNavbar />


            <div className="flex flex-1 items-start h-full overflow-y-auto no-scrollbar">
    
                <SellerSidebar storeInfo={storeInfo} />

                <div className="flex-1 h-full p-5 lg:pl-12 lg:pt-10 overflow-y-auto text-amber-900">
                    <div className="max-w-6xl mx-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    ) : (

        <div className="min-h-screen flex flex-col items-center justify-center text-center bg-amber-50 text-amber-900 px-6">
            <h1 className="text-2xl sm:text-4xl font-semibold text-amber-700">
                Bạn không có quyền truy cập trang này
            </h1>
            <Link
                href="/"
                className="bg-amber-700 hover:bg-amber-800 text-white flex items-center gap-2 mt-8 px-6 py-2 rounded-full shadow transition-all"
            >
                Quay lại trang chủ <ArrowRightIcon size={18} />
            </Link>
        </div>
    )
}

export default StoreLayout
