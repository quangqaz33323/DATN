"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Cảm ơn bạn đã gửi liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="bg-stone-50 py-20 text-stone-700">
      <div className="mx-auto max-w-[1380px] px-6">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-stone-800 md:text-5xl">
            Liên hệ với Quang Woodcraft
          </h1>
          <p className="mx-auto max-w-2xl text-stone-600">
            Hãy để chúng tôi giúp bạn tạo nên không gian sống mang đậm dấu ấn cá nhân với vẻ đẹp của
            gỗ tự nhiên.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-5 rounded-2xl border border-stone-200 bg-stone-100 p-8 shadow-sm">
            <h2 className="mb-4 text-2xl font-semibold text-stone-800">Thông tin liên hệ</h2>
            <p>
              <strong>Địa chỉ:</strong> 123 Đường Mộc Mạc, Tu Liem, TP. Ha Noi
            </p>
            <p>
              <strong>Email:</strong> contact@quangwoodcraft.vn
            </p>
            <p>
              <strong>Hotline:</strong> 0909 123 456
            </p>
            <p>
              <strong>Giờ làm việc:</strong> Thứ 2 - Thứ 7, 8:00 - 18:00
            </p>

            <iframe
              className="mt-5 h-64 w-full rounded-lg border border-stone-200"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.27228292489!2d106.70098137569958!3d10.790632089358702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3b8ebdc5f5%3A0xa15f1ad73ec4cf1!2zUXXhuqFuZyBXb29kY3JhZnQ!5e0!3m2!1svi!2s!4v1709718400000"
              loading="lazy"
            ></iframe>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-stone-200 bg-white p-8 shadow-sm"
          >
            <div className="flex flex-col">
              <label className="mb-1 font-medium text-stone-700">Họ và tên</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="rounded-lg border border-stone-300 bg-stone-50 p-3 outline-none focus:ring-2 focus:ring-amber-700"
                placeholder="Nguyễn Văn A"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium text-stone-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="rounded-lg border border-stone-300 bg-stone-50 p-3 outline-none focus:ring-2 focus:ring-amber-700"
                placeholder="ban@vidu.com"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium text-stone-700">Nội dung</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                className="resize-none rounded-lg border border-stone-300 bg-stone-50 p-3 outline-none focus:ring-2 focus:ring-amber-700"
                placeholder="Viết lời nhắn của bạn..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-amber-700 px-6 py-3 font-medium text-white transition hover:bg-amber-800"
            >
              Gửi liên hệ
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
