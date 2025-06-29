"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@repo/ui/lib/utils"
import {
  LayoutDashboard,
  Users,
  Settings,
  Bell,
  ChevronDown,
  Calendar,
  BookOpen,
  Presentation,
  Store,
  ClipboardList,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@repo/ui/components/ui/tooltip"
import { Collapsible, CollapsibleContent } from "@repo/ui/components/ui/collapsible"

// 侧边栏菜单项类型
type MenuItem = {
  title: string
  href?: string
  icon: React.ElementType
  submenu?: MenuItem[]
  badge?: number | string
}

// 线下系统侧边栏菜单数据
const offlineMenuItems: MenuItem[] = [
  {
    title: "线下系统首页",
    href: "/offline-system",
    icon: LayoutDashboard,
  },
  {
    title: "课程表",
    href: "/offline-system/course-schedule",
    icon: Calendar,
  },
  {
    title: "学生管理",
    icon: Users,
    submenu: [
      {
        title: "学生信息",
        href: "/offline-system/students",
        icon: Users,
      },
    ],
  },
  {
    title: "教学管理",
    icon: Presentation,
    submenu: [
      {
        title: "教案管理",
        href: "/offline-system/courses",
        icon: BookOpen,
      },
    ],
  },
  {
    title: "商城",
    href: "/mall",
    icon: Store,
  },
  {
    title: "订单中心",
    href: "/orders",
    icon: ClipboardList,
  },
  {
    title: "通知公告",
    href: "/notifications",
    icon: Bell,
    badge: 3,
  },
  {
    title: "系统设置",
    href: "/offline-system/settings",
    icon: Settings,
  },
]

// 线上系统侧边栏菜单数据
const onlineMenuItems: MenuItem[] = [
  {
    title: "线上系统首页",
    href: "/online-system",
    icon: LayoutDashboard,
  },
  {
    title: "教学管理",
    icon: Presentation,
    submenu: [
      {
        title: "教案管理",
        href: "/online-system/courses",
        icon: BookOpen,
      },
    ],
  },
  {
    title: "通知公告",
    href: "/notifications",
    icon: Bell,
    badge: 2,
  },
  {
    title: "系统设置",
    href: "/online-system/settings",
    icon: Settings,
  },
]

// 默认侧边栏菜单数据（用于其他页面）
const defaultMenuItems: MenuItem[] = [
  {
    title: "通知中心",
    href: "/notifications",
    icon: Bell,
    badge: 5,
  },
  {
    title: "系统设置",
    href: "/settings",
    icon: Settings,
  },
]

export function SidebarContent({ collapsed = false, platform = "default" }: { collapsed?: boolean; platform?: "online" | "offline" | "default" }) {
  // 根据平台选择菜单项
  const getMenuItems = () => {
    switch (platform) {
      case "online":
        return onlineMenuItems
      case "offline":
        return offlineMenuItems
      default:
        return defaultMenuItems
    }
  }
  
  const menuItems = getMenuItems()
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})

  // 检查当前路径是否匹配菜单项或其子菜单
  useEffect(() => {
    const newOpenMenus: Record<string, boolean> = {}

    menuItems.forEach((item) => {
      if (item.submenu) {
        const isSubmenuActive = item.submenu.some((subItem) => subItem.href && pathname.startsWith(subItem.href))
        if (isSubmenuActive) {
          newOpenMenus[item.title] = true
        }
      }
    })

    setOpenMenus(newOpenMenus)
  }, [pathname])

  // 切换子菜单的展开/折叠状态
  const toggleSubmenu = (title: string) => {
    if (collapsed) return

    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  // 渲染菜单项
  const renderMenuItem = (item: MenuItem, isSubmenuItem = false) => {
    // 如果有子菜单
    if (item.submenu && !collapsed) {
      return (
        <Collapsible
          key={item.title}
          open={openMenus[item.title]}
          onOpenChange={() => toggleSubmenu(item.title)}
          className="w-full"
        >
          <div
            className={cn(
              "flex w-full items-center justify-between px-3 py-2 text-sm font-medium rounded-lg cursor-pointer",
              openMenus[item.title]
                ? "bg-accent text-accent-foreground"
                : "hover:bg-accent hover:text-accent-foreground",
            )}
            onClick={() => toggleSubmenu(item.title)}
          >
            <div className="flex items-center gap-3">
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </div>
            <ChevronDown className={cn("h-4 w-4 transition-transform", openMenus[item.title] ? "rotate-180" : "")} />
          </div>
          <CollapsibleContent className="pl-8 pt-1">
            <div className="flex flex-col gap-1">{item.submenu.map((subItem) => renderMenuItem(subItem, true))}</div>
          </CollapsibleContent>
        </Collapsible>
      )
    }

    // 如果是普通菜单项
    const isActive = item.href && pathname === item.href

    const menuItemContent = (
      <Link
        href={item.href || "#"}
        className={cn(
          "flex h-10 items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
          isActive ? "bg-accent text-accent-foreground" : "transparent",
          collapsed ? "justify-center" : "",
          isSubmenuItem && !collapsed ? "pl-0" : "",
        )}
      >
        <item.icon className="h-5 w-5 flex-shrink-0" />
        {!collapsed && <span className="flex-1 truncate">{item.title}</span>}
        {!collapsed && item.badge && (
          <span
            className={cn(
              "flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-medium",
              typeof item.badge === "number"
                ? "bg-primary text-primary-foreground"
                : "bg-destructive text-destructive-foreground",
            )}
          >
            {item.badge}
          </span>
        )}
      </Link>
    )

    // 如果折叠状态下且有徽章，添加工具提示
    if (collapsed && item.badge) {
      return (
        <TooltipProvider key={item.title} delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative">
                {menuItemContent}
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {item.badge}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right">
              {item.title} {item.badge && `(${item.badge})`}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    // 如果折叠状态，添加工具提示
    if (collapsed) {
      return (
        <TooltipProvider key={item.title} delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>{menuItemContent}</TooltipTrigger>
            <TooltipContent side="right">{item.title}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    return <div key={item.title}>{menuItemContent}</div>
  }

  // 根据平台获取标题
  const getTitle = () => {
    switch (platform) {
      case "online":
        return "线上教学系统"
      case "offline":
        return "线下教学系统"
      default:
        return "主导航"
    }
  }

  return (
    <div className="flex h-full flex-col gap-4 py-4 overflow-y-auto">
      <div className="px-4 py-2">
        {!collapsed && <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">{getTitle()}</h2>}
        <div className="space-y-1">{menuItems.map((item) => renderMenuItem(item))}</div>
      </div>
    </div>
  )
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "relative h-full flex-col border-r bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-full flex-col">
        <SidebarContent collapsed={collapsed} platform={'offline'} />
      </div>
    </aside>
  )
}
