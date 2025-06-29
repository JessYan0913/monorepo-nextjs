"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSystemStore } from "@/store/useSystemStore"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Loader2 } from "lucide-react"
import { Toaster } from "@repo/ui/components/ui/sonner"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  
  // 使用 Zustand store 获取系统类型状态
  const systemType = useSystemStore(state => state.systemType)

  useEffect(() => {
    setIsMounted(true)
    // 检查用户是否已登录
    try {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"

      if (!isLoggedIn) {
        router.push("/login")
      } else {
        setIsLoading(false)
      }
    } catch (error) {
      console.error("Failed to check login status:", error)
      // 如果无法访问localStorage（例如在隐私模式下），默认允许访问
      setIsLoading(false)
    }
  }, [router])

  // 避免水合不匹配
  if (!isMounted) {
    return null
  }

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar platform={systemType} />
        <main className="flex-1 overflow-hidden">
          <div className="flex h-full flex-col">
            <Breadcrumb />
            <div className="flex-1 overflow-auto p-6">{children}</div>
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  )
}
