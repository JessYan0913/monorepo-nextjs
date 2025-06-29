"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ModeToggle } from "@/components/layout/mode-toggle"
import { Button } from "@repo/ui/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu"
import { Bell, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@repo/ui/components/ui/sheet"
import { SidebarContent } from "@/components/layout/sidebar"
import { toast } from '@repo/ui/components/ui/sonner'

export function Header() {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; role: string } | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("user")

    toast.success("已退出登录")

    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">打开菜单</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0 pt-10">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      <div className="flex flex-1 items-center gap-2 md:gap-4">
        <span className="font-bold">企业管理平台</span>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
            5
          </span>
        </Button>

        <ModeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="用户头像" />
                <AvatarFallback>{user?.name?.charAt(0) || "用"}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name || "用户"}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.role || "角色未知"}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => router.push("/online-system/profile")}>个人资料</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/settings")}>账号设置</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>退出登录</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
