"use client"

import React from "react"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { SidebarProvider, SidebarTrigger } from "@repo/ui/components/ui/sidebar"

export function LayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 overflow-hidden">
        <SidebarTrigger />
        <div className="flex h-full flex-col">
          <Breadcrumb />
          <div className="flex-1 overflow-auto p-6">{children}</div>
        </div>
      </main>
    </SidebarProvider>
  )
}
