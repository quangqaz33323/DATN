'use client'
import { Product } from '@/types'
import { StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductCard = ({ product }: { product: Product }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'VND'

  const rating =
    product.rating.length > 0
      ? Math.round(
          product.rating.reduce((acc, curr) => acc + curr.rating, 0) /
            product.rating.length
        )
      : 0

  return (
    <Link
      href={`/product/${product.id}`}
      className='group max-xl:mx-auto transition-all duration-300 hover:scale-[1.02]'
    >

      <div className='bg-[#F3ECE2] h-40 sm:w-68 sm:h-68 rounded-xl flex items-center justify-center shadow-sm'>
        <Image
          width={500}
          height={500}
          className='max-h-30 sm:max-h-40 w-auto group-hover:scale-110 transition duration-300 object-contain'
          src={product.images[0] || '/placeholder.jpg'}
          alt={product.name}
        />
      </div>


      <div className='flex justify-between gap-3 text-sm text-[#4A2E12] pt-3 max-w-60'>
        <div>
          <p className='font-medium line-clamp-1'>{product.name}</p>
          <div className='flex'>
            {Array(5)
              .fill('')
              .map((_, index) => (
                <StarIcon
                  key={index}
                  size={14}
                  className='text-transparent mt-0.5'
                  fill={rating >= index + 1 ? '#C49A6C' : '#E0D7C8'}
                />
              ))}
          </div>
        </div>
        <p className='font-semibold text-[#5B3921]'>
          {product.price.toLocaleString()} {currency}
        </p>
      </div>
    </Link>
  )
}

export default ProductCard
