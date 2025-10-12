'use client'

import { assets } from '@/assets/assets'
import { ArrowRightIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import CategoriesMarquee from './CategoriesMarquee'
import { useTranslations } from 'next-intl'

const Hero = () => {
  const t = useTranslations('hero')

  return (
    <div className="mx-6">
      <div className="flex max-xl:flex-col gap-8 max-w-[1380px] mx-auto my-10">
 
        <div className="relative flex-1 flex flex-col bg-[#EADBC8] rounded-3xl xl:min-h-100 group">
          <div className="p-5 sm:p-16">
            <div className="inline-flex items-center gap-3 bg-[#D2B48C]/60 text-[#5B3921] pr-4 p-1 rounded-full text-xs sm:text-sm">
              <span className="bg-[#5B3921] px-3 py-1 max-sm:ml-1 rounded-full text-white text-xs">
                {t('new')}
              </span>{' '}
              {t('freeShipping')}
              <ChevronRightIcon className="group-hover:ml-2 transition-all" size={16} />
            </div>

            <h2 className="text-3xl sm:text-5xl leading-[1.2] my-3 font-semibold bg-gradient-to-r from-[#4A2C17] to-[#C49A6C] bg-clip-text text-transparent max-w-xs sm:max-w-md">
              {t('headline')}
            </h2>

            <div className="text-[#4A2C17] text-sm font-medium mt-4 sm:mt-8">
              <p>{t('startingFrom')}</p>
              <p className="text-3xl">
               {t('price')}
              </p>
            </div>

            <button className="bg-[#4A2C17] text-white text-sm py-2.5 px-7 sm:py-5 sm:px-12 mt-4 sm:mt-10 rounded-md hover:bg-[#3A2414] hover:scale-103 active:scale-95 transition">
              {t('exploreNow')}
            </button>
          </div>

          <Image
            className="sm:absolute bottom-0 right-0 md:right-10 w-full sm:max-w-sm"
            src={assets.hero_model_img}
            alt={t('mainAlt')}
            width={513}
            height={542}
          />
        </div>


        <div className="flex flex-col md:flex-row xl:flex-col gap-5 w-full xl:max-w-sm text-sm text-[#5B3921]">
          <div className="flex-1 flex items-center justify-between w-full bg-[#F0E0CA] rounded-3xl p-6 px-8 group">
            <div>
              <p className="text-3xl font-semibold bg-gradient-to-r from-[#4A2C17] to-[#C49A6C] bg-clip-text text-transparent max-w-40">
                {t('featuredProducts')}
              </p>
              <p className="flex items-center gap-1 mt-4">
                {t('seeMore')}{' '}
                <ArrowRightIcon className="group-hover:ml-2 transition-all" size={18} />
              </p>
            </div>
            <Image className="w-35" src={assets.hero_product_img1} alt={t('featuredAlt')} />
          </div>

          <div className="flex-1 flex items-center justify-between w-full bg-[#D3BBA3] rounded-3xl p-6 px-8 group">
            <div>
              <p className="text-3xl font-semibold bg-gradient-to-r from-[#4A2C17] to-[#A67C52] bg-clip-text text-transparent max-w-40">
                {t('discountTitle')}
              </p>
              <p className="flex items-center gap-1 mt-4">
                {t('seeMore')}{' '}
                <ArrowRightIcon className="group-hover:ml-2 transition-all" size={18} />
              </p>
            </div>
            <Image className="w-35" src={assets.hero_product_img2} alt={t('discountAlt')} />
          </div>
        </div>
      </div>

      <CategoriesMarquee />
    </div>
  )
}

export default Hero
