import { NextRequest } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { Lang, languages } from 'i18nOptions';

const locales = languages;

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale: Lang.vi,
});

export default function middleware(req: NextRequest) {
  return intlMiddleware(req);
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
