"use client";
import { assets } from "@/assets/assets";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export default function StoreAddProduct() {
  const { getToken } = useAuth();

  const categories = [
    "Bàn & Ghế",
    "Tủ & Kệ",
    "Giường & Nội thất phòng ngủ",
    "Trang trí nhà cửa",
    "Dụng cụ gỗ",
    "Thủ công mỹ nghệ",
    "Khác",
  ];

  const [images, setImages] = useState<{ [key: number]: File | null }>({
    1: null,
    2: null,
    3: null,
    4: null,
  });
  const [productInfo, setProductInfo] = useState({
    name: "",
    description: "",
    mrp: 0,
    price: 0,
    category: "",
  });
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProductInfo({ ...productInfo, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!images[1] && !images[2] && !images[3] && !images[4]) {
        toast.error("Vui lòng upload ít nhất 1 hình ảnh sản phẩm!");
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("name", productInfo.name);
      formData.append("description", productInfo.description);
      formData.append("mrp", productInfo.mrp.toString());
      formData.append("price", productInfo.price.toString());
      formData.append("category", productInfo.category);

      Object.keys(images).forEach((key: any) => {
        if (images[key]) {
          formData.append("images", images[key] as File);
        }
      });

      const token = await getToken();
      await axios.post("/api/store/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Thêm sản phẩm thành công!");

      setProductInfo({
        name: "",
        description: "",
        mrp: 0,
        price: 0,
        category: "",
      });

      setImages({
        1: null,
        2: null,
        3: null,
        4: null,
      });
    } catch {
      toast.error("Không thể thêm sản phẩm. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) =>
        toast.promise(onSubmitHandler(e), {
          loading: "Đang thêm sản phẩm...",
        })
      }
      className="mb-28 text-[#5b4636]"
    >
      <h1 className="mb-6 text-2xl font-semibold text-[#8b5e3c]">
        Thêm <span className="font-bold text-[#3e2a18]">Sản phẩm mới</span>
      </h1>

      <p className="mt-5 font-medium">Hình ảnh sản phẩm</p>

      <div className="mt-3 flex flex-wrap gap-4">
        {Object.keys(images).map((key) => (
          <label key={key} htmlFor={`images${key}`} className="cursor-pointer">
            <Image
              width={160}
              height={160}
              className="h-40 w-40 rounded-lg border border-[#d9c4a1] bg-[#fffaf3] object-cover shadow-sm transition-all hover:shadow-md"
              src={
                images[key as any]
                  ? URL.createObjectURL(images[key as any] as File)
                  : assets.upload_area
              }
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

      <label className="my-5 flex flex-col gap-2">
        Tên sản phẩm
        <input
          type="text"
          name="name"
          onChange={onChangeHandler}
          value={productInfo.name}
          placeholder="Nhập tên sản phẩm"
          className="w-full max-w-3xl rounded border border-[#d9c4a1] bg-[#fffaf3] p-3 px-4 transition outline-none focus:ring-2 focus:ring-[#c9a87b]"
          required
        />
      </label>

      <label className="my-5 flex flex-col gap-2">
        Mô tả
        <textarea
          name="description"
          onChange={onChangeHandler}
          value={productInfo.description}
          placeholder="Mô tả ngắn gọn về sản phẩm..."
          rows={5}
          className="w-full max-w-3xl resize-none rounded border border-[#d9c4a1] bg-[#fffaf3] p-3 px-4 transition outline-none focus:ring-2 focus:ring-[#c9a87b]"
          required
        />
      </label>

      <div className="flex w-full flex-wrap gap-6">
        <label className="flex w-[372px] flex-col gap-2">
          Giá gốc (₫)
          <input
            type="number"
            name="mrp"
            onChange={onChangeHandler}
            value={productInfo.mrp}
            placeholder="0"
            className="w-full rounded border border-[#d9c4a1] bg-[#fffaf3] p-3 px-4 transition outline-none focus:ring-2 focus:ring-[#c9a87b]"
            required
          />
        </label>

        <label className="flex w-[372px] flex-col gap-2">
          Giá khuyến mãi (₫)
          <input
            type="number"
            name="price"
            onChange={onChangeHandler}
            value={productInfo.price}
            placeholder="0"
            className="w-full rounded border border-[#d9c4a1] bg-[#fffaf3] p-3 px-4 transition outline-none focus:ring-2 focus:ring-[#c9a87b]"
            required
          />
        </label>
      </div>

      <label className="my-6 flex flex-col gap-2">
        Danh mục sản phẩm
        <select
          onChange={(e) => setProductInfo({ ...productInfo, category: e.target.value })}
          value={productInfo.category}
          className="w-full max-w-3xl rounded border border-[#d9c4a1] bg-[#fffaf3] p-3 px-4 transition outline-none focus:ring-2 focus:ring-[#c9a87b]"
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
        className="rounded-lg bg-[#8b5e3c] px-8 py-2.5 font-medium text-white shadow-sm transition hover:bg-[#734c31]"
      >
        {loading ? "Đang thêm..." : "Thêm sản phẩm"}
      </button>
    </form>
  );
}
