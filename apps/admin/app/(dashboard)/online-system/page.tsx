"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { RefreshCw, Users, UserPlus, GraduationCap, Video, BookOpen, Clock, Calendar, Play, Activity } from "lucide-react"

export default function OnlineSystemPage() {
  const { toast } = useToast()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">线上教学系统</h1>
          <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded">线上模式</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">学生总数</CardTitle>
            <CardDescription>平台注册的所有学生</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,486</div>
            <p className="text-xs text-muted-foreground">较上月 +8.3%</p>
            <div className="absolute bottom-0 right-0 p-2">
              <Users className="h-8 w-8 text-muted-foreground/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">新增学员数</CardTitle>
            <CardDescription>本月新注册的学员</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">957</div>
            <p className="text-xs text-muted-foreground">较上月 +15.2%</p>
            <div className="absolute bottom-0 right-0 p-2">
              <UserPlus className="h-8 w-8 text-muted-foreground/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">教师人数</CardTitle>
            <CardDescription>平台认证的教师数量</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">284</div>
            <p className="text-xs text-muted-foreground">本月新增 +12</p>
            <div className="absolute bottom-0 right-0 p-2">
              <GraduationCap className="h-8 w-8 text-muted-foreground/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">课程总数</CardTitle>
            <CardDescription>平台上的所有课程</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">本周新增 +5</p>
            <div className="absolute bottom-0 right-0 p-2">
              <BookOpen className="h-8 w-8 text-muted-foreground/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>近期直播课程</CardTitle>
            <CardDescription>即将开始和正在进行的直播课程</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { status: "直播中", time: "正在进行", title: "高等数学线上辅导", teacher: "张教授", students: 128 },
                { status: "即将开始", time: "今天 14:00", title: "Python编程基础", teacher: "李教授", students: 86 },
                { status: "即将开始", time: "今天 16:30", title: "英语口语强化训练", teacher: "王教授", students: 64 },
                { status: "即将开始", time: "明天 09:00", title: "数据结构与算法", teacher: "赵教授", students: 92 },
              ].map((course, i) => (
                <div key={i} className="flex items-center gap-4 rounded-lg border p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Play className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium leading-none">{course.title}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${course.status === "直播中" ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300" : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"}`}>
                        {course.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">讲师: {course.teacher} | 学生: {course.students}人</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {course.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>热门课程</CardTitle>
            <CardDescription>本周最受欢迎的课程</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "人工智能导论", views: 2456, rating: 4.8 },
                { title: "Web前端开发实战", views: 1892, rating: 4.7 },
                { title: "数据分析与可视化", views: 1654, rating: 4.6 },
                { title: "云计算与大数据", views: 1432, rating: 4.5 },
                { title: "移动应用开发", views: 1298, rating: 4.4 },
              ].map((course, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    <span className="text-sm font-medium">{i + 1}</span>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{course.title}</p>
                    <p className="text-xs text-muted-foreground">观看: {course.views} | 评分: {course.rating}</p>
                  </div>
                  <div className="flex items-center">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
