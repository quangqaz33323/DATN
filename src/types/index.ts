
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
  logo: string
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


export interface SpecItem {
  title: string
  description: string
  icon: LucideIcon
  accent: string
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


export interface DummyUser {
  id: string
  name: string
  email: string
  image: string
  cart: Record<string, number>
}
