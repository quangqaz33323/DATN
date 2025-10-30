"use client";

import { assets } from "@/assets/assets";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { toast } from "sonner";
import Loading from "@/components/base/Loading";
import { useUser } from "@clerk/nextjs";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import PleaseLogin from "@/components/base/PleaseLogin";
import { useRouter } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

interface StoreInfo {
  name: string;
  username: string;
  description: string;
  email: string;
  contact: string;
  address: string;
  image: File | string;
}

export default function CreateStore() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const route = useRouter();
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const [storeInfo, setStoreInfo] = useState<StoreInfo>({
    name: "",
    username: "",
    description: "",
    email: "",
    contact: "",
    address: "",
    image: "",
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setStoreInfo({ ...storeInfo, [e.target.name]: e.target.value });
  };

  const fetchSellerStatus = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get("/api/store/create", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (["pending", "approved", "rejected"].includes(data.status)) {
        setStatus(data.status);
        setAlreadySubmitted(true);
        switch (data.status) {
          case "pending":
            setMessage(
              "Thông tin cửa hàng của bạn đang chờ được phê duyệt. Vui lòng kiên nhẫn chờ đợi."
            );
            break;
          case "approved":
            setMessage(
              "Cửa hàng của bạn đã được phê duyệt. Bạn có thể bắt đầu bán hàng ngay bây giờ!"
            );
            setTimeout(() => {
              route.push(`/store`);
            }, 3000);
            break;
          case "rejected":
            setMessage(
              "Cửa hàng của bạn đã bị từ chối. Vui lòng liên hệ với chúng tôi để biết thêm thông tin."
            );
            break;
        }
      } else {
        setAlreadySubmitted(false);
      }
    } catch (error) {
      toast.error("Đã có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (!user) {
      return toast.error("Vui lòng đăng nhập để tiếp tục.");
    }

    try {
      const token = await getToken();
      const formData = new FormData();
      formData.append("name", storeInfo.name);
      formData.append("username", storeInfo.username);
      formData.append("description", storeInfo.description);
      formData.append("email", storeInfo.email);
      formData.append("contact", storeInfo.contact);
      formData.append("address", storeInfo.address);
      formData.append("image", storeInfo.image);

      const { data } = await axios.post("/api/store/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(data.message || "Gửi thông tin thành công!");
      await fetchSellerStatus();
    } catch (error) {
      toast.error("Đã có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  useEffect(() => {
    if (user) {
      fetchSellerStatus();
    }
    fetchSellerStatus();
  }, [user]);

  if (!user) {
    return <PleaseLogin user={user} />;
  }

  return !loading ? (
    <>
      {!alreadySubmitted ? (
        <div className="mx-6 my-16 min-h-[70vh] rounded-md bg-white p-6 shadow-sm">
          <form
            onSubmit={(e) => toast.promise(onSubmitHandler(e), { loading: "Đang gửi dữ liệu..." })}
            className="mx-auto flex max-w-5xl flex-col items-start gap-4 text-[#5C4033]"
          >
            {/* Title */}
            <div className="mb-4">
              <h1 className="text-3xl font-semibold text-[#8B5E3C]">Thêm cửa hàng của bạn</h1>
              <p className="mt-1 max-w-lg text-[#6B4F3A]">
                Để trở thành người bán tại <strong>Quang Woodcraft</strong>, vui lòng cung cấp thông
                tin cửa hàng của bạn. Cửa hàng sẽ được kích hoạt sau khi xác minh.
              </p>
            </div>

            <label className="mt-8 cursor-pointer font-medium text-[#5C4033]">
              Ảnh cửa hàng
              <Image
                src={
                  storeInfo.image
                    ? typeof storeInfo.image === "string"
                      ? storeInfo.image
                      : URL.createObjectURL(storeInfo.image)
                    : assets.upload_area
                }
                className="mt-3 h-24 w-auto rounded-md border border-[#D2B48C]"
                alt="Store Logo"
                width={180}
                height={120}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setStoreInfo({
                    ...storeInfo,
                    image: e.target.files?.[0] ?? "",
                  })
                }
                hidden
              />
            </label>

            <div className="mt-6 w-full max-w-lg space-y-4">
              <div>
                <p className="font-medium">Tên người dùng</p>
                <input
                  name="username"
                  onChange={onChangeHandler}
                  value={storeInfo.username}
                  type="text"
                  placeholder="Nhập tên đăng nhập cửa hàng"
                  className="w-full rounded-md border border-[#D2B48C] bg-[#FFFDF9] p-2.5 outline-none focus:ring-2 focus:ring-[#C19A6B]"
                />
              </div>

              <div>
                <p className="font-medium">Tên cửa hàng</p>
                <input
                  name="name"
                  onChange={onChangeHandler}
                  value={storeInfo.name}
                  type="text"
                  placeholder="Nhập tên cửa hàng"
                  className="w-full rounded-md border border-[#D2B48C] bg-[#FFFDF9] p-2.5 outline-none focus:ring-2 focus:ring-[#C19A6B]"
                />
              </div>

              <div>
                <p className="font-medium">Mô tả</p>
                <textarea
                  name="description"
                  onChange={onChangeHandler}
                  value={storeInfo.description}
                  rows={4}
                  placeholder="Giới thiệu ngắn gọn về cửa hàng, sản phẩm, phong cách..."
                  className="w-full resize-none rounded-md border border-[#D2B48C] bg-[#FFFDF9] p-2.5 outline-none focus:ring-2 focus:ring-[#C19A6B]"
                />
              </div>

              <div>
                <p className="font-medium">Email</p>
                <input
                  name="email"
                  onChange={onChangeHandler}
                  value={storeInfo.email}
                  type="email"
                  placeholder="Nhập email liên hệ"
                  className="w-full rounded-md border border-[#D2B48C] bg-[#FFFDF9] p-2.5 outline-none focus:ring-2 focus:ring-[#C19A6B]"
                />
              </div>

              <div>
                <p className="font-medium">Số điện thoại</p>
                <input
                  name="contact"
                  onChange={onChangeHandler}
                  value={storeInfo.contact}
                  type="text"
                  placeholder="Nhập số điện thoại cửa hàng"
                  className="w-full rounded-md border border-[#D2B48C] bg-[#FFFDF9] p-2.5 outline-none focus:ring-2 focus:ring-[#C19A6B]"
                />
              </div>

              <div>
                <p className="font-medium">Địa chỉ</p>
                <textarea
                  name="address"
                  onChange={onChangeHandler}
                  value={storeInfo.address}
                  rows={3}
                  placeholder="Nhập địa chỉ cửa hàng"
                  className="w-full resize-none rounded-md border border-[#D2B48C] bg-[#FFFDF9] p-2.5 outline-none focus:ring-2 focus:ring-[#C19A6B]"
                />
              </div>
            </div>

            <div className="mt-8 mb-32">
              <Button className="rounded-md bg-[#8B5E3C] px-12 py-3 font-medium text-white shadow-md hover:bg-[#6B4226] active:scale-95">
                Gửi thông tin
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex min-h-[80vh] flex-col items-center justify-center bg-white">
          <p className="mx-5 max-w-2xl text-center text-2xl font-semibold text-[#5C4033]">
            {message}
          </p>
          {status === "approved" && (
            <p className="mt-5 text-[#6B4F3A]">
              Đang chuyển đến trang quản lý trong <span className="font-semibold">5 giây</span>...
            </p>
          )}
        </div>
      )}
    </>
  ) : (
    <Loading />
  );
}
