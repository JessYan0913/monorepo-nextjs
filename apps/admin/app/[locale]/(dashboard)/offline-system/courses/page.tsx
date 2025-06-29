"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format, isWithinInterval } from "date-fns"
import { DateRange } from "react-day-picker"
import { Calendar as CalendarIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Button } from "@repo/ui/components/ui/button"
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@repo/ui/components/ui/table"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@repo/ui/components/ui/dropdown-menu"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@repo/ui/components/ui/select"
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@repo/ui/components/ui/pagination"
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash, 
  Eye,
  FileText
} from "lucide-react"
import { Calendar } from "@repo/ui/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/ui/popover"
import { Badge } from "@repo/ui/components/ui/badge"

// 模拟教案数据
const coursesData = [
  { 
    id: "TP2023001", 
    type: "线下", 
    status: "已评分",
    score: 92,
    classTime: "2023-09-01 14:00-16:00",
    className: "初级英语会话",
    teacher: "张老师"
  },
  { 
    id: "TP2023002", 
    type: "线上", 
    status: "已评分",
    score: 88,
    classTime: "2023-09-02 09:00-11:00",
    className: "商务英语写作",
    teacher: "李老师"
  },
  { 
    id: "TP2023003", 
    type: "线下", 
    status: "待评分",
    score: null,
    classTime: "2023-09-03 13:30-15:30",
    className: "高级英语口语",
    teacher: "王老师"
  },
  { 
    id: "TP2023004", 
    type: "线上", 
    status: "已评分",
    score: 95,
    classTime: "2023-09-04 10:00-12:00",
    className: "英语语法精讲",
    teacher: "赵老师"
  },
  { 
    id: "TP2023005", 
    type: "线下", 
    status: "待评分",
    score: null,
    classTime: "2023-09-05 15:00-17:00",
    className: "英语阅读理解",
    teacher: "钱老师"
  },
  { 
    id: "TP2023006", 
    type: "线上", 
    status: "已评分",
    score: 85,
    classTime: "2023-09-06 09:30-11:30",
    className: "托福备考课程",
    teacher: "孙老师"
  },
  { 
    id: "TP2023007", 
    type: "线下", 
    status: "已评分",
    score: 90,
    classTime: "2023-09-07 14:00-16:00",
    className: "雅思口语训练",
    teacher: "周老师"
  },
  { 
    id: "TP2023008", 
    type: "线上", 
    status: "待评分",
    score: null,
    classTime: "2023-09-08 10:00-12:00",
    className: "英语听力强化",
    teacher: "吴老师"
  },
  { 
    id: "TP2023009", 
    type: "线下", 
    status: "已评分",
    score: 87,
    classTime: "2023-09-09 13:00-15:00",
    className: "商务英语口语",
    teacher: "郑老师"
  },
  { 
    id: "TP2023010", 
    type: "线上", 
    status: "待评分",
    score: null,
    classTime: "2023-09-10 16:00-18:00",
    className: "英语写作进阶",
    teacher: "王老师"
  },
  { 
    id: "TP2023011", 
    type: "线下", 
    status: "已评分",
    score: 93,
    classTime: "2023-09-11 09:00-11:00",
    className: "英语演讲技巧",
    teacher: "张老师"
  },
  { 
    id: "TP2023012", 
    type: "线上", 
    status: "待评分",
    score: null,
    classTime: "2023-09-12 14:30-16:30",
    className: "英语词汇拓展",
    teacher: "李老师"
  },
]

// 课程类型数据
const courseTypes = [
  "全部",
  "线上",
  "线下"
]

// 课程状态数据
const courseStatuses = [
  "全部",
  "已评分",
  "待评分"
]

// 辅助函数：检查日期是否在指定范围内
function isWithinDateRange(dateTimeStr: string, from: Date, to: Date): boolean {
  // 从日期时间字符串中提取日期部分（例如从"2023-09-01 14:00-16:00"中提取"2023-09-01"）
  const dateStr = dateTimeStr.split(' ')[0]
  const date = new Date(dateStr)
  return isWithinInterval(date, { start: from, end: to })
}

export default function CoursesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("") // 用于搜索教案编号
  const [selectedType, setSelectedType] = useState("全部") // 课程类型筛选
  const [selectedStatus, setSelectedStatus] = useState("全部") // 课程状态筛选
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined) // 日期范围筛选
  const [currentPage, setCurrentPage] = useState(1) // 当前页码
  const itemsPerPage = 5 // 每页显示的数量
  
  // 过滤教案数据
  const filteredCourses = coursesData.filter(course => {
    // 根据教案编号筛选
    const matchesSearchTerm = searchTerm === "" || 
      course.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    // 根据课程类型筛选
    const matchesType = selectedType === "全部" || course.type === selectedType
    
    // 根据课程状态筛选
    const matchesStatus = selectedStatus === "全部" || course.status === selectedStatus
    
    // 根据日期范围筛选
    let matchesDateRange = true
    if (dateRange?.from && dateRange?.to) {
      matchesDateRange = isWithinDateRange(course.classTime, dateRange.from, dateRange.to)
    }
    
    return matchesSearchTerm && matchesType && matchesStatus && matchesDateRange
  })
  
  // 计算总页数
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage)
  
  // 获取当前页的数据
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )
  
  // 重置分页
  const resetPagination = () => {
    setCurrentPage(1)
  }
  
  // 处理筛选条件变化
  const handleFilterChange = () => {
    resetPagination()
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">教案管理</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          新增教案
        </Button>
      </div>
      
      {/* 筛选卡片 */}
      <Card>
        <CardHeader>
          <CardTitle>筛选条件</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* 教案编号搜索 */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="search">教案编号</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="搜索教案编号"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    handleFilterChange()
                  }}
                />
              </div>
            </div>
            
            {/* 课程类型筛选 */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="course-type">课程类型</Label>
              <Select
                value={selectedType}
                onValueChange={(value) => {
                  setSelectedType(value)
                  handleFilterChange()
                }}
              >
                <SelectTrigger id="course-type">
                  <SelectValue placeholder="选择课程类型" />
                </SelectTrigger>
                <SelectContent>
                  {courseTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* 课程状态筛选 */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="course-status">课程状态</Label>
              <Select
                value={selectedStatus}
                onValueChange={(value) => {
                  setSelectedStatus(value)
                  handleFilterChange()
                }}
              >
                <SelectTrigger id="course-status">
                  <SelectValue placeholder="选择课程状态" />
                </SelectTrigger>
                <SelectContent>
                  {courseStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* 日期范围筛选 */}
            <div className="flex flex-col space-y-1.5">
              <Label>上课时间范围</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "yyyy-MM-dd")} 至{" "}
                          {format(dateRange.to, "yyyy-MM-dd")}
                        </>
                      ) : (
                        format(dateRange.from, "yyyy-MM-dd")
                      )
                    ) : (
                      <span>选择日期范围</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={(range) => {
                      setDateRange(range)
                      handleFilterChange()
                    }}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* 教案列表卡片 */}
      <Card>
        <CardHeader>
          <CardTitle>教案列表</CardTitle>
        </CardHeader>
        <CardContent>
          {/* 教案表格 */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>教案编号</TableHead>
                <TableHead>课程名称</TableHead>
                <TableHead>课程类型</TableHead>
                <TableHead>课程状态</TableHead>
                <TableHead>上课时间</TableHead>
                <TableHead>授课教师</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCourses.length > 0 ? (
                paginatedCourses.map((course) => (
                  <TableRow 
                    key={course.id} 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => router.push(`/offline-system/courses/${course.id}`)}>
                  
                    <TableCell className="font-medium">{course.id}</TableCell>
                    <TableCell className="font-medium text-primary hover:underline">{course.className}</TableCell>
                    <TableCell>
                      <Badge variant={course.type === "线上" ? "outline" : "secondary"}>
                        {course.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={course.status === "已评分" ? "default" : "secondary"} className={course.status === "已评分" ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"}>
                        {course.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{course.classTime}</TableCell>
                    <TableCell>{course.teacher}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>操作</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => router.push(`/offline-system/courses/${course.id}`)}>
                            <Eye className="mr-2 h-4 w-4" />
                            查看详情
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            编辑教案
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            {course.status === "待评分" ? "评分" : "修改评分"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash className="mr-2 h-4 w-4" />
                            删除教案
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    未找到匹配的教案信息
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          {/* 分页控件 */}
          {totalPages > 1 && (
            <div className="mt-4 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <PaginationItem key={i}>
                      <PaginationLink
                        onClick={() => setCurrentPage(i + 1)}
                        isActive={currentPage === i + 1}
                      >
                        {i + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
