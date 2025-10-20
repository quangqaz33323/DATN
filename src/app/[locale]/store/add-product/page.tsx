'use client'
import { assets } from "@/assets/assets"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"

export default function StoreAddProduct() {


    const categories = [
        'Bàn & Ghế',
        'Tủ & Kệ',
        'Giường & Nội thất phòng ngủ',
        'Trang trí nhà cửa',
        'Dụng cụ gỗ',
        'Thủ công mỹ nghệ',
        'Khác'
    ]

    const [images, setImages] = useState<{ [key: number]: File | null }>({
        1: null, 2: null, 3: null, 4: null
    })
    const [productInfo, setProductInfo] = useState({
        name: "",
        description: "",
        mrp: 0,
        price: 0,
        category: "",
    })
    const [loading, setLoading] = useState(false)

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProductInfo({ ...productInfo, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Logic thêm sản phẩm ở đây
            toast.success("Thêm sản phẩm thành công!")
        } catch (err) {
            toast.error("Không thể thêm sản phẩm. Vui lòng thử lại!")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form
            onSubmit={e =>
                toast.promise(onSubmitHandler(e), {
                    loading: "Đang thêm sản phẩm...",
                    success: "Thêm sản phẩm thành công!",
                    error: "Có lỗi xảy ra!",
                })
            }
            className="text-[#5b4636] mb-28"
        >
            <h1 className="text-2xl text-[#8b5e3c] mb-6 font-semibold">
                Thêm <span className="text-[#3e2a18] font-bold">Sản phẩm mới</span>
            </h1>

            <p className="mt-5 font-medium">Hình ảnh sản phẩm</p>

            <div className="flex flex-wrap gap-4 mt-3">
                {Object.keys(images).map((key) => (
                    <label key={key} htmlFor={`images${key}`} className="cursor-pointer">
                        <Image
                            width={160}
                            height={160}
                            className="border border-[#d9c4a1] bg-[#fffaf3] rounded-lg shadow-sm hover:shadow-md transition-all w-40 h-40 object-cover"
                            src={images[key as any]
                                ? URL.createObjectURL(images[key as any] as File)
                                : assets.upload_area}
                            alt="product upload"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            id={`images${key}`}
                            onChange={(e) =>
                                setImages({
                                    ...images,
                                    [key as any]: e.target.files?.[0] || null,
                                })
                            }
                            hidden
                        />
                    </label>
                ))}
            </div>

            <label className="flex flex-col gap-2 my-5">
                Tên sản phẩm
                <input
                    type="text"
                    name="name"
                    onChange={onChangeHandler}
                    value={productInfo.name}
                    placeholder="Nhập tên sản phẩm"
                    className="w-full max-w-sm p-3 px-4 bg-[#fffaf3] border border-[#d9c4a1] rounded focus:ring-2 focus:ring-[#c9a87b] outline-none transition"
                    required
                />
            </label>

            <label className="flex flex-col gap-2 my-5">
                Mô tả
                <textarea
                    name="description"
                    onChange={onChangeHandler}
                    value={productInfo.description}
                    placeholder="Mô tả ngắn gọn về sản phẩm..."
                    rows={5}
                    className="w-full max-w-sm p-3 px-4 bg-[#fffaf3] border border-[#d9c4a1] rounded resize-none focus:ring-2 focus:ring-[#c9a87b] outline-none transition"
                    required
                />
            </label>

            <div className="flex gap-6 flex-wrap">
                <label className="flex flex-col gap-2">
                    Giá gốc (₫)
                    <input
                        type="number"
                        name="mrp"
                        onChange={onChangeHandler}
                        value={productInfo.mrp}
                        placeholder="0"
                        className="w-full max-w-[180px] p-3 px-4 bg-[#fffaf3] border border-[#d9c4a1] rounded focus:ring-2 focus:ring-[#c9a87b] outline-none transition"
                        required
                    />
                </label>

                <label className="flex flex-col gap-2">
                    Giá khuyến mãi (₫)
                    <input
                        type="number"
                        name="price"
                        onChange={onChangeHandler}
                        value={productInfo.price}
                        placeholder="0"
                        className="w-full max-w-[180px] p-3 px-4 bg-[#fffaf3] border border-[#d9c4a1] rounded focus:ring-2 focus:ring-[#c9a87b] outline-none transition"
                        required
                    />
                </label>
            </div>

            <label className="flex flex-col gap-2 my-6">
                Danh mục sản phẩm
                <select
                    onChange={e => setProductInfo({ ...productInfo, category: e.target.value })}
                    value={productInfo.category}
                    className="w-full max-w-sm p-3 px-4 bg-[#fffaf3] border border-[#d9c4a1] rounded focus:ring-2 focus:ring-[#c9a87b] outline-none transition"
                    required
                >
                    <option value="">Chọn danh mục</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </label>

            <button
                disabled={loading}
                className="bg-[#8b5e3c] text-white px-8 py-2.5 rounded-lg hover:bg-[#734c31] transition font-medium shadow-sm"
            >
                {loading ? "Đang thêm..." : "Thêm sản phẩm"}
            </button>
        </form>
    )
}
