import { createI18nServer } from 'next-international/server';

export const { getI18n, getCurrentLocale, getScopedI18n, getStaticParams } = createI18nServer({
  en: () => import('./messages/en'),
  zh: () => import('./messages/zh'),
});
