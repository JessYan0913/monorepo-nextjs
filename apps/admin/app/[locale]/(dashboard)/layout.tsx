import React from "react"
import { redirect } from "next/navigation"
import { ModeToggle } from "@/components/layout/mode-toggle"
import { NotificationsPopover } from "@/components/layout/notifications-popover"
import { AvatarInfo } from "@/components/avatar-info"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Toaster } from "@repo/ui/components/ui/sonner"
import { SidebarProvider, SidebarTrigger } from "@repo/ui/components/ui/sidebar"
import { auth } from "@/lib/auth"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  const user = session?.user;
  if (!user) {
    return redirect("/login")
  }
  return (
    <div className="flex h-screen flex-col">
      <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-6">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <span className="font-bold">企业管理平台</span>
        </div>
  
        <div className="flex items-center gap-2">
          <NotificationsPopover />
          <ModeToggle />
          <AvatarInfo user={user} />
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
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
      </div>
      <Toaster />
    </div>
  )
}
