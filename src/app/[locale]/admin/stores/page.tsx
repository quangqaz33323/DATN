'use client'

import { storesDummyData } from "@/assets/assets"
import StoreInfo from "@/components/admin/StoreInfo"
import Loading from "@/components/base/Loading"
import { Store } from "@/types"
import { useEffect, useState } from "react"
import { toast } from "sonner"


export default function AdminStores() {
  const [stores, setStores] = useState<Store[]>([])
  const [loading, setLoading] = useState(true)

  const fetchStores = async () => {
    setStores(storesDummyData)
    setLoading(false)
  }

  const toggleIsActive = async (storeId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    toast.success("Cập nhật trạng thái cửa hàng thành công 🎉")
  }

  useEffect(() => {
    fetchStores()
  }, [])

  return !loading ? (
    <div className="text-amber-900 mb-28">

      <h1 className="text-3xl font-bold text-amber-800 tracking-tight mb-6">
        Quản lý <span className="text-amber-700 font-normal">Cửa hàng</span>
      </h1>


      {stores.length ? (
        <div className="flex flex-col gap-6 mt-4">
          {stores.map((store) => (
            <div
              key={store.id}
              className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border border-amber-200 rounded-2xl shadow-md hover:shadow-lg transition-all p-6 flex max-md:flex-col gap-4 md:items-end max-w-4xl"
            >
   
              <StoreInfo store={store} />

              <div className="flex items-center gap-3 pt-2 flex-wrap">
                <p className="text-amber-800 font-medium">Trạng thái:</p>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    onChange={() =>
                      toast.promise(toggleIsActive(store.id), {
                        loading: "Đang cập nhật...",
                        success: "Cập nhật thành công!",
                        error: "Không thể cập nhật!",
                      })
                    }
                    checked={store.isActive}
                  />
                  <div className="w-10 h-6 bg-amber-200 rounded-full peer peer-checked:bg-amber-600 transition-colors duration-300"></div>
                  <span className="dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 ease-in-out peer-checked:translate-x-4"></span>
                </label>
                <span
                  className={`text-sm font-medium ${
                    store.isActive ? "text-green-700" : "text-amber-500"
                  }`}
                >
                  {store.isActive ? "Đang hoạt động" : "Tạm dừng"}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-80">
          <h1 className="text-3xl text-amber-400 font-medium">
            Chưa có cửa hàng nào
          </h1>
        </div>
      )}
    </div>
  ) : (
    <Loading />
  )
}