'use client'

import { useRouter } from '@/i18n/routing'
import { useCartStore } from '@/zustand/useCartStore'
import { Search, ShoppingCart } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useState } from 'react'


const Navbar = () => {
  const  t  = useTranslations('nav')
  const router = useRouter()
  const [search, setSearch] = useState('')

  const total = useCartStore((state) => state.total)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/shop?search=${search}`)
  }

  return (
    <nav className="relative bg-white shadow-sm">
      <div className="mx-6">
        <div className="flex items-center justify-between max-w-[1380px] mx-auto py-4 transition-all">
          <Link href="/" className="relative text-4xl font-semibold text-slate-700">
            <span className="text-[#B5651D]">Quang</span>Woodcraft
            <span className="text-[#B5651D] text-5xl leading-0">.</span>
            <p className="absolute text-xs font-semibold -top-1 -right-8 px-3 p-0.5 rounded-full flex items-center gap-2 text-white bg-[#B5651D]">
              {t('plus')}
            </p>
          </Link>

      
          <div className="hidden sm:flex items-center gap-4 lg:gap-8 text-slate-600">
            <Link href="/">{t('home')}</Link>
            <Link href="/shop">{t('shop')}</Link>
            <Link href="/">{t('about')}</Link>
            <Link href="/">{t('contact')}</Link>

            <form
              onSubmit={handleSearch}
              className="hidden xl:flex items-center w-xs text-sm gap-2 bg-slate-100 px-4 py-3 rounded-full"
            >
              <Search size={18} className="text-slate-600" />
              <input
                className="w-full bg-transparent outline-none placeholder-slate-600"
                type="text"
                placeholder="Search products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                required
              />
            </form>

            <Link href="/cart" className="relative flex items-center gap-2 text-slate-600">
              <ShoppingCart size={18} />
              {t('cart')}
              {total > 0 && (
                <span className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full flex items-center justify-center">
                  {total}
                </span>
              )}
            </Link>

            <button className="px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full">
              {t('login')}
            </button>
          </div>

        
          <div className="sm:hidden">
            <button className="px-7 py-1.5 bg-indigo-500 hover:bg-indigo-600 text-sm transition text-white rounded-full">
              {t('login')}
            </button>
          </div>
        </div>
      </div>
      <hr className="border-gray-300" />
    </nav>
  )
}

export default Navbar
