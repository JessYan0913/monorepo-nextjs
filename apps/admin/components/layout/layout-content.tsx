"use client"

import React from "react"
import { Home } from "lucide-react"
import { usePathname } from "next/navigation"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@repo/ui/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb"
import { Separator } from "@repo/ui/components/ui/separator"

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

export function LayoutContent({
  children,
}: {
  children: React.ReactNode
  }) {
  const pathname = usePathname()

  const pathSegments = pathname.split("/").filter(Boolean)

  const breadcrumbItems = pathSegments.splice(1).map((segment, index) => {
    const href = `/${pathSegments.slice(0, index + 1).join("/")}`
    const isLast = index === pathSegments.length - 1
    const label = pathMap[segment] || segment

    return { href, label, isLast }
  })
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            {pathname !== "/" && (
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/">
                      <Home className="size-4" />
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {breadcrumbItems.map((item, index) => (
                    <div key={`${index}-item`} className="flex gap-1 items-center">
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        {item.isLast ? (
                          <BreadcrumbPage>{item.label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={item.href} className="text-muted-foreground hover:text-foreground">
                            {item.label}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </div>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            )}
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
