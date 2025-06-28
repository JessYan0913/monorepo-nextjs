"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { RefreshCw, Users, BookOpen, Calendar, Clock, Map, ClipboardList, CheckSquare, Download, UserPlus, GraduationCap, Presentation } from "lucide-react"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { addDays, format } from "date-fns"
import Link from "next/link"
import { DateRange } from "react-day-picker"

export default function OfflineSystemPage() {
  const { toast } = useToast()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [dateRange, setDateRange] = useState<DateRange>({
    from: addDays(new Date(), -30),
    to: new Date(),
  })

  const handleRefresh = () => {
    setIsRefreshing(true)

    // 模拟数据刷新，包含日期范围信息
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "数据已刷新",
        description: `线下系统数据已更新至最新状态，日期范围: ${format(dateRange.from || new Date(), "yyyy-MM-dd")} 至 ${format(dateRange.to || new Date(), "yyyy-MM-dd")}`,
      })
    }, 1000)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">线下教学系统</h1>
          <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs font-medium px-2.5 py-0.5 rounded">线下模式</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">学员总数</CardTitle>
            <CardDescription>所有在读学员</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">较上学期 +8.3%</p>
            <div className="absolute bottom-0 right-0 p-2">
              <Users className="h-8 w-8 text-muted-foreground/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">新增学员</CardTitle>
            <CardDescription>本月新入学学员</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86</div>
            <p className="text-xs text-muted-foreground">较上月 +15.2%</p>
            <div className="absolute bottom-0 right-0 p-2">
              <UserPlus className="h-8 w-8 text-muted-foreground/30" />
            </div>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">教师人数</CardTitle>
            <CardDescription>在职教师总数</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">本学期新增 +5</p>
            <div className="absolute bottom-0 right-0 p-2">
              <GraduationCap className="h-8 w-8 text-muted-foreground/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-7">
          <CardHeader>
            <CardTitle>课程表</CardTitle>
            <CardDescription>近期课程安排，共7节课程</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border bg-muted p-2 text-left text-sm font-medium">时间</th>
                    <th className="border bg-muted p-2 text-left text-sm font-medium">5月14日 (今天)</th>
                    <th className="border bg-muted p-2 text-left text-sm font-medium">5月15日 (明天)</th>
                  </tr>
                </thead>
                <tbody>
                  {/* 时间段 1: 08:00-09:30 */}
                  <tr>
                    <td className="border p-2 text-sm font-medium text-muted-foreground">08:00-09:30</td>
                    <td className="border p-0">
                      <div className="p-2 bg-muted/50">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                            <CheckSquare className="h-3 w-3 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1">
                              <p className="text-sm font-medium text-muted-foreground">高等数学</p>
                              <span className="text-xs text-green-600 dark:text-green-400">已完成</span>
                            </div>
                            <p className="text-xs text-muted-foreground">教室: A101 | 教师: 张教授</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="border p-0">
                      <div className="p-2">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <BookOpen className="h-3 w-3 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">线性代数</p>
                            <p className="text-xs text-muted-foreground">教室: A102 | 教师: 张教授</p>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  
                  {/* 时间段 2: 10:00-11:30 */}
                  <tr>
                    <td className="border p-2 text-sm font-medium text-muted-foreground">10:00-11:30</td>
                    <td className="border p-0">
                      <div className="p-2 bg-muted/50">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                            <CheckSquare className="h-3 w-3 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1">
                              <p className="text-sm font-medium text-muted-foreground">大学物理</p>
                              <span className="text-xs text-green-600 dark:text-green-400">已完成</span>
                            </div>
                            <p className="text-xs text-muted-foreground">教室: B203 | 教师: 李教授</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="border p-0">
                      <div className="p-2">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <BookOpen className="h-3 w-3 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">概率论</p>
                            <p className="text-xs text-muted-foreground">教室: B205 | 教师: 李教授</p>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  
                  {/* 时间段 3: 13:30-15:00 */}
                  <tr>
                    <td className="border p-2 text-sm font-medium text-muted-foreground">13:30-15:00</td>
                    <td className="border p-0">
                      <div className="p-2 bg-muted/50">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                            <CheckSquare className="h-3 w-3 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1">
                              <p className="text-sm font-medium text-muted-foreground">程序设计</p>
                              <span className="text-xs text-green-600 dark:text-green-400">已完成</span>
                            </div>
                            <p className="text-xs text-muted-foreground">教室: C305 | 教师: 王教授</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="border p-0">
                      <div className="p-2">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                            <BookOpen className="h-3 w-3 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">数据结构</p>
                            <p className="text-xs text-muted-foreground">教室: C307 | 教师: 王教授</p>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  
                  {/* 时间段 4: 15:30-17:00 */}
                  <tr>
                    <td className="border p-2 text-sm font-medium text-muted-foreground">15:30-17:00</td>
                    <td className="border p-0">
                      <div className="p-2 bg-muted/50">
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                            <CheckSquare className="h-3 w-3 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1">
                              <p className="text-sm font-medium text-muted-foreground">英语听力</p>
                              <span className="text-xs text-green-600 dark:text-green-400">已完成</span>
                            </div>
                            <p className="text-xs text-muted-foreground">教室: D407 | 教师: 刘教授</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="border p-0">
                      <div className="p-2 text-center text-sm text-muted-foreground">无课</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>课时预警</CardTitle>
              <CardDescription>剩余课时不足5课时的学员</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              刷新数据
            </Button>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid grid-cols-5 border-b px-4 py-2 font-medium text-sm">
                <div>学员姓名</div>
                <div>联系方式</div>
                <div>剩余课时</div>
                <div>最后上课日期</div>
                <div>操作</div>
              </div>
              {[
                { name: "王小明", contact: "138****1234", remainingHours: 2, lastClassDate: "2025-05-12" },
                { name: "李华", contact: "139****5678", remainingHours: 3, lastClassDate: "2025-05-13" },
                { name: "张三", contact: "137****9012", remainingHours: 1, lastClassDate: "2025-05-10" },
                { name: "赵丽", contact: "136****3456", remainingHours: 4, lastClassDate: "2025-05-14" },
                { name: "刘晨", contact: "135****7890", remainingHours: 0, lastClassDate: "2025-05-08" },
              ].map((student, i) => (
                <div key={i} className="grid grid-cols-5 border-b px-4 py-3 text-sm items-center">
                  <div className="font-medium">{student.name}</div>
                  <div className="text-muted-foreground">{student.contact}</div>
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      student.remainingHours === 0 
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' 
                        : student.remainingHours <= 2
                          ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                    }`}>
                      {student.remainingHours} 课时
                    </span>
                  </div>
                  <div className="text-muted-foreground">{student.lastClassDate}</div>
                  <div>
                    <Button variant="ghost" size="sm">
                      续课
                    </Button>
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
