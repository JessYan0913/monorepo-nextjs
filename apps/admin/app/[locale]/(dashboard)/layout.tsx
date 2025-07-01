import React from "react"
import { redirect } from "next/navigation"
import { Toaster } from "@repo/ui/components/ui/sonner"
import { auth } from "@/lib/auth"
import { LayoutContent } from "@/components/layout/layout-content"

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
