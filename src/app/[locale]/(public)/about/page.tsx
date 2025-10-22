"use client";

import Image from "next/image";
import woodWorkshop from "@/assets/logo.png";
import woodCrafting from "@/assets/hero_model_img1.png";

export default function AboutPage() {
  return (
    <section className="bg-stone-50 text-stone-700">
      <div className="mx-auto max-w-[1380px] px-6 py-20">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold text-stone-800 md:text-5xl">
            Về <span className="text-amber-700">Quang Woodcraft</span>
          </h1>
          <p className="mt-4 text-lg text-stone-600">
            Nơi những khối gỗ vô tri trở thành những tác phẩm mang linh hồn.
          </p>
        </div>

        <div className="mb-20 grid items-center gap-10 md:grid-cols-2">
          <Image
            src={woodWorkshop}
            alt="Xưởng chế tác Quang Woodcraft"
            className="rounded-2xl shadow-lg"
            width={600}
            height={400}
          />
          <div>
            <h2 className="mb-3 text-2xl font-semibold text-stone-800">Câu chuyện thương hiệu</h2>
            <p className="mb-4 leading-relaxed">
              Bắt đầu từ một xưởng mộc nhỏ ở miền Trung, <strong>Quang Woodcraft</strong> ra đời với
              niềm đam mê dành cho gỗ tự nhiên và sự tỉ mỉ trong từng chi tiết. Chúng tôi tin rằng,
              mỗi sản phẩm thủ công đều mang trong mình câu chuyện của thời gian – mộc mạc, chân
              thật và đầy cảm xúc.
            </p>
            <p className="leading-relaxed">
              Với hơn 10 năm kinh nghiệm, chúng tôi đã phục vụ hàng ngàn khách hàng trên khắp Việt
              Nam và quốc tế, mang đến những sản phẩm nội thất không chỉ đẹp mà còn bền vững, thân
              thiện với môi trường.
            </p>
          </div>
        </div>

        <div className="mb-20 grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="mb-3 text-2xl font-semibold text-stone-800">Giá trị cốt lõi</h2>
            <ul className="space-y-3">
              <li>
                🌳 <strong>Tự nhiên:</strong> Chỉ sử dụng gỗ thật – giữ trọn vẻ đẹp nguyên bản.
              </li>
              <li>
                🪚 <strong>Thủ công:</strong> Mỗi sản phẩm được làm tỉ mỉ bởi bàn tay người thợ.
              </li>
              <li>
                🏡 <strong>Bền vững:</strong> Thiết kế cho không gian sống lâu dài, hài hòa thiên
                nhiên.
              </li>
              <li>
                🎨 <strong>Tinh tế:</strong> Kết hợp giữa truyền thống và hơi thở hiện đại.
              </li>
            </ul>
          </div>
          <Image
            src={woodCrafting}
            alt="Nghệ nhân chế tác gỗ"
            className="rounded-2xl shadow-lg"
            width={400}
            height={400}
          />
        </div>

        <div className="mt-16 text-center">
          <blockquote className="inline-block border-l-4 border-amber-700 pl-4 text-lg text-stone-700 italic">
            “Gỗ không chỉ là vật liệu — đó là hơi thở của thiên nhiên được lưu giữ trong từng thớ
            vân.”
          </blockquote>
        </div>
      </div>
    </section>
  );
}
