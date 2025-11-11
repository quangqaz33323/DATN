"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MailIcon, MapPinIcon } from "lucide-react";
import Image from "next/image";
import ProductCard from "@/components/base/ProductCard";
import Loading from "@/components/base/Loading";
import { Product, Store } from "@/types";
import axios from "axios";
import { toast } from "sonner";

export default function StoreShop() {
  const { username } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [storeInfo, setStoreInfo] = useState<Store>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchStoreData = async () => {
    try {
      const { data } = await axios.get(`/api/store/data?username=${username}`);

      setStoreInfo(data.store || {});
      setProducts(data.store.Product || []);
      setLoading(false);
    } catch {
      toast.error("Lỗi khi tải dữ liệu cửa hàng.");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchStoreData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !loading ? (
    <div className="mx-6 min-h-[70vh] text-[#4b2e14]">
      {storeInfo && (
        <div className="mx-auto mt-8 flex max-w-7xl flex-col items-center gap-8 rounded-2xl border border-[#e8ded0] bg-[#fffaf4] p-8 shadow-md transition-all duration-300 hover:shadow-lg md:flex-row md:p-12">
          <Image
            src={storeInfo.logo}
            alt={storeInfo.name}
            className="size-36 rounded-xl border-2 border-[#d9b98c] object-cover shadow-sm"
            width={200}
            height={200}
          />
          <div className="space-y-3 text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight text-[#3a2312] uppercase">
              {storeInfo.name}
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-[#6b4b2f] italic">
              {storeInfo.description}
            </p>

            <div className="space-y-2 pt-3 text-sm text-[#5a3a1e]">
              <div className="flex items-center justify-center md:justify-start">
                <MapPinIcon className="mr-2 h-4 w-4 text-[#c17f39]" />
                <span>{storeInfo.address}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <MailIcon className="mr-2 h-4 w-4 text-[#c17f39]" />
                <span>{storeInfo.email}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto mb-40 max-w-7xl">
        <h1 className="mt-16 mb-6 text-2xl font-semibold text-[#3a2312]">
          Sản phẩm của <span className="font-bold text-[#a06b3b]">{storeInfo?.name}</span>
        </h1>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:gap-10">
            {products.map((product) => (
              <div
                key={product.id}
                className="transition-transform duration-300 hover:scale-[1.02]"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-20 text-center text-lg text-[#a78b70]">
            Hiện chưa có sản phẩm nào được trưng bày.
          </div>
        )}
      </div>
    </div>
  ) : (
    <Loading />
  );
}
