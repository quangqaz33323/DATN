'use client'

import { useTranslations } from 'next-intl'
import ProductCard from './ProductCard'
import Title from './Title'
import { useProductStore } from '@/zustand/useProductStore'

const BestSelling = () => {
  const t = useTranslations('common')
  const displayQuantity = 8

  const products = useProductStore((state) => state.list)

  return (
    <div className="px-6 my-30 max-w-7xl mx-auto">
      <Title
        title={t('bestSelling')}
        description={t('showTotalProduct', { productQuantity: products.length < displayQuantity ? products.length : displayQuantity, totalQuantity: products.length })}
        href="/shop"
      />

      <div className="mt-12 grid grid-cols-2 sm:flex flex-wrap gap-6 xl:gap-12">
        {products
          .slice()
          .sort((a, b) => b.rating.length - a.rating.length)
          .slice(0, displayQuantity)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  )
}

export default BestSelling
