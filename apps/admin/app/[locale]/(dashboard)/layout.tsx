import React from "react"
import { redirect } from "next/navigation"
import { ModeToggle } from "@/components/layout/mode-toggle"
import { NotificationsPopover } from "@/components/layout/notifications-popover"
import { AvatarInfo } from "@/components/avatar-info"
import { Toaster } from "@repo/ui/components/ui/sonner"
import { auth } from "@/lib/auth"
import { LayoutContent } from "@/components/layout/content"

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
      <LayoutContent>{children}</LayoutContent>
      <Toaster />
    </div>
  )
}
