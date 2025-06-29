import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { setStaticParamsLocale } from 'next-international/server';
import { I18nProviderClient } from '@/locales/client';
import { ThemeProvider } from "@repo/ui/components/theme-provider"
import { Toaster } from "@repo/ui/components/ui/sonner"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "企业管理平台",
  description: "现代化的企业管理平台系统",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
    generator: 'v0.dev'
}

export default async function RootLayout({
  params,
  children,
}: {
  params: Promise<{ locale: string }>;
  children: React.ReactNode
}) {
  const { locale } = await params;
  setStaticParamsLocale(locale);
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <I18nProviderClient locale={locale}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </I18nProviderClient>
      </body>
    </html>
  )
}
