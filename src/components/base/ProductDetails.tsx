'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, Tag, Truck, CreditCard, ShieldCheck } from 'lucide-react'
import Counter from './Counter'
import { useCartStore } from '@/zustand/useCartStore'
import { Product } from '@/types'
import { useRouter } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

interface ProductDetailsProps {
  product: Product
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const router = useRouter();
  const t = useTranslations('common');
  const [mainImage, setMainImage] = useState(product.images[0]);

  const { cartItems, addToCart } = useCartStore();

  const productId = product.id;
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'VND'

  const averageRating =
    product.rating.length > 0
      ? product.rating.reduce((acc: number, item: any) => acc + item.rating, 0) /
        product.rating.length
      : 0

  const handleAddToCart = () => addToCart(productId)

  return (
    <section className="flex max-lg:flex-col gap-12 text-slate-800">
  
      <div className="flex max-sm:flex-col-reverse gap-3">
        <div className="flex sm:flex-col gap-3">
          {product.images.map((image, index: number) => (
            <button
              key={index}
              onClick={() => setMainImage(image)}
              className={`flex items-center justify-center size-24 rounded-xl border transition-all duration-200 ${
                mainImage === image
                  ? 'border-amber-600 bg-amber-50'
                  : 'border-slate-200 hover:border-amber-300'
              }`}
            >
              <Image
                src={image}
                alt={product.name}
                width={60}
                height={60}
                className="rounded-md object-contain"
              />
            </button>
          ))}
        </div>

        <div className="flex justify-center items-center h-[500px] sm:w-[500px] bg-amber-50 border border-amber-100 rounded-2xl shadow-inner">
          <Image
            src={mainImage}
            alt={product.name}
            width={400}
            height={400}
            className="object-contain rounded-lg"
          />
        </div>
      </div>

 
      <div className="flex-1">
        <h1 className="text-3xl font-semibold text-amber-900 mb-2">
          {product.name}
        </h1>

       
        <div className="flex items-center mt-2">
          {Array(5)
            .fill('')
            .map((_, index) => (
              <Star
                key={index}
                size={18}
                fill={averageRating >= index + 1 ? '#B45309' : '#E5E7EB'}
                color={averageRating >= index + 1 ? '#B45309' : '#E5E7EB'}
              />
            ))}
          <p className="text-sm ml-2 text-slate-500">
            {product.rating.length} Reviews
          </p>
        </div>

        <div className="flex items-center gap-3 my-6">
          <p className="text-3xl font-bold text-amber-800">
            {product.price} {currency}
          </p>
          <p className="text-lg text-slate-400 line-through">
            {product.mrp} {currency}
          </p>
        </div>

        <div className="flex items-center gap-2 text-slate-600">
          <Tag size={16} className="text-amber-600" />
          <p>
            Save{' '}
            <span className="font-semibold text-amber-800">
              {((product.mrp - product.price) / product.mrp * 100).toFixed(0)}%
            </span>{' '}
            today
          </p>
        </div>

        <div className="flex items-end gap-5 mt-10">
          {cartItems[productId] && (
            <div className="flex flex-col gap-3">
              <p className="text-base text-amber-900 font-medium">Quantity</p>
              <Counter productId={productId} />
            </div>
          )}
          <button
            onClick={() =>
              !cartItems[productId] ? handleAddToCart() : router.push('/cart')
            }
            className="bg-amber-800 text-white px-10 py-3 text-sm font-medium rounded-lg shadow-md hover:bg-amber-900 active:scale-95 transition-all"
          >
            {!cartItems[productId] ? 'Add to Cart' : 'View Cart'}
          </button>
        </div>

        <hr className="border-amber-100 my-6" />

        <div className="flex flex-col gap-4 text-slate-600">
          <p className="flex items-center gap-3">
            <Truck className="text-amber-600" /> {t('freeShipping')}
          </p>
          <p className="flex items-center gap-3">
            <CreditCard className="text-amber-600" /> {t('securePayment')}
          </p>
          <p className="flex items-center gap-3">
            <ShieldCheck className="text-amber-600" /> {t('trustedBy')}
          </p>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails
