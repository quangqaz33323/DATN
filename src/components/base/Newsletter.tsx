import React from 'react'
import Title from './Title'
import { useTranslations } from 'next-intl';

const Newsletter = () => {

  const t = useTranslations('newsletter');

  return (
    <section className="flex flex-col items-center mx-4 my-32 text-center">
      <Title
        title={t('title')}
        description={t('description')}
        visibleButton={false}
      />

      <div className="flex w-full max-w-xl mt-10 bg-[#f8f5f2] border border-[#d6c1a8] rounded-full shadow-sm focus-within:shadow-md transition">
        <input
          className="flex-1 px-6 py-3 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 text-sm"
          type="email"
          placeholder={t('placeholder')}
        />
        <button className="bg-[#B5651D] text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-[#9c4f15] active:scale-95 transition-all duration-200">
          {t('button')}
        </button>
      </div>

      <p className="mt-5 text-xs text-slate-500">
        {t('notice')}
      </p>
    </section>
  )
}

export default Newsletter
