"use client"

import { usePathname, useRouter } from "next/navigation"
import { User, Wallet } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  
  // 确定当前激活的标签页
  const isInfoActive = pathname.includes('/profile/info') || pathname === '/profile'
  const isFinancialActive = pathname.includes('/profile/financial')
  const activeTab = isFinancialActive ? "financial" : "info"
  
  // 处理标签页切换
  const handleTabChange = (value: string) => {
    if (value === "info") {
      router.push("/profile/info")
    } else if (value === "financial") {
      router.push("/profile/financial")
    }
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-6">个人中心</h1>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="info" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>个人信息</span>
          </TabsTrigger>
          <TabsTrigger value="financial" className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            <span>财务状况</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="mt-4">
        {children}
      </div>
    </div>
  )
}