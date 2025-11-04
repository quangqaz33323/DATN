"use client";
import { dummyStoreDashboardData } from "@/assets/assets";
import Loading from "@/components/base/Loading";
import { useRouter } from "@/i18n/routing";
import { StoreDashboardData } from "@/types";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { CircleDollarSignIcon, ShoppingBasketIcon, StarIcon, TagsIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Dashboard() {
  const { getToken } = useAuth();
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "₫";
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<StoreDashboardData>({
    totalProducts: 0,
    totalEarnings: 0,
    totalOrders: 0,
    ratings: [],
  });

  const dashboardCardsData = [
    { title: "Tổng số sản phẩm", value: dashboardData.totalProducts, icon: ShoppingBasketIcon },
    {
      title: "Tổng doanh thu",
      value: dashboardData.totalEarnings.toLocaleString() + currency,
      icon: CircleDollarSignIcon,
    },
    { title: "Tổng đơn hàng", value: dashboardData.totalOrders, icon: TagsIcon },
    { title: "Đánh giá nhận được", value: dashboardData.ratings.length, icon: StarIcon },
  ];

  const fetchDashboardData = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/store/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDashboardData(data.dashboard);
    } catch (error) {
      console.error(error);
      toast.error("Lấy dữ liệu bảng điều khiển thất bại");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="mb-28 text-stone-700">
      <h1 className="text-3xl font-semibold">
        Bảng điều khiển <span className="text-amber-700">Cửa hàng</span>
      </h1>

      <div className="my-10 mt-6 flex flex-wrap gap-6">
        {dashboardCardsData.map((card, index) => (
          <div
            key={index}
            className="flex items-center gap-10 rounded-2xl border border-amber-200 bg-amber-50/60 p-5 px-7 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex flex-col gap-3 text-sm">
              <p className="font-medium text-amber-800">{card.title}</p>
              <b className="text-3xl font-semibold text-stone-800">{card.value}</b>
            </div>
            <card.icon
              size={46}
              className="h-11 w-11 rounded-full bg-amber-100 p-2.5 text-amber-700"
            />
          </div>
        ))}
      </div>

      {/* Reviews */}
      <h2 className="mb-4 text-xl font-semibold text-amber-800">Đánh giá từ khách hàng</h2>

      <div className="mt-5">
        {dashboardData.ratings.length ? (
          dashboardData.ratings.map((review, index) => (
            <div
              key={index}
              className="flex max-w-4xl justify-between gap-5 border-b border-amber-200 py-6 text-sm max-sm:flex-col sm:items-center"
            >
              <div>
                <div className="flex items-center gap-3">
                  <Image
                    src={review.user.image}
                    alt={review.user.name}
                    className="h-10 w-10 rounded-full border border-amber-200"
                    width={100}
                    height={100}
                  />
                  <div>
                    <p className="font-medium text-stone-800">{review.user.name}</p>
                    <p className="text-xs text-stone-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="mt-3 max-w-xs leading-6 text-stone-600">{review.review}</p>
              </div>

              <div className="flex flex-col justify-between gap-5 sm:items-end">
                <div className="flex flex-col sm:items-end">
                  <p className="text-sm text-amber-700">{review.product?.category}</p>
                  <p className="font-medium text-stone-800">{review.product?.name}</p>
                  <div className="mt-1 flex items-center">
                    {Array(5)
                      .fill("")
                      .map((_, i) => (
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
                  className="rounded-full bg-amber-700 px-5 py-2 text-sm text-white shadow transition-all hover:bg-amber-800"
                >
                  Xem sản phẩm
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center text-lg text-stone-400">
            Chưa có đánh giá nào từ khách hàng.
          </div>
        )}
      </div>
    </div>
  );
}
