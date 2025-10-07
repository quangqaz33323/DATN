'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

const LANGUAGES = {
  vi: {
    code: 'vi' ,
    name: 'Tiếng Việt',
    shortName: 'VI',
    flag: '🇻🇳'
  },
  en: {
    code: 'en' ,
    name: 'English',
    shortName: 'EN',
    flag: '🇬🇧'
  }
} as const;

export default function LanguageSwitcher({locale}: {locale: string}) {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const changeLanguage = (newLocale: string) => {
    if (locale === newLocale || isPending) return;

    startTransition(() => {
  
      const pathnameWithoutLocale = pathname.replace(`/${locale}`, '');
      
    
      const newPath = `/${newLocale}${pathnameWithoutLocale}`;
      
    
      const search = searchParams.toString();
      const fullPath = search ? `${newPath}?${search}` : newPath;
      
      router.push(fullPath);
    });
  };

  return (
    <div className="flex items-center gap-2 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
      {Object.values(LANGUAGES).map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          disabled={isPending || locale === lang.code}
          className={`
            flex items-center gap-2 px-3 py-2 rounded-md
            transition-all duration-200 font-medium text-sm
            ${
              locale === lang.code
                ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          aria-label={`Switch to ${lang.name}`}
        >
          <span className="text-lg">{lang.flag}</span>
          <span>{lang.shortName}</span>
        </button>
      ))}
    </div>
  );
}