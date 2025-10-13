'use client'

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { MailIcon, MapPinIcon } from "lucide-react"
import Image from "next/image"
import { dummyStoreData, productDummyData } from "@/assets/assets"
import ProductCard from "@/components/base/ProductCard"
import Loading from "@/components/base/Loading"
import { Product, Store } from "@/types"

export default function StoreShop() {
    const { username } = useParams()
    const [products, setProducts] = useState<Product[]>([])
    const [storeInfo, setStoreInfo] = useState<Store>()
    const [loading, setLoading] = useState<boolean>(true)

    const fetchStoreData = async () => {
        setStoreInfo(dummyStoreData)
        setProducts(productDummyData)
        setLoading(false)
    }

    useEffect(() => {
        fetchStoreData()
    }, [])

    return !loading ? (
        <div className="min-h-[70vh] mx-6 text-[#4b2e14]">
      
            {storeInfo && (
                <div className="max-w-7xl mx-auto bg-[#fffaf4] rounded-2xl p-8 md:p-12 mt-8 flex flex-col md:flex-row items-center gap-8 shadow-md border border-[#e8ded0] hover:shadow-lg transition-all duration-300">
                    <Image
                        src={storeInfo.logo}
                        alt={storeInfo.name}
                        className="size-36 object-cover border-2 border-[#d9b98c] rounded-xl shadow-sm"
                        width={200}
                        height={200}
                    />
                    <div className="text-center md:text-left space-y-3">
                        <h1 className="text-3xl font-bold text-[#3a2312] tracking-tight uppercase">
                            {storeInfo.name}
                        </h1>
                        <p className="text-base text-[#6b4b2f] leading-relaxed max-w-xl italic">
                            {storeInfo.description}
                        </p>

                        <div className="space-y-2 pt-3 text-sm text-[#5a3a1e]">
                            <div className="flex items-center justify-center md:justify-start">
                                <MapPinIcon className="w-4 h-4 text-[#c17f39] mr-2" />
                                <span>{storeInfo.address}</span>
                            </div>
                            <div className="flex items-center justify-center md:justify-start">
                                <MailIcon className="w-4 h-4 text-[#c17f39] mr-2" />
                                <span>{storeInfo.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

    
            <div className="max-w-7xl mx-auto mb-40">
                <h1 className="text-2xl font-semibold mt-16 mb-6 text-[#3a2312]">
                    Sản phẩm của <span className="text-[#a06b3b] font-bold">{storeInfo?.name}</span>
                </h1>

                {products.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 xl:gap-10">
                        {products.map((product) => (
                            <div  key={product.id} className="hover:scale-[1.02] transition-transform duration-300">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-[#a78b70] mt-20 text-lg">
                        Hiện chưa có sản phẩm nào được trưng bày.
                    </div>
                )}
            </div>
        </div>
    ) : (
        <Loading />
    )
}
