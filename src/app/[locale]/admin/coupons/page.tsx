'use client'
import { useEffect, useState } from "react"
import { format } from "date-fns"
import { toast } from "sonner"
import { DeleteIcon } from "lucide-react"
import { couponDummyData } from "@/assets/assets"
import { Coupon } from "@/types"

export default function AdminCoupons() {

    const [coupons, setCoupons] = useState<Coupon[]>([])

    const [newCoupon, setNewCoupon] = useState({
        code: '',
        description: '',
        discount: '',
        forNewUser: false,
        forMember: false,
        isPublic: false,
        expiresAt: new Date()
    })

    const fetchCoupons = async () => {
        setCoupons(couponDummyData)
    }

    const handleAddCoupon = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Logic để thêm coupon mới
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCoupon({ ...newCoupon, [e.target.name]: e.target.value })
    }

    const deleteCoupon = async (code: Coupon['code']) => {
        // Logic để xóa coupon
    }

    useEffect(() => {
        fetchCoupons()
    }, [])

    return (
        <div className="text-stone-600 mb-40">

   
            <form
                onSubmit={(e) => toast.promise(handleAddCoupon(e), { loading: "Đang thêm coupon..." })}
                className="max-w-sm text-sm bg-amber-50 border border-amber-200 rounded-xl p-5 shadow-sm"
            >
                <h2 className="text-2xl font-semibold">
                    Thêm <span className="text-amber-900 font-bold">Mã giảm giá</span>
                </h2>

                <div className="flex gap-2 max-sm:flex-col mt-4">
                    <input
                        type="text"
                        placeholder="Mã coupon"
                        className="w-full p-2 border border-amber-200 outline-amber-400 rounded-md bg-white focus:ring-2 focus:ring-amber-300"
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
                        className="w-full p-2 border border-amber-200 outline-amber-400 rounded-md bg-white focus:ring-2 focus:ring-amber-300"
                        name="discount"
                        value={newCoupon.discount}
                        onChange={handleChange}
                        required
                    />
                </div>

                <input
                    type="text"
                    placeholder="Mô tả coupon"
                    className="w-full mt-3 p-2 border border-amber-200 outline-amber-400 rounded-md bg-white focus:ring-2 focus:ring-amber-300"
                    name="description"
                    value={newCoupon.description}
                    onChange={handleChange}
                    required
                />

                <label>
                    <p className="mt-4 font-medium text-stone-700">Ngày hết hạn</p>
                    <input
                        type="date"
                        className="w-full mt-1 p-2 border border-amber-200 outline-amber-400 rounded-md bg-white focus:ring-2 focus:ring-amber-300"
                        name="expiresAt"
                        value={format(newCoupon.expiresAt, 'yyyy-MM-dd')}
                        onChange={handleChange}
                    />
                </label>

                <div className="mt-5 space-y-3">
                    <div className="flex items-center gap-3">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                name="forNewUser"
                                checked={newCoupon.forNewUser}
                                onChange={(e) =>
                                    setNewCoupon({ ...newCoupon, forNewUser: e.target.checked })
                                }
                            />
                            <div className="w-11 h-6 bg-stone-300 rounded-full peer peer-checked:bg-amber-700 transition-colors duration-200"></div>
                            <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-5"></span>
                        </label>
                        <p>Dành cho người mới</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                name="forMember"
                                checked={newCoupon.forMember}
                                onChange={(e) =>
                                    setNewCoupon({ ...newCoupon, forMember: e.target.checked })
                                }
                            />
                            <div className="w-11 h-6 bg-stone-300 rounded-full peer peer-checked:bg-amber-700 transition-colors duration-200"></div>
                            <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-5"></span>
                        </label>
                        <p>Dành cho thành viên</p>
                    </div>
                </div>

                <button
                    className="mt-5 w-full py-2 rounded-lg bg-amber-700 text-white font-medium hover:bg-amber-800 active:scale-95 transition"
                >
                    Thêm mã
                </button>
            </form>

   
            <div className="mt-14">
                <h2 className="text-2xl font-semibold">
                    Danh sách <span className="text-amber-900 font-bold">Coupon</span>
                </h2>

                <div className="overflow-x-auto mt-5 rounded-xl border border-amber-200 max-w-4xl shadow-sm bg-amber-50">
                    <table className="min-w-full text-sm text-stone-700">
                        <thead className="bg-amber-100">
                            <tr>
                                {["Mã", "Mô tả", "Giảm giá", "Hết hạn", "Người mới", "Thành viên", "Hành động"].map((h) => (
                                    <th key={h} className="py-3 px-4 text-left font-semibold text-amber-900">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-amber-200">
                            {coupons.map((coupon) => (
                                <tr key={coupon.code} className="hover:bg-amber-100/60">
                                    <td className="py-3 px-4 font-medium text-amber-900">{coupon.code}</td>
                                    <td className="py-3 px-4">{coupon.description}</td>
                                    <td className="py-3 px-4">{coupon.discount}%</td>
                                    <td className="py-3 px-4">{format(coupon.expiresAt, 'yyyy-MM-dd')}</td>
                                    <td className="py-3 px-4">{coupon.forNewUser ? 'Có' : 'Không'}</td>
                                    <td className="py-3 px-4">{coupon.forMember ? 'Có' : 'Không'}</td>
                                    <td className="py-3 px-4">
                                        <DeleteIcon
                                            onClick={() =>
                                                toast.promise(deleteCoupon(coupon.code), { loading: "Đang xóa..." })
                                            }
                                            className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
