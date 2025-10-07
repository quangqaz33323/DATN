import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'vi'],
  defaultLocale: 'vi',
  localePrefix: 'always' 
});

export const { Link, getPathname,redirect, usePathname, useRouter, permanentRedirect } = 
  createNavigation(routing);


