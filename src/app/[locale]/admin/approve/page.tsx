'use client'
import { storesDummyData } from "@/assets/assets"
import StoreInfo from "@/components/admin/StoreInfo"
import Loading from "@/components/base/Loading"
import { Store } from "@/types"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function AdminApprove() {

    const [stores, setStores] = useState<Store[]>([])
    const [loading, setLoading] = useState(true)

    const fetchStores = async () => {
        setStores(storesDummyData)
        setLoading(false)
    }

    const handleApprove = async ({ storeId, status }: { storeId: string, status: Store['status'] }) => {
        // Logic xử lý duyệt cửa hàng
    }

    useEffect(() => {
        fetchStores()
    }, [])

    return !loading ? (
        <div className="text-stone-600 mb-28">
            <h1 className="text-2xl font-semibold">
                Duyệt <span className="text-amber-900 font-bold">Cửa hàng</span>
            </h1>

            {stores.length ? (
                <div className="flex flex-col gap-4 mt-6">
                    {stores.map((store) => (
                        <div
                            key={store.id}
                            className="bg-amber-50 border border-amber-200 rounded-xl shadow-sm p-6 flex max-md:flex-col gap-4 md:items-end max-w-4xl transition hover:shadow-md"
                        >
                          
                            <StoreInfo store={store} />

                         
                            <div className="flex gap-3 pt-2 flex-wrap">
                                <button
                                    onClick={() =>
                                        toast.promise(
                                            handleApprove({ storeId: store.id, status: 'approved' }),
                                            { loading: "Đang duyệt..." }
                                        )
                                    }
                                    className="px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition text-sm font-medium"
                                >
                                    Duyệt
                                </button>

                                <button
                                    onClick={() =>
                                        toast.promise(
                                            handleApprove({ storeId: store.id, status: 'rejected' }),
                                            { loading: "Đang từ chối..." }
                                        )
                                    }
                                    className="px-4 py-2 bg-stone-500 text-white rounded-lg hover:bg-stone-600 transition text-sm font-medium"
                                >
                                    Từ chối
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center h-80">
                    <h1 className="text-3xl text-stone-400 font-medium">
                        Không có cửa hàng chờ duyệt
                    </h1>
                </div>
            )}
        </div>
    ) : (
        <Loading />
    )
}
