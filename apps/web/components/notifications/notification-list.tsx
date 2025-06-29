"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar"
import { Button } from "@repo/ui/components/ui/button"
import { Badge } from "@repo/ui/components/ui/badge"
import { Check, Trash2 } from "lucide-react"
import { toast } from "@repo/ui/components/ui/sonner"

// 模拟通知数据
const allNotifications = [
  {
    id: "1",
    title: "课程反馈：JavaScript基础",
    message: "学生对JavaScript基础课程提供了新的反馈，请查看。",
    time: "10分钟前",
    read: false,
    type: "feedback",
    sender: {
      name: "课程反馈",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "课",
    },
  },
  {
    id: "2",
    title: "新问题：React Hooks使用",
    message: "学生提出了关于React Hooks使用的问题，需要解答。",
    time: "30分钟前",
    read: false,
    type: "questions",
    sender: {
      name: "问题中心",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "问",
    },
  },
  {
    id: "3",
    title: "课程反馈：Vue.js进阶",
    message: "收到了关于Vue.js进阶课程的学生反馈，建议增加实践案例。",
    time: "1小时前",
    read: false,
    type: "feedback",
    sender: {
      name: "课程反馈",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "课",
    },
  },
  {
    id: "4",
    title: "新问题：数据结构算法",
    message: "有学生提出了关于数据结构与算法的问题，请查看并解答。",
    time: "2小时前",
    read: true,
    type: "questions",
    sender: {
      name: "问题中心",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "问",
    },
  },
  {
    id: "5",
    title: "新问题：Git版本控制",
    message: "学生在使用Git进行版本控制时遇到问题，需要指导。",
    time: "3小时前",
    read: true,
    type: "questions",
    sender: {
      name: "问题中心",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "问",
    },
  },
  {
    id: "6",
    title: "课程反馈：Python编程",
    message: "Python编程课程收到了新的学生反馈，请及时查看。",
    time: "5小时前",
    read: false,
    type: "feedback",
    sender: {
      name: "课程反馈",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "课",
    },
  },
  {
    id: "7",
    title: "课程反馈：Web安全",
    message: "Web安全课程的学生反馈表示希望增加实际漏洞演示。",
    time: "1天前",
    read: true,
    type: "feedback",
    sender: {
      name: "课程反馈",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "课",
    },
  },
  {
    id: "8",
    title: "新问题：数据库优化",
    message: "有学生咨询关于数据库性能优化的问题，需要专业解答。",
    time: "1天前",
    read: true,
    type: "questions",
    sender: {
      name: "问题中心",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "问",
    },
  },
]

interface NotificationListProps {
  type?: "all" | "unread" | "feedback" | "questions"
}

export function NotificationList({ type = "all" }: NotificationListProps) {
  const [notifications, setNotifications] = useState(allNotifications)

  // 根据类型过滤通知
  const filteredNotifications = notifications.filter((notification) => {
    if (type === "all") return true
    if (type === "unread") return !notification.read
    return notification.type === type
  })

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )

    toast.success("已标记为已读")
  }

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))

    toast.success("通知已成功删除")
  }

  if (filteredNotifications.length === 0) {
    return <div className="flex h-40 items-center justify-center text-muted-foreground">没有通知</div>
  }

  return (
    <div className="space-y-4">
      {filteredNotifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-start gap-4 rounded-lg border p-4 ${notification.read ? "" : "bg-muted/50"}`}
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={notification.sender.avatar || "/placeholder.svg"} alt={notification.sender.name} />
            <AvatarFallback>{notification.sender.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <h4 className="font-semibold">{notification.title}</h4>
              {!notification.read && <Badge variant="default">新</Badge>}
            </div>
            <p className="text-sm text-muted-foreground">{notification.message}</p>
            <div className="flex items-center gap-4 pt-1">
              <span className="text-xs text-muted-foreground">{notification.time}</span>
              <span className="text-xs text-muted-foreground">{notification.sender.name}</span>
            </div>
          </div>
          <div className="flex gap-1">
            {!notification.read && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleMarkAsRead(notification.id)}>
                <Check className="h-4 w-4" />
                <span className="sr-only">标记为已读</span>
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-500 hover:text-red-600"
              onClick={() => handleDelete(notification.id)}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">删除</span>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
