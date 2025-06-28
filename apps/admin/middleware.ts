import NextAuth from 'next-auth';
import { createI18nMiddleware } from 'next-international/middleware';
import { authConfig } from '@/lib/auth/config';

const I18nMiddleware = createI18nMiddleware({
  locales: ['en', 'ja', 'zh'],
  defaultLocale: 'en',
});

const { auth } = NextAuth(authConfig);

// Export the middleware with proper typing
export default auth((req) => {
  return I18nMiddleware(req);
});

export const config = {
  matcher: ['/', '/login', '/register', '/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)'],
};
