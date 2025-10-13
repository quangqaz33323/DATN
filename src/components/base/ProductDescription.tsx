'use client'

import { Product } from "@/types"
import { ArrowRight, Star } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const ProductDescription = ({ product }: { product: Product }) => {
  const t = useTranslations('common');
  const [selectedTab, setSelectedTab] = useState('Description')

  return (
    <section className="my-20 text-slate-700">

      <div className="flex border-b border-amber-200 mb-8 max-w-2xl">
        {['Description', 'Reviews'].map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`relative px-4 py-2 text-lg font-medium tracking-wide transition-colors duration-300 ${
              tab === selectedTab
                ? 'text-amber-800 border-b-2 border-amber-600'
                : 'text-slate-400 hover:text-amber-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {selectedTab === 'Description' && (
        <p className="max-w-2xl leading-relaxed text-[15px] text-amber-900/90 bg-amber-50/40 p-6 rounded-lg shadow-sm">
          {product.description}
        </p>
      )}

      {selectedTab === 'Reviews' && (
        <div className="flex flex-col gap-8 mt-10">
          {product.rating.length === 0 && (
            <p className="text-slate-500 italic">No reviews yet.</p>
          )}

          {product.rating.map((item, index) => (
            <div
              key={index}
              className="flex gap-5 pb-6 border-b border-slate-200 last:border-0"
            >
              <Image
                src={item.user.image}
                alt={item.user.name}
                className="size-12 rounded-full ring-2 ring-amber-200"
                width={48}
                height={48}
              />
              <div className="flex-1">
       
                <div className="flex items-center mb-2">
                  {Array(5)
                    .fill('')
                    .map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className="mr-1"
                        fill={item.rating >= i + 1 ? '#B45309' : '#E5E7EB'}
                        color={item.rating >= i + 1 ? '#B45309' : '#E5E7EB'}
                      />
                    ))}
                </div>

                <p className="text-[15px] text-amber-900/90 mb-3 leading-relaxed">
                  {item.review}
                </p>

                <p className="font-semibold text-amber-800">
                  {item.user.name}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}


      <div className="flex items-center gap-4 mt-16 p-4 bg-amber-50/60 rounded-xl shadow-sm border border-amber-100 max-w-lg">
        <Image
          src={product.store.logo}
          alt={product.store.name}
          className="size-12 rounded-full ring-2 ring-amber-300 object-cover"
          width={48}
          height={48}
        />
        <div>
          <p className="font-medium text-amber-900">
            { t('productByStore', { storeName: product.store.name })}
          </p>
          <Link
            href={`/shop/${product.store.username}`}
            className="flex items-center gap-1 text-amber-700 hover:text-amber-900 transition-colors text-sm font-medium mt-1"
          >
            {t('viewStore')} <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ProductDescription
