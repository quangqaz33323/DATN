"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { DeleteIcon } from "lucide-react";
import { Coupon } from "@/types";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";

export default function AdminCoupons() {
  const { getToken } = useAuth();
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  const [newCoupon, setNewCoupon] = useState({
    code: "",
    description: "",
    discount: 0,
    forNewUser: false,
    forMember: false,
    isPublic: false,
    expiresAt: new Date(),
  });

  const fetchCoupons = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/admin/coupons", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCoupons(data.coupons || []);
    } catch (error) {
      console.error(error);
      toast.error("Lấy danh sách coupon thất bại");
    }
  };

  const handleAddCoupon = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = await getToken();
      newCoupon.discount = Number(newCoupon.discount);
      newCoupon.expiresAt = new Date(newCoupon.expiresAt);

      await axios.post(
        "/api/admin/coupons",
        { coupon: newCoupon },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Thêm coupon thành công");

      await fetchCoupons();
    } catch (error) {
      console.error(error);
      toast.error("Thêm coupon thất bại");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCoupon({ ...newCoupon, [e.target.name]: e.target.value });
  };

  const deleteCoupon = async (code: Coupon["code"]) => {
    // Logic để xóa coupon
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <div className="mb-40 text-stone-600">
      <form
        onSubmit={(e) => toast.promise(handleAddCoupon(e), { loading: "Đang thêm coupon..." })}
        className="max-w-sm rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm shadow-sm"
      >
        <h2 className="text-2xl font-semibold">
          Thêm <span className="font-bold text-amber-900">Mã giảm giá</span>
        </h2>

        <div className="mt-4 flex gap-2 max-sm:flex-col">
          <input
            type="text"
            placeholder="Mã coupon"
            className="w-full rounded-md border border-amber-200 bg-white p-2 outline-amber-400 focus:ring-2 focus:ring-amber-300"
            name="code"
            value={newCoupon.code}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            placeholder="Giảm giá (%)"
            min={1}
            max={100}
            className="w-full rounded-md border border-amber-200 bg-white p-2 outline-amber-400 focus:ring-2 focus:ring-amber-300"
            name="discount"
            value={newCoupon.discount}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="text"
          placeholder="Mô tả coupon"
          className="mt-3 w-full rounded-md border border-amber-200 bg-white p-2 outline-amber-400 focus:ring-2 focus:ring-amber-300"
          name="description"
          value={newCoupon.description}
          onChange={handleChange}
          required
        />

        <label>
          <p className="mt-4 font-medium text-stone-700">Ngày hết hạn</p>
          <input
            type="date"
            className="mt-1 w-full rounded-md border border-amber-200 bg-white p-2 outline-amber-400 focus:ring-2 focus:ring-amber-300"
            name="expiresAt"
            value={format(newCoupon.expiresAt, "yyyy-MM-dd")}
            onChange={handleChange}
          />
        </label>

        <div className="mt-5 space-y-3">
          <div className="flex items-center gap-3">
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                name="forNewUser"
                checked={newCoupon.forNewUser}
                onChange={(e) => setNewCoupon({ ...newCoupon, forNewUser: e.target.checked })}
              />
              <div className="peer h-6 w-11 rounded-full bg-stone-300 transition-colors duration-200 peer-checked:bg-amber-700"></div>
              <span className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform duration-200 peer-checked:translate-x-5"></span>
            </label>
            <p>Dành cho người mới</p>
          </div>

          <div className="flex items-center gap-3">
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                className="peer sr-only"
                name="forMember"
                checked={newCoupon.forMember}
                onChange={(e) => setNewCoupon({ ...newCoupon, forMember: e.target.checked })}
              />
              <div className="peer h-6 w-11 rounded-full bg-stone-300 transition-colors duration-200 peer-checked:bg-amber-700"></div>
              <span className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white transition-transform duration-200 peer-checked:translate-x-5"></span>
            </label>
            <p>Dành cho thành viên</p>
          </div>
        </div>

        <button className="mt-5 w-full rounded-lg bg-amber-700 py-2 font-medium text-white transition hover:bg-amber-800 active:scale-95">
          Thêm mã
        </button>
      </form>

      <div className="mt-14">
        <h2 className="text-2xl font-semibold">
          Danh sách <span className="font-bold text-amber-900">Coupon</span>
        </h2>

        <div className="mt-5 max-w-4xl overflow-x-auto rounded-xl border border-amber-200 bg-amber-50 shadow-sm">
          <table className="min-w-full text-sm text-stone-700">
            <thead className="bg-amber-100">
              <tr>
                {["Mã", "Mô tả", "Giảm giá", "Hết hạn", "Người mới", "Thành viên", "Hành động"].map(
                  (h) => (
                    <th key={h} className="px-4 py-3 text-left font-semibold text-amber-900">
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-amber-200">
              {coupons.map((coupon) => (
                <tr key={coupon.code} className="hover:bg-amber-100/60">
                  <td className="px-4 py-3 font-medium text-amber-900">{coupon.code}</td>
                  <td className="px-4 py-3">{coupon.description}</td>
                  <td className="px-4 py-3">{coupon.discount}%</td>
                  <td className="px-4 py-3">{format(coupon.expiresAt, "yyyy-MM-dd")}</td>
                  <td className="px-4 py-3">{coupon.forNewUser ? "Có" : "Không"}</td>
                  <td className="px-4 py-3">{coupon.forMember ? "Có" : "Không"}</td>
                  <td className="px-4 py-3">
                    <DeleteIcon
                      onClick={() =>
                        toast.promise(deleteCoupon(coupon.code), { loading: "Đang xóa..." })
                      }
                      className="h-5 w-5 cursor-pointer text-red-500 hover:text-red-700"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
