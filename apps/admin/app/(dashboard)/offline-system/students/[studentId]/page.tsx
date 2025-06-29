"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from "@repo/ui/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar"
import { Badge } from "@repo/ui/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui/components/ui/table"
import { Button } from "@repo/ui/components/ui/button"
import { Progress } from "@repo/ui/components/ui/progress"
import { Phone, MapPin, Calendar, GraduationCap, Clock, BookOpen, AlertCircle, CheckCircle2, Timer } from "lucide-react"

// 模拟学生数据
const studentData = {
  id: 1,
  name: "张三",
  avatar: "/placeholder.svg?height=128&width=128",
  gender: "男",
  registerDate: "2023-09-01",
  membershipLevel: "黄金会员",
  campus: "北京校区",
  teacher: {
    name: "王老师",
    phone: "13800138000"
  }
}

// 模拟课程数据
const coursesData = [
  {
    id: 1,
    name: "少儿英语基础班",
    validUntil: "2024-12-31",
    attendedClasses: 12,
    totalClasses: 48,
    teacher: "王老师",
    nextClass: "2025-05-17 14:00",
    color: "#4f46e5", // 靛蓝色
    status: "active"
  },
  {
    id: 2,
    name: "少儿英语提高班",
    validUntil: "2024-12-31",
    attendedClasses: 8,
    totalClasses: 48,
    teacher: "李老师",
    nextClass: "2025-05-18 15:30",
    color: "#0891b2", // 青色
    status: "active"
  },
  {
    id: 3,
    name: "少儿英语口语班",
    validUntil: "2024-06-30",
    attendedClasses: 4,
    totalClasses: 24,
    teacher: "张老师",
    nextClass: "2025-05-16 16:00",
    color: "#ea580c", // 橙色
    status: "expiring"
  }
]

// 模拟购买记录
const purchaseRecords = [
  {
    id: "ORD20230901001",
    product: "少儿英语基础班 48课时",
    amount: 4800,
    date: "2023-09-01"
  },
  {
    id: "ORD20230901002",
    product: "少儿英语提高班 48课时",
    amount: 5200,
    date: "2023-09-01"
  },
  {
    id: "ORD20230915001",
    product: "少儿英语口语班 24课时",
    amount: 2400,
    date: "2023-09-15"
  }
]

// 模拟上课记录
const classRecords = [
  {
    id: 1,
    course: "少儿英语基础班",
    date: "2023-09-05 14:00",
    duration: 45
  },
  {
    id: 2,
    course: "少儿英语基础班",
    date: "2023-09-07 14:00",
    duration: 45
  },
  {
    id: 3,
    course: "少儿英语提高班",
    date: "2023-09-09 15:00",
    duration: 45
  }
]

export default function StudentDetailPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        {/* 学生信息卡片 */}
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle>学生信息</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-6">
              {/* 头像和基本信息 */}
              <div className="flex gap-6">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={studentData.avatar} alt={studentData.name} />
                  <AvatarFallback>{studentData.name[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-semibold">{studentData.name}</h3>
                      <Badge variant="secondary">{studentData.membershipLevel}</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4" />
                      <span>{studentData.campus}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>注册日期：{studentData.registerDate}</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* 老师信息卡片 */}
              <Card className="ml-auto w-[240px]">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">负责老师</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <GraduationCap className="h-4 w-4" />
                      <span>{studentData.teacher.name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4" />
                      <span>{studentData.teacher.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 主要内容区 */}
      <Tabs defaultValue="courses" className="w-full">
        <TabsList>
          <TabsTrigger value="courses">报读课程</TabsTrigger>
          <TabsTrigger value="purchases">购买记录</TabsTrigger>
          <TabsTrigger value="attendance">上课记录</TabsTrigger>
        </TabsList>

        {/* 课程列表 */}
        <TabsContent value="courses">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coursesData.map((course) => {
              // 计算进度百分比
              const progressPercentage = Math.round((course.attendedClasses / course.totalClasses) * 100);
              // 计算剩余课时
              const remainingClasses = course.totalClasses - course.attendedClasses;
              // 判断课程状态
              const isExpiring = course.status === "expiring";
              
              return (
                <Card key={course.id} className="transition-all hover:shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{course.name}</CardTitle>
                        <CardDescription className="mt-1 flex items-center gap-1">
                          <GraduationCap className="h-3.5 w-3.5" />
                          <span>{course.teacher}</span>
                        </CardDescription>
                      </div>
                      {isExpiring ? (
                        <Badge variant="destructive" className="flex items-center gap-1">
                          <AlertCircle className="h-3.5 w-3.5" />
                          <span>即将到期</span>
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>进行中</span>
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">课时进度</span>
                          <span className="font-medium">{course.attendedClasses}/{course.totalClasses}</span>
                        </div>
                        <Progress value={progressPercentage} className="h-2" />
                        <div className="flex justify-between text-xs">
                          <span>已完成 {progressPercentage}%</span>
                          <span>剩余 {remainingClasses} 课时</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="space-y-1">
                          <div className="text-xs text-muted-foreground">有效期至</div>
                          <div className="flex items-center gap-1 font-medium">
                            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{course.validUntil}</span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-xs text-muted-foreground">下次上课</div>
                          <div className="flex items-center gap-1 font-medium">
                            <Timer className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{course.nextClass}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-0">
                    <Button variant="ghost" size="sm" className="text-xs">
                      <BookOpen className="mr-1 h-3.5 w-3.5" />
                      课程详情
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      <Clock className="mr-1 h-3.5 w-3.5" />
                      预约课程
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* 购买记录 */}
        <TabsContent value="purchases">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>订单号</TableHead>
                    <TableHead>购买商品</TableHead>
                    <TableHead className="text-right">金额</TableHead>
                    <TableHead className="text-right">订单日期</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchaseRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.id}</TableCell>
                      <TableCell>{record.product}</TableCell>
                      <TableCell className="text-right">￥{record.amount}</TableCell>
                      <TableCell className="text-right">{record.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 上课记录 */}
        <TabsContent value="attendance">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>课程</TableHead>
                    <TableHead>时间</TableHead>
                    <TableHead className="text-right">时长（分钟）</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.course}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell className="text-right">{record.duration}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
