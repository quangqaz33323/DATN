'use client'

import { useRouter } from '@/i18n/routing'
import { useCartStore } from '@/zustand/useCartStore'
import { Search, ShoppingCart } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useState } from 'react'
import LanguageSwitcher from './LanguageSwitcher'

const Navbar = ({ locale }: { locale: string }) => {
  const t = useTranslations('nav')
  const router = useRouter()
  const [search, setSearch] = useState('')
  const total = useCartStore((state) => state.total)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/shop?search=${search}`)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-sm transition-colors">
      <div className="mx-4 sm:mx-6">
        <div className="flex items-center justify-between max-w-[1380px] mx-auto py-4">

          <Link href="/" className="relative text-3xl sm:text-4xl font-semibold text-slate-700 dark:text-white">
            <span className="text-[#B5651D]">Quang</span>Woodcraft
            <span className="text-[#B5651D] text-5xl leading-0">.</span>
            <p className="absolute text-[10px] font-semibold -top-1 -right-8 px-2 py-0.5 rounded-full text-white bg-[#B5651D]">
              {t('plus')}
            </p>
          </Link>

     
          <div className="hidden sm:flex items-center gap-4 lg:gap-6 text-slate-600 dark:text-slate-300">
            <Link href="/" className="hover:text-[#B5651D] transition-colors">{t('home')}</Link>
            <Link href="/shop" className="hover:text-[#B5651D] transition-colors">{t('shop')}</Link>
            <Link href="/about" className="hover:text-[#B5651D] transition-colors">{t('about')}</Link>
            <Link href="/contact" className="hover:text-[#B5651D] transition-colors">{t('contact')}</Link>


            <form
              onSubmit={handleSearch}
              className="hidden xl:flex items-center w-xs text-sm gap-2 bg-slate-100 dark:bg-gray-800 px-4 py-2.5 rounded-full focus-within:ring-2 focus-within:ring-[#B5651D]"
            >
              <Search size={18} className="text-slate-500" />
              <input
                className="w-full bg-transparent outline-none placeholder-slate-500 dark:placeholder-slate-400 text-slate-700 dark:text-white"
                type="text"
                placeholder={t('searchPlaceholder')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                required
              />
            </form>


            <Link href="/cart" className="relative flex items-center gap-2 text-slate-700 dark:text-slate-200 hover:text-[#B5651D] transition-colors">
              <ShoppingCart size={18} />
              {t('cart')}
              {total > 0 && (
                <span className="absolute -top-1 left-3 text-[8px] text-white bg-[#B5651D] size-3.5 rounded-full flex items-center justify-center">
                  {total}
                </span>
              )}
            </Link>

     
            <LanguageSwitcher locale={locale} />


            <button className="px-6 py-2 bg-[#B5651D] hover:bg-[#9A4D14] transition text-white rounded-full shadow-sm">
              {t('login')}
            </button>
          </div>

          <div className="sm:hidden flex items-center gap-2">
            <LanguageSwitcher locale={locale} />
            <button className="px-5 py-1.5 bg-[#B5651D] hover:bg-[#9A4D14] text-sm transition text-white rounded-full">
              {t('login')}
            </button>
          </div>
        </div>
      </div>
      <hr className="border-gray-200 dark:border-gray-700" />
    </nav>
  )
}

export default Navbar
