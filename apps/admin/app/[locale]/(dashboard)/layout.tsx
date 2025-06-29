"use client"

import type React from "react"

import { useSystemStore } from "@/store/useSystemStore"
import { Header } from "@/components/layout/header"
import { Sidebar } from "@/components/layout/sidebar"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Toaster } from "@repo/ui/components/ui/sonner"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const systemType = useSystemStore(state => state.systemType)

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar platform={systemType} />
        <main className="flex-1 overflow-hidden">
          <div className="flex h-full flex-col">
            <Breadcrumb />
            <div className="flex-1 overflow-auto p-6">{children}</div>
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  )
}
