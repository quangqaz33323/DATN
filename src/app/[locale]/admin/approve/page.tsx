"use client";
import { storesDummyData } from "@/assets/assets";
import StoreInfo from "@/components/admin/StoreInfo";
import Loading from "@/components/base/Loading";
import { Store } from "@/types";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminApprove() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStores = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/admin/approve-store", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStores(data);
    } catch (error) {
      toast.error("Failed to fetch pending stores");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async ({
    storeId,
    status,
  }: {
    storeId: string;
    status: Store["status"];
  }) => {
    try {
      const token = await getToken();
      await axios.post(
        "/api/admin/approve-store",
        { storeId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Cửa hàng đã được duyệt");
      await fetchStores();
    } catch (error) {
      toast.error("Failed to approve store");
    }
  };

  useEffect(() => {
    if (user) {
      fetchStores();
    }
  }, [user]);

  return !loading ? (
    <div className="mb-28 text-stone-600">
      <h1 className="text-2xl font-semibold">
        Duyệt <span className="font-bold text-amber-900">Cửa hàng</span>
      </h1>

      {stores.length ? (
        <div className="mt-6 flex flex-col gap-4">
          {stores.map((store) => (
            <div
              key={store.id}
              className="flex max-w-4xl gap-4 rounded-xl border border-amber-200 bg-amber-50 p-6 shadow-sm transition hover:shadow-md max-md:flex-col md:items-end"
            >
              <StoreInfo store={store} />

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() =>
                    toast.promise(handleApprove({ storeId: store.id, status: "approved" }), {
                      loading: "Đang duyệt...",
                    })
                  }
                  className="rounded-lg bg-amber-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-800"
                >
                  Duyệt
                </button>

                <button
                  onClick={() =>
                    toast.promise(handleApprove({ storeId: store.id, status: "rejected" }), {
                      loading: "Đang từ chối...",
                    })
                  }
                  className="rounded-lg bg-stone-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-600"
                >
                  Từ chối
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex h-80 items-center justify-center">
          <h1 className="text-3xl font-medium text-stone-400">Không có cửa hàng chờ duyệt</h1>
        </div>
      )}
    </div>
  ) : (
    <Loading />
  );
}
