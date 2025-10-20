'use client'
import { dummyStoreDashboardData } from "@/assets/assets"
import Loading from "@/components/base/Loading"
import { useRouter } from "@/i18n/routing"
import { StoreDashboardData } from "@/types"
import { CircleDollarSignIcon, ShoppingBasketIcon, StarIcon, TagsIcon } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Dashboard() {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '₫'
    const router = useRouter()

    const [loading, setLoading] = useState(true)
    const [dashboardData, setDashboardData] = useState<StoreDashboardData>({
        totalProducts: 0,
        totalEarnings: 0,
        totalOrders: 0,
        ratings: [],
    })

    const dashboardCardsData = [
        { title: 'Tổng số sản phẩm', value: dashboardData.totalProducts, icon: ShoppingBasketIcon },
        { title: 'Tổng doanh thu', value: currency + dashboardData.totalEarnings.toLocaleString(), icon: CircleDollarSignIcon },
        { title: 'Tổng đơn hàng', value: dashboardData.totalOrders, icon: TagsIcon },
        { title: 'Đánh giá nhận được', value: dashboardData.ratings.length, icon: StarIcon },
    ]

    const fetchDashboardData = async () => {
        setDashboardData(dummyStoreDashboardData)
        setLoading(false)
    }

    useEffect(() => {
        fetchDashboardData()
    }, [])

    if (loading) return <Loading />

    return (
        <div className="text-stone-700 mb-28">
            <h1 className="text-3xl font-semibold">
                Bảng điều khiển <span className="text-amber-700">Cửa hàng</span>
            </h1>

            {/* Dashboard cards */}
            <div className="flex flex-wrap gap-6 my-10 mt-6">
                {dashboardCardsData.map((card, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-10 border border-amber-200 bg-amber-50/60 p-5 px-7 rounded-2xl shadow-sm hover:shadow-md transition-all"
                    >
                        <div className="flex flex-col gap-3 text-sm">
                            <p className="text-amber-800 font-medium">{card.title}</p>
                            <b className="text-3xl font-semibold text-stone-800">{card.value}</b>
                        </div>
                        <card.icon
                            size={46}
                            className="w-11 h-11 p-2.5 text-amber-700 bg-amber-100 rounded-full"
                        />
                    </div>
                ))}
            </div>

            {/* Reviews */}
            <h2 className="text-xl font-semibold text-amber-800 mb-4">Đánh giá từ khách hàng</h2>

            <div className="mt-5">
                {dashboardData.ratings.length ? (
                    dashboardData.ratings.map((review, index) => (
                        <div
                            key={index}
                            className="flex max-sm:flex-col gap-5 sm:items-center justify-between py-6 border-b border-amber-200 text-sm max-w-4xl"
                        >
                            <div>
                                <div className="flex gap-3 items-center">
                                    <Image
                                        src={review.user.image}
                                        alt={review.user.name}
                                        className="w-10 h-10 rounded-full border border-amber-200"
                                        width={100}
                                        height={100}
                                    />
                                    <div>
                                        <p className="font-medium text-stone-800">{review.user.name}</p>
                                        <p className="text-xs text-stone-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <p className="mt-3 text-stone-600 max-w-xs leading-6">{review.review}</p>
                            </div>

                            <div className="flex flex-col justify-between gap-5 sm:items-end">
                                <div className="flex flex-col sm:items-end">
                                    <p className="text-amber-700 text-sm">{review.product?.category}</p>
                                    <p className="font-medium text-stone-800">{review.product?.name}</p>
                                    <div className="flex items-center mt-1">
                                        {Array(5).fill('').map((_, i) => (
                                            <StarIcon
                                                key={i}
                                                size={17}
                                                className="text-amber-400"
                                                fill={review.rating >= i + 1 ? "#D97706" : "#E7E5E4"}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={() => router.push(`/product/${review.product.id}`)}
                                    className="bg-amber-700 hover:bg-amber-800 text-white px-5 py-2 rounded-full text-sm shadow transition-all"
                                >
                                    Xem sản phẩm
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-stone-400 text-lg py-12">
                        Chưa có đánh giá nào từ khách hàng.
                    </div>
                )}
            </div>
        </div>
    )
}
