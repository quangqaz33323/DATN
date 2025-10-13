import { Link } from '@/i18n/routing'
import { ArrowRight } from 'lucide-react'
import React from 'react'

interface PageTitleProps {
  heading: string
  text: string
  path?: string
  linkText: string
}

const PageTitle: React.FC<PageTitleProps> = ({
  heading,
  text,
  path = '/',
  linkText,
}) => {
  return (
    <div className="my-10">

      <h2 className="text-3xl font-semibold text-amber-900 tracking-wide mb-3">
        {heading}
      </h2>

   
      <div className="flex flex-wrap items-center gap-3 text-amber-800">
        <p className="text-base text-amber-700">{text}</p>

        <Link
          href={path}
          className="flex items-center gap-1 text-base font-medium text-amber-600 hover:text-amber-800 transition-colors duration-200 group"
        >
          {linkText}
          <ArrowRight
            size={16}
            className="ml-1 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>


      <div className="mt-4 h-[2px] w-20 bg-amber-600 rounded-full"></div>
    </div>
  )
}

export default PageTitle
