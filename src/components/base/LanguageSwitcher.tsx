'use client';
import { usePathname } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { useTransition, useState, useRef, useEffect, useCallback } from 'react';

const LANGUAGES = [
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
] as const;

type LocaleType = (typeof LANGUAGES)[number]['code'];

interface LanguageSwitcherProps {
  locale: string;
  showName?: boolean
}

export default function LanguageSwitcher({ locale, showName = false }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const currentLanguage = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  const handleChange = useCallback(
    (newLocale: LocaleType) => {
      if (newLocale === locale || isPending) return;

      startTransition(() => {
        const search = searchParams.toString();
        const newPath = `/${newLocale}${pathname}`;
        const fullPath = search ? `${newPath}?${search}` : newPath;
        window.location.href = fullPath;
      });
    },
    [locale, isPending, pathname, searchParams]
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;

      switch (e.key) {
        case 'Escape':
          setOpen(false);
          buttonRef.current?.focus();
          break;
        case 'ArrowDown':
        case 'ArrowUp':
          e.preventDefault();
          const items = dropdownRef.current?.querySelectorAll('button');
          if (!items) return;
          
          const currentIndex = Array.from(items).findIndex(
            (item) => item === document.activeElement
          );
          
          let nextIndex: number;
          if (e.key === 'ArrowDown') {
            nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
          } else {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
          }
          
          items[nextIndex]?.focus();
          break;
      }
    };

    if (open) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [open]);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        disabled={isPending}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Chọn ngôn ngữ"
        className={`
          flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg
          font-medium text-sm text-gray-800 dark:text-gray-100
          hover:bg-gray-200 dark:hover:bg-gray-700
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
          transition-all duration-200 min-w-[50px] justify-between
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        <span className="flex items-center gap-2">
          <span className="text-lg" role="img" aria-label={currentLanguage.name}>
            {currentLanguage.flag}
          </span>
          {showName && <span className="hidden sm:inline">{currentLanguage.name}</span>}
        </span>
        <span
          className={`text-gray-500 text-xs transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Danh sách ngôn ngữ"
          className="absolute z-20 mt-2 min-w-38 w-fit  rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 animate-fade-in overflow-hidden"
        >
          {LANGUAGES.map((lang) => {
            const isSelected = lang.code === locale;
            
            return (
              <button
                key={lang.code}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  setOpen(false);
                  handleChange(lang.code);
                }}
                className={`
                  w-full flex items-center gap-2 px-3 py-2 text-sm text-left
                  text-gray-700 dark:text-gray-200
                  hover:bg-gray-100 dark:hover:bg-gray-700
                  focus:bg-gray-100 dark:focus:bg-gray-700 focus:outline-none
                  transition-colors duration-150
                  ${isSelected ? 'bg-gray-50 dark:bg-gray-700/50 font-semibold' : ''}
                `}
              >
                <span className="text-lg" role="img" aria-label={lang.name}>
                  {lang.flag}
                </span>
                {lang.name}
                {isSelected && (
                  <span className="ml-auto text-blue-600 dark:text-blue-400" aria-hidden="true">
                    ✓
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}