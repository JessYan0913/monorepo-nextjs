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
  profile: "个人中心",
  'sales-dashboard': '销售数据',
  'schools': '校区管理',
  'add': '添加',
  'roles': '角色管理',
  'menus': '菜单管理',
  'staffs': '人员管理',
}

export function LayoutContent({
  children,
}: {
  children: React.ReactNode
  }) {
  const pathname = usePathname()

  // 分割路径并过滤空段
  const segments = pathname.split("/").filter(Boolean)
  const [locale, ...pathSegments] = segments

  // 生成面包屑项
  const breadcrumbItems = pathSegments.map((segment, index, array) => {
    // 构建完整路径，始终包含 locale
    const href = `/${[locale, ...array.slice(0, index + 1)].join("/")}`
    const isLast = index === array.length - 1
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
