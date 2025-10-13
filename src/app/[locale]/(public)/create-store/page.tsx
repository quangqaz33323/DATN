'use client'

import { assets } from '@/assets/assets'
import { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import Loading from '@/components/base/Loading'

interface StoreInfo {
  name: string
  username: string
  description: string
  email: string
  contact: string
  address: string
  image: File | string
}

export default function CreateStore() {
  const [alreadySubmitted, setAlreadySubmitted] = useState(false)
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  const [storeInfo, setStoreInfo] = useState<StoreInfo>({
    name: '',
    username: '',
    description: '',
    email: '',
    contact: '',
    address: '',
    image: '',
  })

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setStoreInfo({ ...storeInfo, [e.target.name]: e.target.value })
  }

  const fetchSellerStatus = async () => {
    // Logic kiểm tra store đã đăng ký chưa
    setLoading(false)
  }

  const onSubmitHandler = async (e: FormEvent) => {
    e.preventDefault()
    // Logic submit store
  }

  useEffect(() => {
    fetchSellerStatus()
  }, [])

  return !loading ? (
    <>
      {!alreadySubmitted ? (
        <div className="mx-6 my-16 min-h-[70vh] bg-[#FDFBF7] rounded-2xl shadow-sm p-6">
          <form
            onSubmit={(e) =>
              toast.promise(onSubmitHandler(e), { loading: 'Đang gửi dữ liệu...' })
            }
            className="max-w-5xl mx-auto flex flex-col items-start gap-4 text-[#5C4033]"
          >
            {/* Title */}
            <div className="mb-4">
              <h1 className="text-3xl font-semibold text-[#8B5E3C]">
                Thêm cửa hàng của bạn
              </h1>
              <p className="max-w-lg text-[#6B4F3A] mt-1">
                Để trở thành người bán tại <strong>Quang Woodcraft</strong>, vui lòng
                cung cấp thông tin cửa hàng của bạn. Cửa hàng sẽ được kích hoạt sau khi
                xác minh.
              </p>
            </div>

            <label className="mt-8 cursor-pointer font-medium text-[#5C4033]">
              Ảnh cửa hàng
              <Image
                src={
                  storeInfo.image
                    ? typeof storeInfo.image === 'string'
                      ? storeInfo.image
                      : URL.createObjectURL(storeInfo.image)
                    : assets.upload_area
                }
                className="rounded-lg mt-3 h-24 w-auto border border-[#D2B48C]"
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
                    image: e.target.files?.[0] ?? '',
                  })
                }
                hidden
              />
            </label>

            <div className="w-full max-w-lg space-y-4 mt-6">
              <div>
                <p className="font-medium">Tên người dùng</p>
                <input
                  name="username"
                  onChange={onChangeHandler}
                  value={storeInfo.username}
                  type="text"
                  placeholder="Nhập tên đăng nhập cửa hàng"
                  className="border border-[#D2B48C] bg-[#FFFDF9] outline-none w-full p-2.5 rounded-md focus:ring-2 focus:ring-[#C19A6B]"
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
                  className="border border-[#D2B48C] bg-[#FFFDF9] outline-none w-full p-2.5 rounded-md focus:ring-2 focus:ring-[#C19A6B]"
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
                  className="border border-[#D2B48C] bg-[#FFFDF9] outline-none w-full p-2.5 rounded-md resize-none focus:ring-2 focus:ring-[#C19A6B]"
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
                  className="border border-[#D2B48C] bg-[#FFFDF9] outline-none w-full p-2.5 rounded-md focus:ring-2 focus:ring-[#C19A6B]"
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
                  className="border border-[#D2B48C] bg-[#FFFDF9] outline-none w-full p-2.5 rounded-md focus:ring-2 focus:ring-[#C19A6B]"
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
                  className="border border-[#D2B48C] bg-[#FFFDF9] outline-none w-full p-2.5 rounded-md resize-none focus:ring-2 focus:ring-[#C19A6B]"
                />
              </div>
            </div>

            <button
              className="bg-[#8B5E3C] text-white px-12 py-3 rounded-lg mt-8 mb-32 font-medium shadow-md hover:bg-[#6B4226] active:scale-95 transition-all"
            >
              Gửi thông tin
            </button>
          </form>
        </div>
      ) : (
        <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#FDFBF7]">
          <p className="text-2xl font-semibold text-[#5C4033] text-center max-w-2xl mx-5">
            {message}
          </p>
          {status === 'approved' && (
            <p className="mt-5 text-[#6B4F3A]">
              Đang chuyển đến trang quản lý trong{' '}
              <span className="font-semibold">5 giây</span>...
            </p>
          )}
        </div>
      )}
    </>
  ) : (
    <Loading />
  )
}
