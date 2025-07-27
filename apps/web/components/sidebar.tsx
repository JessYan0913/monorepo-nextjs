"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, BookOpen, ShoppingBag, User } from "lucide-react"

const menuItems = [
  {
    title: "首页",
    href: "/student/home",
    icon: Home,
  },
  {
    title: "学习中心",
    href: "/student/learning",
    icon: BookOpen,
  },
  {
    title: "商城",
    href: "/student/mall",
    icon: ShoppingBag,
  },
  {
    title: "我的",
    href: "/student/profile",
    icon: User,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  // 更精确的路由匹配逻辑
  const isActiveRoute = (href: string) => {
    // 精确匹配首页
    if (href === "/student" && pathname === "/student") {
      return true
    }
    // 对于其他路由，检查是否以该路径开头且不是首页的子路径
    if (href !== "/student" && pathname.startsWith(href)) {
      return true
    }
    return false
  }

  return (
    <aside className="flex flex-col items-center h-screen bg-orange-500 text-white py-6 w-16">
      {/* LOGO */}
      <div className="mb-8">
        <Link href="/">
          <div className="flex flex-col items-center hover:scale-105 transition-transform">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Image 
                src="/logo.png" 
                alt="BEST YOU" 
                width={24} 
                height={24} 
                className="object-contain"
              />
            </div>
            <span className="text-xs mt-1 font-medium">BEST YOU</span>
          </div>
        </Link>
      </div>

      {/* 菜单项 */}
      <nav className="flex flex-col items-center space-y-6">
        {menuItems.map((item) => {
          const isActive = isActiveRoute(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center group relative transition-all duration-200",
                isActive ? "text-white scale-105" : "text-white/70 hover:text-white hover:scale-105"
              )}
            >
              {/* 选中状态指示器 */}
              {isActive && (
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-full" />
              )}
              
              <div className={cn(
                "w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-200",
                isActive 
                  ? "bg-white/25 shadow-lg" 
                  : "group-hover:bg-white/15 group-hover:shadow-md"
              )}>
                <item.icon className={cn(
                  "transition-all duration-200",
                  isActive ? "h-6 w-6" : "h-5 w-5 group-hover:h-6 group-hover:w-6"
                )} />
              </div>
              <span className={cn(
                "text-xs mt-2 font-medium transition-all duration-200",
                isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100"
              )}>
                {item.title}
              </span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
