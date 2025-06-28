"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { RefreshCw, Bell, BellOff, Check, Trash2, Activity, Users } from "lucide-react"
import { NotificationList } from "@/components/notifications/notification-list"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export default function NotificationsPage() {
  const { toast } = useToast()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)

    // 模拟数据刷新
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "通知已刷新",
        description: "通知列表已更新至最新状态",
      })
    }, 1000)
  }

  const handleMarkAllAsRead = () => {
    toast({
      title: "已标记为已读",
      description: "所有通知已标记为已读",
    })
  }

  const handleClearAll = () => {
    setIsDialogOpen(true)
  }

  const confirmClearAll = () => {
    setIsDialogOpen(false)
    toast({
      title: "通知已清空",
      description: "所有通知已被清空",
      variant: "destructive",
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">通知中心</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
            <Check className="mr-2 h-4 w-4" />
            全部已读
          </Button>
          <Button variant="outline" size="sm" onClick={handleClearAll}>
            <Trash2 className="mr-2 h-4 w-4" />
            清空通知
          </Button>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "刷新中..." : "刷新"}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">全部通知</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">过去30天内的所有通知</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">未读通知</CardTitle>
            <BellOff className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">需要您查看的未读通知</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">课程反馈</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">学生对课程的反馈信息</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">待解答问题</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">需要您回答的问题列表</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">全部</TabsTrigger>
          <TabsTrigger value="unread">未读</TabsTrigger>
          <TabsTrigger value="feedback">课程反馈</TabsTrigger>
          <TabsTrigger value="questions">待解答问题</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>全部通知</CardTitle>
              <CardDescription>所有类型的通知</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationList type="all" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="unread" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>未读通知</CardTitle>
              <CardDescription>您尚未阅读的通知</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationList type="unread" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="feedback" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>课程反馈</CardTitle>
              <CardDescription>学生对课程的反馈信息</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationList type="feedback" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="questions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>待解答问题</CardTitle>
              <CardDescription>需要您回答的问题列表</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationList type="questions" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认清空通知</AlertDialogTitle>
            <AlertDialogDescription>
              您确定要清空所有通知吗？此操作不可撤销，所有通知将被永久删除。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={confirmClearAll} className="bg-red-600 hover:bg-red-700">
              清空
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
