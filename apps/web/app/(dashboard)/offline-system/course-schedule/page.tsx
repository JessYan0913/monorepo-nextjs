"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Button } from "@repo/ui/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs"
import { DatePickerWithRange } from "@repo/ui/components/ui/date-range-picker"
import { addDays, format, startOfWeek, addWeeks, eachDayOfInterval, isSameDay } from "date-fns"
import { zhCN } from "date-fns/locale"
import { DateRange } from "react-day-picker"
import { toast } from "@repo/ui/components/ui/sonner"
import { Calendar as CalendarIcon, Clock, MapPin, Users, BookOpen, CheckSquare, Filter, Download, Printer, RefreshCw } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu"

// 模拟课程数据
const timeSlots = [
  "08:00-09:30",
  "09:45-11:15",
  "11:30-13:00",
  "13:30-15:00",
  "15:15-16:45",
  "17:00-18:30",
  "19:00-20:30",
]

const locations = [
  "A101", "A102", "A103", "A201", "A202", "A203",
  "B101", "B102", "B103", "B201", "B202", "B203",
  "C101", "C102", "C103", "C201", "C202", "C203",
]

const teachers = [
  "张教授", "李教授", "王教授", "刘教授", "陈教授", "杨教授", "赵教授", "黄教授"
]

const subjects = [
  "高等数学", "线性代数", "概率论", "大学物理", "程序设计", "数据结构", "操作系统", "计算机网络",
  "数据库原理", "软件工程", "人工智能", "机器学习", "深度学习", "计算机视觉", "自然语言处理"
]

// 生成随机课程数据
const generateCourseData = (date: Date, timeSlot: string) => {
  // 70%概率有课程，30%概率为空
  if (Math.random() > 0.3) {
    const id = `course-${date.getTime()}-${timeSlot.replace(/:/g, '')}`
    const subject = subjects[Math.floor(Math.random() * subjects.length)]
    const teacher = teachers[Math.floor(Math.random() * teachers.length)]
    const location = locations[Math.floor(Math.random() * locations.length)]
    const studentCount = Math.floor(Math.random() * 40) + 10
    
    // 如果是过去的日期，标记为已完成
    const isCompleted = date < new Date()
    
    return {
      id,
      subject,
      teacher,
      location,
      studentCount,
      isCompleted
    }
  }
  
  return null
}

// 生成一周的课程表数据
const generateWeekSchedule = (startDate: Date) => {
  const weekDays = eachDayOfInterval({
    start: startDate,
    end: addDays(startDate, 6)
  })
  
  const schedule: Record<string, Record<string, any>> = {}
  
  weekDays.forEach(day => {
    const dayKey = format(day, "yyyy-MM-dd")
    schedule[dayKey] = {}
    
    timeSlots.forEach(timeSlot => {
      schedule[dayKey][timeSlot] = generateCourseData(day, timeSlot)
    })
  })
  
  return schedule
}

export default function CourseSchedulePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 1 }))
  const [weekSchedule, setWeekSchedule] = useState<Record<string, Record<string, any>>>({})
  const [dateRange, setDateRange] = useState<DateRange>({
    from: currentWeekStart,
    to: addDays(currentWeekStart, 6),
  })
  const [viewMode, setViewMode] = useState<"week" | "day">("week")
  const [selectedLocation, setSelectedLocation] = useState<string>("all")
  const [selectedTeacher, setSelectedTeacher] = useState<string>("all")
  
  // 加载课程表数据
  useEffect(() => {
    setIsLoading(true)
    // 模拟API请求延迟
    setTimeout(() => {
      setWeekSchedule(generateWeekSchedule(currentWeekStart))
      setIsLoading(false)
    }, 500)
  }, [currentWeekStart])
  
  // 处理日期范围变化
  const handleDateRangeChange = (range: DateRange | undefined) => {
    if (range?.from) {
      const newWeekStart = startOfWeek(range.from, { weekStartsOn: 1 })
      setCurrentWeekStart(newWeekStart)
      setDateRange({
        from: newWeekStart,
        to: addDays(newWeekStart, 6),
      })
    }
  }
  
  // 切换到上一周
  const goToPreviousWeek = () => {
    const newWeekStart = addWeeks(currentWeekStart, -1)
    setCurrentWeekStart(newWeekStart)
    setDateRange({
      from: newWeekStart,
      to: addDays(newWeekStart, 6),
    })
  }
  
  // 切换到下一周
  const goToNextWeek = () => {
    const newWeekStart = addWeeks(currentWeekStart, 1)
    setCurrentWeekStart(newWeekStart)
    setDateRange({
      from: newWeekStart,
      to: addDays(newWeekStart, 6),
    })
  }
  
  // 切换到当前周
  const goToCurrentWeek = () => {
    const newWeekStart = startOfWeek(new Date(), { weekStartsOn: 1 })
    setCurrentWeekStart(newWeekStart)
    setDateRange({
      from: newWeekStart,
      to: addDays(newWeekStart, 6),
    })
  }
  
  // 刷新课程表
  const refreshSchedule = () => {
    setIsLoading(true)
    toast.info("正在刷新课程表")
    
    // 模拟API请求延迟
    setTimeout(() => {
      setWeekSchedule(generateWeekSchedule(currentWeekStart))
      setIsLoading(false)
      toast.success("课程表数据已更新至最新状态")
    }, 1000)
  }
  
  // 导出课程表
  const exportSchedule = () => {
    toast.success("课程表已导出为Excel文件")
  }
  
  // 打印课程表
  const printSchedule = () => {
    toast.info("正在准备打印课程表...")
    setTimeout(() => {
      window.print()
    }, 500)
  }
  
  // 获取当前周的日期范围显示
  const weekRangeDisplay = `${format(currentWeekStart, "yyyy年MM月dd日")} - ${format(addDays(currentWeekStart, 6), "yyyy年MM月dd日")}`
  
  // 生成周视图的表头
  const weekDays = eachDayOfInterval({
    start: currentWeekStart,
    end: addDays(currentWeekStart, 6)
  })
  
  // 判断是否为今天
  const isToday = (date: Date) => isSameDay(date, new Date())
  
  // 过滤课程数据
  const filterSchedule = (schedule: Record<string, Record<string, any>>) => {
    if (selectedLocation === "all" && selectedTeacher === "all") {
      return schedule
    }
    
    const filteredSchedule = {...schedule}
    
    Object.keys(filteredSchedule).forEach(dateKey => {
      Object.keys(filteredSchedule[dateKey]).forEach(timeSlot => {
        const course = filteredSchedule[dateKey][timeSlot]
        if (course) {
          if (selectedLocation !== "all" && course.location !== selectedLocation) {
            filteredSchedule[dateKey][timeSlot] = null
          }
          if (selectedTeacher !== "all" && course.teacher !== selectedTeacher) {
            filteredSchedule[dateKey][timeSlot] = null
          }
        }
      })
    })
    
    return filteredSchedule
  }
  
  const filteredWeekSchedule = filterSchedule(weekSchedule)
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">课程表</h1>
          <p className="text-muted-foreground">{weekRangeDisplay}</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={goToCurrentWeek}>
            <CalendarIcon className="mr-2 h-4 w-4" />
            本周
          </Button>
          
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" onClick={goToPreviousWeek}>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <DatePickerWithRange
              date={dateRange}
              onDateChange={handleDateRangeChange}
              className="w-[300px]"
            />
            <Button variant="outline" size="icon" onClick={goToNextWeek}>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
          
          <Button variant="outline" size="sm" onClick={refreshSchedule} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            刷新
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                导出
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={exportSchedule}>
                <Download className="mr-2 h-4 w-4" />
                导出为Excel
              </DropdownMenuItem>
              <DropdownMenuItem onClick={printSchedule}>
                <Printer className="mr-2 h-4 w-4" />
                打印课程表
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">筛选:</span>
        </div>
        
        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="选择教室" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">所有教室</SelectItem>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>{location}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="选择教师" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">所有教师</SelectItem>
            {teachers.map((teacher) => (
              <SelectItem key={teacher} value={teacher}>{teacher}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Tabs defaultValue="week" className="ml-auto">
          <TabsList>
            <TabsTrigger value="week" onClick={() => setViewMode("week")}>周视图</TabsTrigger>
            <TabsTrigger value="day" onClick={() => setViewMode("day")}>日视图</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>课程安排</CardTitle>
          <CardDescription>
            显示{viewMode === "week" ? "一周" : "每日"}课程安排，包含教室、教师和学生信息
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex h-[400px] items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">加载课程表数据...</p>
              </div>
            </div>
          ) : (
            <div className="overflow-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border bg-muted p-2 text-left text-sm font-medium">时间</th>
                    {weekDays.map((day) => (
                      <th 
                        key={format(day, "yyyy-MM-dd")} 
                        className={`border p-2 text-left text-sm font-medium ${isToday(day) ? "bg-primary/10" : "bg-muted"}`}
                      >
                        <div className="flex flex-col">
                          <span>{format(day, "EEE", { locale: zhCN })}</span>
                          <span className={`text-xs ${isToday(day) ? "text-primary font-medium" : "text-muted-foreground"}`}>
                            {format(day, "MM月dd日")}
                            {isToday(day) && <span className="ml-1 text-xs text-primary">(今天)</span>}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((timeSlot) => (
                    <tr key={timeSlot}>
                      <td className="border p-2 text-sm font-medium text-muted-foreground">{timeSlot}</td>
                      {weekDays.map((day) => {
                        const dateKey = format(day, "yyyy-MM-dd")
                        const course = filteredWeekSchedule[dateKey]?.[timeSlot]
                        
                        return (
                          <td key={`${dateKey}-${timeSlot}`} className="border p-0">
                            {course ? (
                              <div className={`p-2 ${course.isCompleted ? "bg-muted/50" : ""} cursor-pointer hover:bg-muted/30 transition-colors`} onClick={() => window.location.href = `/offline-system/course-schedule/${course.id}`}>
                                <div className="flex items-center gap-2">
                                  <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${course.isCompleted ? "bg-green-100 dark:bg-green-900" : "bg-primary/10"}`}>
                                    {course.isCompleted ? (
                                      <CheckSquare className="h-3 w-3 text-green-600 dark:text-green-400" />
                                    ) : (
                                      <BookOpen className="h-3 w-3 text-primary" />
                                    )}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-1">
                                      <p className={`text-sm font-medium ${course.isCompleted ? "text-muted-foreground" : ""}`}>
                                        {course.subject}
                                      </p>
                                      {course.isCompleted && (
                                        <span className="text-xs text-green-600 dark:text-green-400">已完成</span>
                                      )}
                                    </div>
                                    <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                                      <div className="flex items-center gap-1">
                                        <MapPin className="h-3 w-3" />
                                        <span>{course.location}</span>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Users className="h-3 w-3" />
                                        <span>{course.teacher} | {course.studentCount}人</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="p-2 text-center text-xs text-muted-foreground">
                                -
                              </div>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// 图标组件
function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}