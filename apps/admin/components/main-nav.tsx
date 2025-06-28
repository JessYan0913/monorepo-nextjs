"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, ShieldCheck, Settings } from "lucide-react"

const items = [
  {
    title: "仪表盘",
    href: "/online-system",
    icon: LayoutDashboard,
  },
  {
    title: "用户管理",
    href: "/users",
    icon: Users,
  },
  {
    title: "权限管理",
    href: "/permissions",
    icon: ShieldCheck,
  },
  {
    title: "系统设置",
    href: "/settings",
    icon: Settings,
  },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="grid gap-1">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
            pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
