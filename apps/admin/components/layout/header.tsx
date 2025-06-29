"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ModeToggle } from "@/components/layout/mode-toggle"
import { Button } from "@repo/ui/components/ui/button"
import { useSystemStore } from "@/store/useSystemStore"
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
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@repo/ui/components/ui/sheet"
import { SidebarContent } from "@/components/layout/sidebar"
import { toast } from "@repo/ui/components/ui/sonner"
import { NotificationsPopover } from "@/components/layout/notifications-popover"

export function Header() {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; role: string } | null>(null)
  const [campus, setCampus] = useState<string>("总校区")
  const [isMounted, setIsMounted] = useState(false)
  
  // 使用 Zustand store 获取系统类型状态
  const systemType = useSystemStore(state => state.systemType)
  const setSystemType = useSystemStore(state => state.setSystemType)

  useEffect(() => {
    setIsMounted(true)
    try {
      const userData = localStorage.getItem("user")
      if (userData) {
        setUser(JSON.parse(userData))
      }
      
      // 获取校区信息
      const campusData = localStorage.getItem("campus")
      if (campusData) {
        setCampus(campusData)
      }
    } catch (error) {
      console.error("Failed to get user data:", error)
    }
  }, [])

  const handleLogout = () => {
    try {
      localStorage.removeItem("isLoggedIn")
      localStorage.removeItem("user")
    } catch (error) {
      console.error("Failed to clear login state:", error)
    }

    toast.success("已退出登录")

    router.push("/login")
  }

  // 切换系统类型
  const toggleSystemType = () => {
    const newSystemType = systemType === "online" ? "offline" : "online"
    
    try {
      // 使用 Zustand store 设置系统类型
      setSystemType(newSystemType)
      
      toast.success("系统已切换")

      // 根据系统类型跳转到不同的页面
      if (newSystemType === "online") {
        router.push("/online-system")
      } else {
        router.push("/offline-system")
      }
    } catch (error) {
      console.error("Failed to save system type:", error)
    }
  }

  // 避免水合不匹配
  if (!isMounted) {
    return (
      <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-6">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <span className="font-bold">企业管理平台</span>
          <div className="flex items-center">
            <span className="mx-2 text-muted-foreground">|</span>
            <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
              总校区
            </span>
          </div>
        </div>
      </header>
    )
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
        <div className="flex items-center">
          <span className="mx-2 text-muted-foreground">|</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="rounded-md bg-primary/10 px-2 py-1 h-6 text-xs font-medium text-primary hover:bg-primary/20">
                {campus}
                <span className="sr-only">切换校区</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="start">
              <DropdownMenuLabel>选择校区</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => {
                setCampus("总校区");
                localStorage.setItem("campus", "总校区");
                toast.success("校区已切换")
              }}>总校区</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                setCampus("东校区");
                localStorage.setItem("campus", "东校区");
                toast.success("校区已切换")
              }}>东校区</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                setCampus("西校区");
                localStorage.setItem("campus", "西校区");
                toast.success("校区已切换");
              }}>西校区</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                setCampus("南校区");
                localStorage.setItem("campus", "南校区");
                toast.success("校区已切换");
              }}>南校区</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                setCampus("北校区");
                localStorage.setItem("campus", "北校区");
                toast.success("校区已切换");
              }}>北校区</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* 系统切换下拉菜单 */}
        <div className="flex items-center">
          <span className="mx-2 text-muted-foreground">|</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="rounded-md bg-accent/80 px-2 py-1 h-6 text-xs font-medium text-accent-foreground hover:bg-accent">
                {systemType === "online" ? "线上系统" : "线下系统"}
                <span className="sr-only">切换系统</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="start">
              <DropdownMenuLabel>选择系统</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className={systemType === "online" ? "bg-accent text-accent-foreground" : ""}
                onClick={() => {
                  if (systemType !== "online") {
                    toggleSystemType();
                  }
              }}>
                <span className="flex items-center gap-2">
                  线上系统
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={systemType === "offline" ? "bg-accent text-accent-foreground" : ""}
                onClick={() => {
                  if (systemType !== "offline") {
                    toggleSystemType();
                  }
              }}>
                <span className="flex items-center gap-2">
                  线下系统
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <NotificationsPopover />
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
              <DropdownMenuItem onClick={() => router.push("/profile")}>个人资料</DropdownMenuItem>
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
