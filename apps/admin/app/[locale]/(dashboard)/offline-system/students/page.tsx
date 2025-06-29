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
} from "lucide-react"
import { Calendar } from "@repo/ui/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/ui/popover"

// 模拟学生数据
const studentsData = [
  { 
    id: 1, 
    name: "张三", 
    avatar: "/placeholder.svg?height=40&width=40",
    gender: "男",
    campus: "北京校区",
    registerDate: "2023-09-01"
  },
  { 
    id: 2, 
    name: "李四", 
    avatar: "/placeholder.svg?height=40&width=40",
    gender: "男",
    campus: "上海校区",
    registerDate: "2023-09-02"
  },
  { 
    id: 3, 
    name: "王五", 
    avatar: "/placeholder.svg?height=40&width=40",
    gender: "男",
    campus: "广州校区",
    registerDate: "2023-09-01"
  },
  { 
    id: 4, 
    name: "赵六", 
    avatar: "/placeholder.svg?height=40&width=40",
    gender: "女",
    campus: "深圳校区",
    registerDate: "2023-09-03"
  },
  { 
    id: 5, 
    name: "钱七", 
    avatar: "/placeholder.svg?height=40&width=40",
    gender: "女",
    campus: "成都校区",
    registerDate: "2023-09-02"
  },
  { 
    id: 6, 
    name: "孙八", 
    avatar: "/placeholder.svg?height=40&width=40",
    gender: "男",
    campus: "武汉校区",
    registerDate: "2023-09-05"
  },
  { 
    id: 7, 
    name: "周九", 
    avatar: "/placeholder.svg?height=40&width=40",
    gender: "女",
    campus: "北京校区",
    registerDate: "2023-09-01"
  },
  { 
    id: 8, 
    name: "吴十", 
    avatar: "/placeholder.svg?height=40&width=40",
    gender: "男",
    campus: "上海校区",
    registerDate: "2023-09-02"
  },
  { 
    id: 9, 
    name: "郑十一", 
    avatar: "/placeholder.svg?height=40&width=40",
    gender: "女",
    campus: "广州校区",
    registerDate: "2023-09-01"
  },
  { 
    id: 10, 
    name: "王十二", 
    avatar: "/placeholder.svg?height=40&width=40",
    gender: "男",
    campus: "深圳校区",
    registerDate: "2023-09-03"
  },
]

// 校区数据
const campuses = [
  "全部",
  "北京校区",
  "上海校区",
  "广州校区",
  "深圳校区",
  "成都校区",
  "武汉校区"
]

// 性别数据
const genders = [
  "全部",
  "男",
  "女"
]

// 注册日期
const registerDates = [
  "全部",
  "2023-09-01",
  "2023-09-02",
  "2023-09-03",
  "2023-09-05"
]

// 辅助函数：检查日期是否在指定范围内
function isWithinDateRange(dateStr: string, from: Date, to: Date): boolean {
  const date = new Date(dateStr)
  return isWithinInterval(date, { start: from, end: to })
}

export default function StudentsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGender, setSelectedGender] = useState("全部")
  const [selectedCampus, setSelectedCampus] = useState("全部")
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState(1)
  
  // 过滤学生数据
  const filteredStudents = studentsData.filter(student => 
    (searchTerm === "" || 
     student.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedGender === "全部" || student.gender === selectedGender) &&
    (selectedCampus === "全部" || student.campus === selectedCampus) &&
    (!dateRange || !dateRange.from || 
     (dateRange.from && !dateRange.to && student.registerDate === format(dateRange.from, 'yyyy-MM-dd')) ||
     (dateRange.from && dateRange.to && isWithinDateRange(student.registerDate, dateRange.from, dateRange.to)))
  )
  
  // 分页逻辑
  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">学生管理</h1>
          <p className="text-muted-foreground">查看和管理所有学生信息</p>
        </div>
      </div>
      
      {/* 筛选表单 */}
      <Card>
        <CardHeader>
          <CardTitle>筛选条件</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[200px] max-w-xs">
              <Label htmlFor="search" className="mb-2 block">姓名</Label>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="输入姓名搜索"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="w-[120px]">
              <Label htmlFor="gender" className="mb-2 block">性别</Label>
              <Select
                value={selectedGender}
                onValueChange={setSelectedGender}
              >
                <SelectTrigger id="gender">
                  <SelectValue placeholder="选择性别" />
                </SelectTrigger>
                <SelectContent>
                  {genders.map((gender) => (
                    <SelectItem key={gender} value={gender}>{gender}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-[160px]">
              <Label htmlFor="campus" className="mb-2 block">校区</Label>
              <Select
                value={selectedCampus}
                onValueChange={setSelectedCampus}
              >
                <SelectTrigger id="campus">
                  <SelectValue placeholder="选择校区" />
                </SelectTrigger>
                <SelectContent>
                  {campuses.map((campus) => (
                    <SelectItem key={campus} value={campus}>{campus}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-[280px]">
              <Label htmlFor="registerDate" className="mb-2 block">注册日期</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="registerDate"
                    variant={"outline"}
                    className={"w-full justify-start text-left font-normal"}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <span>
                          {format(dateRange.from, "yyyy-MM-dd")} ~ {format(dateRange.to, "yyyy-MM-dd")}
                        </span>
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
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="flex items-end gap-2 ml-auto">
              <Button onClick={() => {
                setSearchTerm("")
                setSelectedGender("全部")
                setSelectedCampus("全部")
                setDateRange(undefined)
              }}>
                重置筛选
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* 学生表格 */}
      <Card>
        <CardHeader>
          <CardTitle>
            学生列表
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              共 {filteredStudents.length} 名学生
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>头像</TableHead>
                <TableHead>姓名</TableHead>
                <TableHead>性别</TableHead>
                <TableHead>校区</TableHead>
                <TableHead>注册时间</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedStudents.length > 0 ? (
                paginatedStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="avatar">
                        <img 
                          src={student.avatar} 
                          alt={`${student.name}的头像`} 
                          className="h-10 w-10 rounded-full"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.gender}</TableCell>
                    <TableCell>{student.campus}</TableCell>
                    <TableCell>{student.registerDate}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>操作</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => router.push(`/offline-system/students/${student.id}`)}>
                            <Eye className="mr-2 h-4 w-4" />
                            查看详情
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            编辑信息
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash className="mr-2 h-4 w-4" />
                            删除学生
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    未找到匹配的学生信息
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
