import React from 'react'
import Title from './Title'
import { ourSpecsData } from '@/assets/assets'
import { useTranslations } from 'next-intl'

const OurSpecs = () => {
  const t = useTranslations('OurSpecs')

  return (
    <section className="px-4 py-16 max-w-7xl mx-auto">
      <Title
        visibleButton={false}
        title={t('title')}
        description={t('description')}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-16">
        {ourSpecsData.map((spec, index) => {
    
          return (
            <div
              key={index}
              className="relative flex flex-col items-center text-center bg-amber-50 border border-amber-200 rounded-2xl p-10 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
            >
           
              <div
                className="absolute -top-6 w-14 h-14 flex items-center justify-center rounded-xl text-white shadow-lg"
                style={{ backgroundColor: spec.accent }}
              >
                <spec.icon size={26} />
              </div>

           
              <h3 className="text-lg font-semibold text-amber-900 mt-8 tracking-wide">
                {spec.title}
              </h3>

          
              <p className="text-sm text-amber-700 mt-4 leading-relaxed">
                {spec.description}
              </p>

            
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-0 group-hover:w-16 rounded-full transition-all duration-300"
                style={{ backgroundColor: spec.accent }}
              ></div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default OurSpecs
