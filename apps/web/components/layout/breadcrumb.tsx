"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

// 路径映射表
const pathMap: Record<string, string> = {
  "online-system": "线上系统",
  "offline-system": "线下系统",
  users: "用户管理",
  permissions: "权限管理",
  analytics: "数据分析",
  content: "内容管理",
  notifications: "通知中心",
  settings: "系统设置",
  help: "帮助中心",
  profile: "个人资料",
  classes: "班级管理",
  courses: "教案管理",
  students: "学生管理",
  exams: "考试管理",
  resources: "教学资源",
  messages: "消息中心",
  detail: "详情",
  "course-schedule": "课程表",
  score: "评分",
  mall: "商城",
  orders: "我的订单",
  info: "信息",
  financial: "财务状况",
  create: "创建",
  edit: "编辑"
}

export function Breadcrumb() {
  const pathname = usePathname()

  // 判断当前所在的系统
  const isOnlineSystem = pathname.includes("online-system")
  const isOfflineSystem = pathname.includes("offline-system")
  const homeHref = isOnlineSystem ? "/online-system" : isOfflineSystem ? "/offline-system" : "/"

  // 如果是根路径，不显示面包屑
  if (pathname === "/") return null

  // 分割路径
  const pathSegments = pathname.split("/").filter(Boolean)

  // 构建面包屑项
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`
    const isLast = index === pathSegments.length - 1
    const label = pathMap[segment] || segment

    return { href, label, isLast }
  })

  return (
    <nav className="flex items-center gap-1 border-b bg-background px-6 py-3 text-sm">
      <Link href={homeHref} className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
        <Home className="h-4 w-4" />
      </Link>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />

      {breadcrumbItems.map((item, index) => (
        <div key={item.href} className="flex items-center gap-1">
          {item.isLast ? (
            <span className="font-medium">{item.label}</span>
          ) : (
            <>
              <Link href={item.href} className="text-muted-foreground hover:text-foreground">
                {item.label}
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </>
          )}
        </div>
      ))}
    </nav>
  )
}
