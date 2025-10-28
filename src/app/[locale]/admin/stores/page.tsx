"use client";

import { storesDummyData } from "@/assets/assets";
import StoreInfo from "@/components/admin/StoreInfo";
import Loading from "@/components/base/Loading";
import { Store } from "@/types";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminStores() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStores = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/admin/stores", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStores(data);
    } catch (error) {
      toast.error("Failed to fetch stores");
    } finally {
      setLoading(false);
    }
  };

  const toggleIsActive = async (storeId: string) => {
    try {
      const token = await getToken();
      await axios.post(
        "/api/admin/toggle-store",
        { storeId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Cập nhật trạng thái cửa hàng thành công 🎉");
      await fetchStores();
    } catch (error) {
      toast.error("Failed to toggle store active status");
    }
  };

  useEffect(() => {
    if (user) {
      fetchStores();
    }
  }, [user]);

  return !loading ? (
    <div className="mb-28 text-amber-900">
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-amber-800">
        Quản lý <span className="font-normal text-amber-700">Cửa hàng</span>
      </h1>

      {stores.length ? (
        <div className="mt-4 flex flex-col gap-6">
          {stores.map((store) => (
            <div
              key={store.id}
              className="flex max-w-4xl gap-4 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-6 shadow-md transition-all hover:shadow-lg max-md:flex-col md:items-end"
            >
              <StoreInfo store={store} />

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <p className="font-medium text-amber-800">Trạng thái:</p>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    onChange={() =>
                      toast.promise(toggleIsActive(store.id), {
                        loading: "Đang cập nhật...",
                        success: "Cập nhật thành công!",
                        error: "Không thể cập nhật!",
                      })
                    }
                    checked={store.isActive}
                  />
                  <div className="peer h-6 w-10 rounded-full bg-amber-200 transition-colors duration-300 peer-checked:bg-amber-600"></div>
                  <span className="dot absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform duration-300 ease-in-out peer-checked:translate-x-4"></span>
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
        <div className="flex h-80 items-center justify-center">
          <h1 className="text-3xl font-medium text-amber-400">Chưa có cửa hàng nào</h1>
        </div>
      )}
    </div>
  ) : (
    <Loading />
  );
}
