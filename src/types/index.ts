import { LucideIcon } from "lucide-react"
import { StaticImageData } from "next/image"

export interface User {
  id: string
  name: string
  email: string
  image: string
}

export interface Store {
  id: string
  userId: string
  name: string
  description: string
  username: string
  address: string
  status: "approved" | "pending" | "rejected"
  isActive: boolean
  logo: string | StaticImageData
  email: string
  contact: string
  createdAt: string
  updatedAt: string
  user: User
}

export interface RatingUser {
  name: string
  image: string
}

export interface RatingProduct {
  id: string
  name: string
  category: string
}

export interface Rating {
  id: string
  rating: number
  review: string
  user: RatingUser
  orderId?: string
  productId: string
  createdAt: string
  updatedAt: string
  product: RatingProduct
}

export interface Product {
  id: string
  name: string
  description: string
  mrp: number
  price: number
  images: (string | StaticImageData)[]
  category: string
  storeId: string
  inStock: boolean
  store: Store
  rating: Rating[]
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  orderId: string
  productId: string
  quantity: number
  price: number
  product: Product
}

export interface Address {
  id: string
  userId: string
  name: string
  email: string
  street: string
  city: string
  state: string
  zip: string
  country: string
  phone: string
  createdAt: string
}

export interface Coupon {
  code: string
  description: string
  discount: number
  forNewUser: boolean
  forMember: boolean
  isPublic: boolean
  expiresAt: string
  createdAt: string
}

export interface Order {
  id: string
  total: number
  status: "PENDING" | "CONFIRMED" | "DELIVERED" | "CANCELLED"
  userId: string
  storeId: string
  addressId: string
  isPaid: boolean
  paymentMethod: "COD" | "BANKING" | "CREDIT"
  createdAt: string
  updatedAt: string
  isCouponUsed: boolean
  coupon?: Coupon
  orderItems: OrderItem[]
  address: Address
  user: User
}

export interface AdminDashboardData {
  orders: number
  stores: number
  products: number
  revenue: string
  allOrders: { createdAt: string; total: number }[]
}

export interface StoreDashboardData {
  ratings: Rating[]
  totalOrders: number
  totalEarnings: number
  totalProducts: number
}

export interface SpecItem {
  title: string
  description: string
  icon: LucideIcon
  accent: string
}

export interface DummyUser {
  id: string
  name: string
  email: string
  image: string
  cart: Record<string, number>
}
