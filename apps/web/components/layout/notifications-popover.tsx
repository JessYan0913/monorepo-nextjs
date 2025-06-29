"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@repo/ui/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar"
import { Badge } from "@repo/ui/components/ui/badge"
import { ScrollArea } from "@repo/ui/components/ui/scroll-area"
import { useRouter } from "next/navigation"
import { toast } from "@repo/ui/components/ui/sonner"

// 模拟通知数据
const initialNotifications = [
  {
    id: "1",
    title: "系统更新完成",
    message: "系统已更新至最新版本，包含多项功能改进和问题修复。",
    time: "10分钟前",
    read: false,
    type: "feedback",
    sender: {
      name: "系统",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "系",
    },
  },
  {
    id: "2",
    title: "新用户注册",
    message: "用户李四已成功注册系统，请及时分配相应权限。",
    time: "30分钟前",
    read: false,
    type: "user",
    sender: {
      name: "用户管理",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "用",
    },
  },
  {
    id: "3",
    title: "数据备份提醒",
    message: "系统将于今晚22:00进行例行数据备份，可能影响系统性能。",
    time: "1小时前",
    read: false,
    type: "feedback",
    sender: {
      name: "系统",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "系",
    },
  },
  {
    id: "4",
    title: "权限变更通知",
    message: "您的账户权限已更新，现在可以访问更多系统功能。",
    time: "2小时前",
    read: true,
    type: "user",
    sender: {
      name: "管理员",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "管",
    },
  },
]

export function NotificationsPopover() {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const router = useRouter()
  const [notifications, setNotifications] = useState(initialNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  const filteredNotifications = notifications.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    return notification.type === activeTab
  })

  const viewAllNotifications = () => {
    setOpen(false)
    router.push("/notifications")
  }

  // 处理通知点击
  const handleNotificationClick = (notification: any) => {
    // 标记通知为已读
    setNotifications(notifications.map((n) => (n.id === notification.id ? { ...n, read: true } : n)))

    toast.success(`已将"${notification.title}"标记为已读`)

    // 关闭弹出框
    setOpen(false)
  }

  // 标记所有通知为已读
  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))

    toast.success("所有通知已标记为已读")
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b p-3">
          <h4 className="font-medium">通知</h4>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                全部已读
              </Button>
            )}
            <Button variant="ghost" size="sm" onClick={viewAllNotifications}>
              查看全部
            </Button>
          </div>
        </div>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">全部</TabsTrigger>
            <TabsTrigger value="unread">未读</TabsTrigger>
            <TabsTrigger value="feedback">课程反馈</TabsTrigger>
            <TabsTrigger value="questions">待解答问题</TabsTrigger>
          </TabsList>
          <ScrollArea className="h-[300px]">
            <TabsContent value={activeTab} className="m-0">
              {filteredNotifications.length > 0 ? (
                <div className="space-y-1 p-1">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-3 rounded-md p-2 transition-colors hover:bg-muted ${
                        !notification.read ? "bg-muted/50" : ""
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                      role="button"
                      tabIndex={0}
                    >
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={notification.sender.avatar || "/placeholder.svg"}
                          alt={notification.sender.name}
                        />
                        <AvatarFallback>{notification.sender.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h5 className="text-sm font-medium">{notification.title}</h5>
                          {!notification.read && <Badge variant="default" className="h-1.5 w-1.5 rounded-full p-0" />}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-[200px] items-center justify-center">
                  <p className="text-sm text-muted-foreground">没有通知</p>
                </div>
              )}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}
