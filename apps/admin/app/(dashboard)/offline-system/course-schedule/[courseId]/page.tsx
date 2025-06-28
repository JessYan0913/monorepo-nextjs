"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Calendar, Clock, MapPin, User, Users, BookOpen, CheckSquare, Search, Download, Printer } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LessonPlanDisplay } from "./components/LessonPlanDisplay"
import { StudentAttendanceStatus, Student, CourseDetail, LessonPlan } from "./types"

// 模拟获取课程详情数据
const fetchCourseDetail = (courseId: string): Promise<CourseDetail> => {
  // 模拟API请求延迟
  return new Promise((resolve) => {
    setTimeout(() => {
      // 生成随机学生数据
      const studentCount = Math.floor(Math.random() * 20) + 10
      const students: Student[] = Array.from({ length: studentCount }).map((_, index) => ({
        id: `student-${index + 1}`,
        name: `学生${index + 1}`,
        availableHours: Math.floor(Math.random() * 50) + 10,
        attendanceStatus: (() => {
          const statuses = [
            StudentAttendanceStatus.PRESENT, 
            StudentAttendanceStatus.PRESENT, 
            StudentAttendanceStatus.PRESENT, 
            StudentAttendanceStatus.PRESENT, 
            StudentAttendanceStatus.ABSENT, 
            StudentAttendanceStatus.LEAVE, 
            StudentAttendanceStatus.LATE
          ]
          return statuses[Math.floor(Math.random() * statuses.length)]
        })(),
        leaveReason: Math.random() > 0.7 ? "家庭原因" : undefined
      }))
      
      resolve({
        id: courseId,
        subject: "高等数学",
        date: "2025年5月16日",
        timeSlot: "09:45-11:15",
        courseType: "常规课程",
        location: "A101",
        teacher: "张教授",
        students
      })
    }, 500)
  })
}

export default function CourseDetailPage() {
  const searchParams = useSearchParams()
  const courseId = searchParams.get("id") || "default-course"
  const { toast } = useToast()
  
  const [isLoading, setIsLoading] = useState(true)
  const [courseDetail, setCourseDetail] = useState<CourseDetail | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("students")

  // 使用从types导入的LessonPlan类型

  // 初始化默认值
  const defaultLessonPlan: LessonPlan = {
    topic: "",
    purpose: "",
    actions: []
  }

  const [lessonPlan, setLessonPlan] = useState<LessonPlan>(() => ({
    ...defaultLessonPlan,
    topic: courseDetail?.subject || "未定义课题"
  }))

  // 当课程详情变化时更新课程计划
  useEffect(() => {
    if (courseDetail) {
      const mockData: LessonPlan = {
        courseId: courseId,
        classTime: new Date(),
        
        // 召集环节
        gatheringDuration: "15分钟",
        gatheringContent: "师生问候、自我介绍",
        warmupContent: "简单的英语对话练习",
        warmupDuration: "10分钟",
        
        topic: courseDetail.subject || "英语发音与口语交流课",
        purpose: "",
        
        // 课程主轴（动态表单）
        actions: [
          {
            action: "单词发音练习",
            requirement: "正确发音，注意音调",
            purpose: "提高发音准确性",
            beginnerStep: { content: "基础单词发音", duration: "5分钟" },
            intermediateStep: { content: "连读和弱读", duration: "7分钟" },
            advancedStep: { content: "语调和重音", duration: "8分钟" },
          },
          {
            action: "对话练习",
            requirement: "流利表达，自然交流",
            purpose: "提高口语交流能力",
            beginnerStep: { content: "简单问候对话", duration: "10分钟" },
            intermediateStep: { content: "日常情景对话", duration: "15分钟" },
            advancedStep: { content: "复杂话题讨论", duration: "20分钟" },
          }
        ]
      };

      setLessonPlan(mockData);
    }
  }, [courseDetail, courseId])
  
  // 加载课程详情数据
  useEffect(() => {
    setIsLoading(true)
    fetchCourseDetail(courseId)
      .then((data) => {
        setCourseDetail(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Failed to fetch course detail:", error)
        toast({
          title: "加载失败",
          description: "无法获取课程详情数据，请稍后重试",
          variant: "destructive"
        })
        setIsLoading(false)
      })
  }, [courseId, toast])
  
  // 处理签到状态变更
  const handleAttendanceStatusChange = (studentId: string, status: StudentAttendanceStatus, leaveReason?: string) => {
    if (!courseDetail) return
    
    setCourseDetail({
      ...courseDetail,
      students: courseDetail.students.map((student) =>
        student.id === studentId 
          ? { 
              ...student, 
              attendanceStatus: status,
              leaveReason: status === StudentAttendanceStatus.LEAVE ? (leaveReason || "未说明") : undefined
            } 
          : student
      )
    })
    
    const statusLabels = {
      [StudentAttendanceStatus.PRESENT]: "签到",
      [StudentAttendanceStatus.ABSENT]: "旷课",
      [StudentAttendanceStatus.LEAVE]: "请假",
      [StudentAttendanceStatus.LATE]: "迟到"
    }
    
    toast({
      title: `学生状态更新: ${statusLabels[status]}`,
      description: `学生 ${courseDetail.students.find(s => s.id === studentId)?.name} 状态已更新为${statusLabels[status]}`
    })
  }
  
  // 导出学生名单
  const exportStudentList = () => {
    toast({
      title: "导出成功",
      description: "学生名单已导出为Excel文件"
    })
  }
  
  // 打印学生名单
  const printStudentList = () => {
    toast({
      title: "准备打印",
      description: "正在准备打印学生名单..."
    })
    setTimeout(() => {
      window.print()
    }, 500)
  }
  
  // 过滤学生列表
  const filteredStudents = courseDetail?.students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []
  
  // 计算不同状态的学生数量
  const studentStatusCounts = courseDetail ? {
    total: courseDetail.students.length,
    present: courseDetail.students.filter(s => s.attendanceStatus === StudentAttendanceStatus.PRESENT).length,
    absent: courseDetail.students.filter(s => s.attendanceStatus === StudentAttendanceStatus.ABSENT).length,
    leave: courseDetail.students.filter(s => s.attendanceStatus === StudentAttendanceStatus.LEAVE).length,
    late: courseDetail.students.filter(s => s.attendanceStatus === StudentAttendanceStatus.LATE).length
  } : {
    total: 0,
    present: 0,
    absent: 0,
    leave: 0,
    late: 0
  }
  
  // 计算签到率
  const attendanceRate = courseDetail
    ? Math.round((courseDetail.students.filter((s) => s.attendanceStatus === StudentAttendanceStatus.PRESENT).length / courseDetail.students.length) * 100)
    : 0
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 border-b pb-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/offline-system/course-schedule">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">{courseDetail?.subject || "课程详情"}</h1>
              <Badge variant="secondary" className="text-sm">{courseDetail?.courseType}</Badge>
            </div>
            <div className="mt-2 flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{courseDetail?.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{courseDetail?.timeSlot}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{courseDetail?.location}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-sm font-medium">{courseDetail?.teacher}</p>
              <p className="text-xs text-muted-foreground">授课教师</p>
            </div>
            <Avatar>
              <AvatarFallback className="bg-primary/10 text-primary">{courseDetail?.teacher?.slice(0, 1)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="border-l pl-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{courseDetail?.students.length} 名学生</span>
            </div>
          </div>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-xl grid-cols-2">
          <TabsTrigger value="students">学生名单</TabsTrigger>
          <TabsTrigger value="lesson-plan">教案详情</TabsTrigger>
        </TabsList>
        
        
        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>学生名单</CardTitle>
                <CardDescription>查看和管理学生签到情况</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex h-[300px] items-center justify-center">
                  <p className="text-sm text-muted-foreground">加载学生名单...</p>
                </div>
              ) : courseDetail ? (
                <>
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="搜索学生..."
                          className="pl-8 w-64"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        共 {filteredStudents.length} 名学生
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <span className="text-sm">已签到: {studentStatusCounts.present}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                        <span className="text-sm">旷课: {studentStatusCounts.absent}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">请假: {studentStatusCounts.leave}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">迟到: {studentStatusCounts.late}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50px]">序号</TableHead>
                          <TableHead>学生姓名</TableHead>
                          <TableHead>可用课时</TableHead>
                          <TableHead className="text-right">签到状态</TableHead>
                          <TableHead className="text-center">操作</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredStudents.length > 0 ? (
                          filteredStudents.map((student, index) => (
                            <TableRow key={student.id}>
                              <TableCell className="font-medium">{index + 1}</TableCell>
                              <TableCell>{student.name}</TableCell>
                              <TableCell>{student.availableHours} 小时</TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end space-x-2">
                                  <select
                                    value={student.attendanceStatus}
                                    onChange={(e) => handleAttendanceStatusChange(student.id, e.target.value as StudentAttendanceStatus)}
                                    className="text-sm rounded border px-2 py-1"
                                  >
                                    <option value={StudentAttendanceStatus.PRESENT}>已签到</option>
                                    <option value={StudentAttendanceStatus.LATE}>迟到</option>
                                    <option value={StudentAttendanceStatus.LEAVE}>请假</option>
                                    <option value={StudentAttendanceStatus.ABSENT}>旷课</option>
                                  </select>
                                  {student.attendanceStatus === StudentAttendanceStatus.LEAVE && (
                                    <Input
                                      placeholder="请假原因"
                                      className="ml-2 w-32 text-sm"
                                      value={student.leaveReason || ""}
                                      onChange={(e) => handleAttendanceStatusChange(
                                        student.id, 
                                        StudentAttendanceStatus.LEAVE, 
                                        e.target.value
                                      )}
                                    />
                                  )}
                                </div>
                              </TableCell>
                              <TableCell className="text-center">
                                <Link 
                                  href={`/offline-system/course-schedule/${courseDetail?.id}/score/${student.id}`}
                                  className="inline-flex h-8 items-center justify-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground shadow hover:bg-primary/90"
                                >
                                  评分
                                </Link>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center">
                              未找到匹配的学生
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </>
              ) : (
                <div className="flex h-[300px] items-center justify-center">
                  <p className="text-sm text-muted-foreground">未找到学生信息</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="lesson-plan" className="space-y-4">
          <LessonPlanDisplay lessonPlan={lessonPlan} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
