'use client'
import { useTranslations } from 'next-intl'
import React from 'react'
import { toast } from 'sonner'

export default function Banner() {
  const t = useTranslations('banner')
  const [isOpen, setIsOpen] = React.useState(true)

  const handleClaim = () => {
    setIsOpen(false)
    toast.success(t('copied') || 'Mã giảm giá đã được sao chép!')
    navigator.clipboard.writeText('WOOD20')
  }

  return (
    isOpen && (
      <div className="w-full px-6 py-2 font-medium text-sm text-white text-center bg-gradient-to-r from-[#7B4B2A] via-[#A37250] to-[#D8A974] shadow-md">
        <div className="flex items-center justify-between max-w-[1380px] mx-auto">
          <p className="text-[15px] tracking-wide">
            {t('claim') || '🎁 Giảm 20% cho đơn hàng đầu tiên – Mã WOOD20'}
          </p>
          <div className="flex items-center space-x-6">
            <button
              onClick={handleClaim}
              type="button"
              className="font-normal text-[#4A2E12] bg-[#F5E9D0] hover:bg-[#EED9B9] px-6 py-2 rounded-full text-sm transition-all duration-200 max-sm:hidden"
            >
              {t('claimOffer') || 'Sao chép mã'}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              type="button"
              className="font-normal text-white p-1 rounded-full hover:bg-[#00000020] transition"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="12.532"
                  width="17.498"
                  height="2.1"
                  rx="1.05"
                  transform="rotate(-45.74 0 12.532)"
                  fill="#fff"
                />
                <rect
                  x="12.533"
                  y="13.915"
                  width="17.498"
                  height="2.1"
                  rx="1.05"
                  transform="rotate(-135.74 12.533 13.915)"
                  fill="#fff"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
  )
}
