"use client";

import { useEffect, useState } from "react";
import { ArrowRightIcon } from "lucide-react";
import SellerNavbar from "./StoreNavbar";
import SellerSidebar from "./StoreSidebar";
import Loading from "../base/Loading";
import { Store } from "@/types";
import { Link } from "@/i18n/routing";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { toast } from "sonner";

const StoreLayout = ({ children }: { children: React.ReactNode }) => {
  const { getToken } = useAuth();
  const [isSeller, setIsSeller] = useState(false);
  const [loading, setLoading] = useState(true);
  const [storeInfo, setStoreInfo] = useState<Store | null>(null);

  const fetchIsSeller = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/store/is-seller", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsSeller(data.isSeller);
      setStoreInfo(data.storeInfo);
    } catch (error) {
      console.error("Error fetching seller status:", error);
      toast.error("Lỗi khi kiểm tra quyền bán hàng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIsSeller();
  }, []);

  return loading ? (
    <Loading />
  ) : isSeller ? (
    <div className="flex h-screen flex-col bg-amber-50">
      <SellerNavbar />

      <div className="no-scrollbar flex h-full flex-1 items-start overflow-y-auto">
        <SellerSidebar storeInfo={storeInfo} />

        <div className="h-full flex-1 p-5 text-amber-900 lg:pt-10 lg:pl-12">
          <div className="mx-auto max-w-[1380px]">{children}</div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex min-h-screen flex-col items-center justify-center bg-amber-50 px-6 text-center text-amber-900">
      <h1 className="text-2xl font-semibold text-amber-700 sm:text-4xl">
        Bạn không có quyền truy cập trang này
      </h1>
      <Link
        href="/"
        className="mt-8 flex items-center gap-2 rounded-full bg-amber-700 px-6 py-2 text-white shadow transition-all hover:bg-amber-800"
      >
        Quay lại trang chủ <ArrowRightIcon size={18} />
      </Link>
    </div>
  );
};

export default StoreLayout;
