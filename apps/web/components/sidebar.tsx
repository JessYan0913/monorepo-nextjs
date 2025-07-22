"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, BookOpen, ShoppingBag, User } from "lucide-react"

const menuItems = [
  {
    title: "首页",
    href: "/",
    icon: Home,
  },
  {
    title: "学习中心",
    href: "/learning",
    icon: BookOpen,
  },
  {
    title: "商城",
    href: "/mall",
    icon: ShoppingBag,
  },
  {
    title: "我的",
    href: "/profile",
    icon: User,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="flex flex-col items-center h-screen bg-orange-500 text-white py-6 w-16">
      {/* LOGO */}
      <div className="mb-8">
        <Link href="/">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
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
      <nav className="flex flex-col items-center space-y-8">
        {menuItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center group",
                isActive ? "text-white" : "text-white/80 hover:text-white"
              )}
            >
              <div className={cn(
                "w-10 h-10 flex items-center justify-center rounded-md transition-colors",
                isActive ? "bg-white/20" : "group-hover:bg-white/10"
              )}>
                <item.icon className="h-5 w-5" />
              </div>
              <span className="text-xs mt-1">{item.title}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
