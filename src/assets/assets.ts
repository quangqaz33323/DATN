import gs_logo from "./logo.png"
import happy_store from "./happy_store.webp"
import upload_area from "./upload_area.svg"
import hero_model_img from "./hero_model_img.png"
import hero_product_img1 from "./hero_product_img1.webp"
import hero_product_img2 from "./hero_product_img2.webp"
import product_img1 from "./product_img1.webp"
import product_img2 from "./product_img2.webp"
import product_img3 from "./product_img3.webp"
import product_img4 from "./product_img4.webp"
import product_img5 from "./product_img5.webp"
import product_img6 from "./product_img6.webp"
import product_img7 from "./product_img7.jpg"
import product_img8 from "./product_img8.jpg"
import product_img9 from "./product_img9.jpg"
import product_img10 from "./product_img10.webp"
import product_img11 from "./product_img11.jpg"
import product_img12 from "./product_img12.jpg"
import { ClockFadingIcon, HeadsetIcon, SendIcon } from "lucide-react";
import profile_pic1 from "./profile_pic1.jpg"
import profile_pic2 from "./profile_pic2.jpg"
import profile_pic3 from "./profile_pic3.jpg"

export const assets = {
  upload_area,
  hero_model_img,
  hero_product_img1,
  hero_product_img2,
  gs_logo,
  product_img1,
  product_img2,
  product_img3,
  product_img4,
  product_img5,
  product_img6,
  product_img7,
  product_img8,
  product_img9,
  product_img10,
  product_img11,
  product_img12,
}

export const categories = [
  "Bàn ghế",
  "Tượng gỗ",
  "Đồ trang trí",
  "Đèn gỗ",
  "Đồng hồ gỗ",
  "Phụ kiện nội thất"
]

export const dummyRatingsData = [
  {
    id: "rat_1",
    rating: 4.5,
    review:
      "Chất lượng sản phẩm rất tốt, đường nét tinh xảo. Mình nhận hàng đúng như hình, mùi gỗ thơm nhẹ và cảm giác rất sang trọng. Sẽ tiếp tục ủng hộ cửa hàng!",
    user: { name: "Nguyễn Văn An", image: profile_pic1 },
    productId: "prod_1",
    createdAt: "Sat Jul 19 2025 14:51:25 GMT+0700",
    updatedAt: "Sat Jul 19 2025 14:51:25 GMT+0700",
    product: { name: "Tượng Di Lặc gỗ hương", category: "Tượng gỗ", id: "prod_1" },
  },
  {
    id: "rat_2",
    rating: 5.0,
    review:
      "Sản phẩm quá tuyệt vời! Từ gói hàng đến chi tiết chạm khắc đều rất chuyên nghiệp. Rất đáng tiền!",
    user: { name: "Trần Thị Hoa", image: profile_pic2 },
    productId: "prod_2",
    createdAt: "Sat Jul 19 2025 14:51:25 GMT+0700",
    updatedAt: "Sat Jul 19 2025 14:51:25 GMT+0700",
    product: { name: "Đèn bàn gỗ nghệ thuật", category: "Đèn gỗ", id: "prod_2" },
  },
  {
    id: "rat_3",
    rating: 4.2,
    review:
      "Tượng được chạm rất tinh tế, gỗ cứng và màu sắc đều đẹp. Đóng gói chắc chắn, giao hàng nhanh.",
    user: { name: "Lê Minh Tuấn", image: profile_pic3 },
    productId: "prod_3",
    createdAt: "Sat Jul 19 2025 14:51:25 GMT+0700",
    updatedAt: "Sat Jul 19 2025 14:51:25 GMT+0700",
    product: { name: "Tượng Quan Âm gỗ trắc", category: "Tượng gỗ", id: "prod_3" },
  },
]

export const dummyStoreData = {
  id: "store_1",
  userId: "user_1",
  name: "Đồ Gỗ Hạnh Phúc",
  description:
    "Đồ Gỗ Hạnh Phúc chuyên cung cấp các sản phẩm đồ gỗ mỹ nghệ cao cấp — từ bàn ghế, tượng gỗ phong thủy đến đèn gỗ trang trí. Chúng tôi luôn đặt tâm huyết vào từng chi tiết để mang lại vẻ đẹp tự nhiên và sang trọng cho ngôi nhà của bạn.",
  username: "dogohanhphuc",
  address: "123 Nguyễn Văn Linh, P. Hòa Minh, Q. Liên Chiểu, Đà Nẵng",
  status: "approved",
  isActive: true,
  logo: happy_store,
  email: "dogohanhphuc@example.com",
  contact: "+84 912345678",
  createdAt: "2025-09-04T09:04:16.189Z",
  updatedAt: "2025-09-04T09:04:44.273Z",
  user: {
    id: "user_31dOriXqC4TATvc0brIhlYbwwc5",
    name: "Great Stack",
    email: "user.greatstack@gmail.com",
    image: gs_logo,
  },
}

export const productDummyData = [
  {
    id: "prod_1",
    name: "Tượng Di Lặc gỗ hương",
    description:
      "Tượng Di Lặc được chế tác từ gỗ hương tự nhiên, mang lại mùi thơm dịu nhẹ và cảm giác ấm cúng. Tượng thể hiện nụ cười hiền hậu, tượng trưng cho may mắn và hạnh phúc. Thích hợp trưng bày phòng khách, phòng làm việc hoặc làm quà tặng phong thủy.",
    mrp: 2500000,
    price: 1990000,
    images: [product_img1, product_img2, product_img3],
    category: "Tượng gỗ",
    storeId: "seller_1",
    inStock: true,
    store: dummyStoreData,
    rating: dummyRatingsData,
    createdAt: "Sat Jul 29 2025 14:51:25 GMT+0700",
    updatedAt: "Sat Jul 29 2025 14:51:25 GMT+0700",
  },
  {
    id: "prod_2",
    name: "Đèn bàn gỗ nghệ thuật",
    description:
      "Chiếc đèn bàn được làm thủ công từ gỗ óc chó cao cấp, thiết kế hiện đại kết hợp phong cách cổ điển. Ánh sáng vàng dịu giúp không gian thêm ấm cúng và sang trọng.",
    mrp: 1200000,
    price: 950000,
    images: [product_img4],
    storeId: "seller_1",
    inStock: true,
    store: dummyStoreData,
    category: "Đèn gỗ",
    rating: dummyRatingsData,
    createdAt: "Sat Jul 28 2025 14:51:25 GMT+0700",
    updatedAt: "Sat Jul 28 2025 14:51:25 GMT+0700",
  },
  {
    id: "prod_3",
    name: "Bàn trà gỗ gụ chạm sen",
    description:
      "Bàn trà được làm từ gỗ gụ tự nhiên, họa tiết hoa sen tinh tế, phủ sơn PU bóng mờ chống trầy xước. Phù hợp cho phòng khách hiện đại hoặc truyền thống.",
    mrp: 6500000,
    price: 5990000,
    images: [product_img5],
    storeId: "seller_1",
    inStock: true,
    store: dummyStoreData,
    category: "Bàn ghế",
    rating: dummyRatingsData,
    createdAt: "Sat Jul 27 2025 14:51:25 GMT+0700",
    updatedAt: "Sat Jul 27 2025 14:51:25 GMT+0700",
  },
  {
    id: "prod_4",
    name: "Đồng hồ treo tường gỗ mun",
    description:
      "Đồng hồ gỗ mun thiết kế tối giản nhưng tinh tế. Kim loại sơn tĩnh điện kết hợp mặt gỗ tự nhiên, tạo điểm nhấn độc đáo cho không gian sống.",
    mrp: 1800000,
    price: 1490000,
    images: [product_img6],
    storeId: "seller_1",
    inStock: true,
    store: dummyStoreData,
    category: "Đồng hồ gỗ",
    rating: dummyRatingsData,
    createdAt: "Sat Jul 26 2025 14:51:25 GMT+0700",
    updatedAt: "Sat Jul 26 2025 14:51:25 GMT+0700",
  },
]

export const ourSpecsData = [
  {
    title: "Miễn phí giao hàng",
    description:
      "Giao hàng tận nơi miễn phí cho mọi đơn hàng trên toàn quốc — nhanh chóng và an toàn.",
    icon: SendIcon,
    accent: "#05DF72",
  },
  {
    title: "Đổi trả trong 7 ngày",
    description:
      "Không hài lòng với sản phẩm? Bạn có thể đổi trả dễ dàng trong vòng 7 ngày.",
    icon: ClockFadingIcon,
    accent: "#FF8904",
  },
  {
    title: "Hỗ trợ 24/7",
    description:
      "Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ bạn bất kỳ lúc nào.",
    icon: HeadsetIcon,
    accent: "#A684FF",
  },
]

export const addressDummyData = {
  id: "addr_1",
  userId: "user_1",
  name: "Nguyễn Văn Nam",
  email: "nguyennam@example.com",
  street: "123 Nguyễn Văn Cừ",
  city: "Hà Nội",
  state: "HN",
  zip: "100000",
  country: "Việt Nam",
  phone: "0912345678",
  createdAt: "Sat Jul 19 2025 14:51:25 GMT+0700",
}

export const couponDummyData = [
  {
    code: "MOI20",
    description: "Giảm 20% cho khách hàng mới",
    discount: 20,
    forNewUser: true,
    forMember: false,
    isPublic: false,
    expiresAt: "2026-12-31T00:00:00.000Z",
    createdAt: "2025-08-22T08:35:31.183Z",
  },
  {
    code: "TV10",
    description: "Giảm 10% cho thành viên",
    discount: 10,
    forNewUser: false,
    forMember: true,
    isPublic: false,
    expiresAt: "2027-03-06T00:00:00.000Z",
    createdAt: "2025-08-22T11:38:20.194Z",
  },
]

export const dummyUserData = {
  id: "user_31dQbH27HVtovbs13X2cmqefddM",
  name: "Khách Hàng Demo",
  email: "demo@example.com",
  image: gs_logo,
  cart: {},
}