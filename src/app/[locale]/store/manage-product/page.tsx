"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import Loading from "@/components/base/Loading";
import { Product } from "@/types";
import { useAuth, useUser } from "@clerk/nextjs";
import axios from "axios";

export default function StoreManageProducts() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "₫";

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/store/product", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(
        (data.products || []).sort(
          (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
      );
    } catch (error) {
      console.error(error);
      toast.error("Lấy danh sách sản phẩm thất bại");
    } finally {
      setLoading(false);
    }
  };

  const toggleStock = async (productId: string) => {
    try {
      const token = await getToken();
      await axios.post(
        "/api/store/stock-toggle",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? { ...product, inStock: !product.inStock } : product
        )
      );
      toast.success("Cập nhật trạng thái sản phẩm thành công!");
    } catch (error) {
      console.error(error);
      toast.error("Cập nhật trạng thái sản phẩm thất bại");
    }
  };

  useEffect(() => {
    if (user) {
      fetchProducts();
    }
  }, [user]);

  if (loading) return <Loading />;

  return (
    <div className="text-[#5b4636]">
      <h1 className="mb-6 text-2xl font-semibold text-[#8b5e3c]">
        Quản lý <span className="font-bold text-[#3e2a18]">Sản phẩm</span>
      </h1>

      <div className="overflow-x-auto rounded-xl border border-[#d9c4a1] bg-[#fffaf3] shadow-lg">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#f5ede2] tracking-wider text-[#4b382a] uppercase">
            <tr>
              <th className="px-5 py-3">Tên sản phẩm</th>
              <th className="hidden px-5 py-3 md:table-cell">Mô tả</th>
              <th className="hidden px-5 py-3 md:table-cell">Giá niêm yết</th>
              <th className="px-5 py-3">Giá bán</th>
              <th className="px-5 py-3 text-center">Tình trạng</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e2d0b0]">
            {products.map((product) => (
              <tr key={product.id} className="transition-colors hover:bg-[#f8f3ec]">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <Image
                      width={48}
                      height={48}
                      className="rounded-md border border-[#d1b89e] shadow-sm"
                      src={product.images[0]}
                      alt={product.name}
                    />
                    <span className="font-medium text-[#3e2a18]">{product.name}</span>
                  </div>
                </td>
                <td className="hidden max-w-md truncate px-5 py-3 text-[#6b5c4a] md:table-cell">
                  {product.description}
                </td>
                <td className="hidden px-5 py-3 font-medium text-[#5b4636] md:table-cell">
                  {currency} {product.mrp.toLocaleString()}
                </td>
                <td className="px-5 py-3 font-semibold text-[#8b5e3c]">
                  {currency} {product.price.toLocaleString()}
                </td>
                <td className="px-5 py-3 text-center">
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      onChange={() =>
                        toast.promise(toggleStock(product.id), {
                          loading: "Đang cập nhật...",
                        })
                      }
                      checked={product.inStock}
                    />
                    <div className="h-6 w-11 rounded-full bg-[#cbbba0] transition-colors peer-checked:bg-[#8b5e3c]"></div>
                    <span className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
