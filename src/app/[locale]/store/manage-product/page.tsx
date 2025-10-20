'use client'
import { useEffect, useState } from "react"
import Image from "next/image"
import { productDummyData } from "@/assets/assets"
import { toast } from "sonner"
import Loading from "@/components/base/Loading"
import { Product } from "@/types"

export default function StoreManageProducts() {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '₫'

    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState<Product[]>([])

    const fetchProducts = async () => {
        setProducts(productDummyData)
        setLoading(false)
    }

    const toggleStock = async (productId: string) => {
        // Giả lập toggle trạng thái hàng tồn
        toast.success("Cập nhật trạng thái sản phẩm thành công!")
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    if (loading) return <Loading />

    return (
        <div className="text-[#5b4636]">
            <h1 className="text-2xl text-[#8b5e3c] mb-6 font-semibold">
                Quản lý <span className="text-[#3e2a18] font-bold">Sản phẩm</span>
            </h1>

            <div className="overflow-x-auto shadow-lg rounded-xl border border-[#d9c4a1] bg-[#fffaf3]">
                <table className="w-full text-left text-sm">
                    <thead className="bg-[#f5ede2] text-[#4b382a] uppercase tracking-wider">
                        <tr>
                            <th className="px-5 py-3">Tên sản phẩm</th>
                            <th className="px-5 py-3 hidden md:table-cell">Mô tả</th>
                            <th className="px-5 py-3 hidden md:table-cell">Giá niêm yết</th>
                            <th className="px-5 py-3">Giá bán</th>
                            <th className="px-5 py-3 text-center">Tình trạng</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e2d0b0]">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-[#f8f3ec] transition-colors">
                                <td className="px-5 py-3">
                                    <div className="flex gap-3 items-center">
                                        <Image
                                            width={48}
                                            height={48}
                                            className="rounded-md shadow-sm border border-[#d1b89e]"
                                            src={product.images[0]}
                                            alt={product.name}
                                        />
                                        <span className="font-medium text-[#3e2a18]">{product.name}</span>
                                    </div>
                                </td>
                                <td className="px-5 py-3 max-w-md text-[#6b5c4a] hidden md:table-cell truncate">
                                    {product.description}
                                </td>
                                <td className="px-5 py-3 hidden md:table-cell font-medium text-[#5b4636]">
                                    {currency} {product.mrp.toLocaleString()}
                                </td>
                                <td className="px-5 py-3 font-semibold text-[#8b5e3c]">
                                    {currency} {product.price.toLocaleString()}
                                </td>
                                <td className="px-5 py-3 text-center">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="sr-only peer"
                                            onChange={() =>
                                                toast.promise(toggleStock(product.id), {
                                                    loading: "Đang cập nhật...",
                                                    success: "Đã thay đổi trạng thái sản phẩm!",
                                                    error: "Cập nhật thất bại",
                                                })
                                            }
                                            checked={product.inStock}
                                        />
                                        <div className="w-11 h-6 bg-[#cbbba0] rounded-full peer-checked:bg-[#8b5e3c] transition-colors"></div>
                                        <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                                    </label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
