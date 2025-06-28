"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination"
import { 
  Search, 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash, 
  Eye, 
  Clock, 
  Users, 
  Calendar, 
  BookOpen, 
  Star, 
  Play, 
  Video, 
  FileText,
  Filter
} from "lucide-react"

// 模拟课程数据
const coursesData = [
  { 
    id: 1, 
    title: "Python编程基础", 
    instructor: "张教授", 
    type: "录播课程", 
    category: "编程开发",
    students: 1245,
    lessons: 32,
    duration: "16小时",
    rating: 4.8,
    progress: 0,
    coverImage: "https://placehold.co/400x225/3b82f6/FFFFFF.png?text=Python编程基础",
    description: "本课程介绍Python编程的基础知识，包括变量、数据类型、控制流、函数、模块等内容。适合零基础学习者。",
    tags: ["Python", "编程基础", "零基础"]
  },
  { 
    id: 2, 
    title: "Web前端开发实战", 
    instructor: "李教授", 
    type: "直播课程", 
    category: "前端开发",
    students: 986,
    lessons: 24,
    duration: "12小时",
    rating: 4.7,
    progress: 45,
    coverImage: "https://placehold.co/400x225/ec4899/FFFFFF.png?text=Web前端开发",
    description: "本课程介绍现代Web前端开发技术，包括HTML5、CSS3、JavaScript、React等内容。通过实战项目学习前端开发。",
    tags: ["HTML", "CSS", "JavaScript", "React"]
  },
  { 
    id: 3, 
    title: "数据结构与算法", 
    instructor: "王教授", 
    type: "录播课程", 
    category: "计算机科学",
    students: 1567,
    lessons: 40,
    duration: "20小时",
    rating: 4.9,
    progress: 30,
    coverImage: "https://placehold.co/400x225/8b5cf6/FFFFFF.png?text=数据结构与算法",
    description: "本课程系统讲解数据结构与算法，包括数组、链表、栈、队列、树、图、排序、搜索等内容。适合有一定编程基础的学生。",
    tags: ["数据结构", "算法", "编程进阶"]
  },
  { 
    id: 4, 
    title: "人工智能导论", 
    instructor: "刘教授", 
    type: "直播课程", 
    category: "人工智能",
    students: 2134,
    lessons: 36,
    duration: "18小时",
    rating: 4.8,
    progress: 15,
    coverImage: "https://placehold.co/400x225/10b981/FFFFFF.png?text=人工智能导论",
    description: "本课程介绍人工智能的基本概念、发展历史、核心技术和应用场景，包括机器学习、深度学习、自然语言处理等内容。",
    tags: ["AI", "机器学习", "深度学习"]
  },
  { 
    id: 5, 
    title: "数据分析与可视化", 
    instructor: "赵教授", 
    type: "录播课程", 
    category: "数据科学",
    students: 1432,
    lessons: 28,
    duration: "14小时",
    rating: 4.6,
    progress: 0,
    coverImage: "https://placehold.co/400x225/f59e0b/FFFFFF.png?text=数据分析与可视化",
    description: "本课程介绍数据分析与可视化的方法和工具，包括数据清洗、数据分析、数据可视化等内容。使用Python和相关库进行实践。",
    tags: ["数据分析", "数据可视化", "Python", "Pandas"]
  },
  { 
    id: 6, 
    title: "云计算与大数据", 
    instructor: "孙教授", 
    type: "录播课程", 
    category: "云计算",
    students: 876,
    lessons: 30,
    duration: "15小时",
    rating: 4.5,
    progress: 0,
    coverImage: "https://placehold.co/400x225/ef4444/FFFFFF.png?text=云计算与大数据",
    description: "本课程介绍云计算和大数据的基本概念、架构、技术和应用，包括分布式计算、存储系统、数据处理框架等内容。",
    tags: ["云计算", "大数据", "Hadoop", "Spark"]
  },
  { 
    id: 7, 
    title: "移动应用开发", 
    instructor: "周教授", 
    type: "直播课程", 
    category: "移动开发",
    students: 1298,
    lessons: 26,
    duration: "13小时",
    rating: 4.4,
    progress: 0,
    coverImage: "https://placehold.co/400x225/6366f1/FFFFFF.png?text=移动应用开发",
    description: "本课程介绍移动应用开发技术，包括iOS和Android平台的开发基础、UI设计、数据存储、网络通信等内容。",
    tags: ["移动开发", "iOS", "Android", "Flutter"]
  },
  { 
    id: 8, 
    title: "网络安全基础", 
    instructor: "吴教授", 
    type: "录播课程", 
    category: "网络安全",
    students: 945,
    lessons: 22,
    duration: "11小时",
    rating: 4.7,
    progress: 0,
    coverImage: "https://placehold.co/400x225/0ea5e9/FFFFFF.png?text=网络安全基础",
    description: "本课程介绍网络安全的基本概念、常见威胁和防护措施，包括密码学、访问控制、网络攻击与防御等内容。",
    tags: ["网络安全", "密码学", "安全防护"]
  },
]

// 课程类型选项
const courseTypes = ["全部类型", "录播课程", "直播课程"]

// 课程分类选项
const courseCategories = ["全部分类", "编程开发", "前端开发", "计算机科学", "人工智能", "数据科学", "云计算", "移动开发", "网络安全"]

export default function CoursesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("全部类型")
  const [selectedCategory, setSelectedCategory] = useState("全部分类")
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState("grid")
  
  // 过滤课程数据
  const filteredCourses = coursesData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = selectedType === "全部类型" || course.type === selectedType
    const matchesCategory = selectedCategory === "全部分类" || course.category === selectedCategory
    
    return matchesSearch && matchesType && matchesCategory
  })
  
  // 分页逻辑
  const itemsPerPage = viewMode === "grid" ? 6 : 5
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage)
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">在线课程</h1>
          <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded">线上系统</span>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="搜索课程、教师或内容..."
              className="pl-8 w-full sm:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button asChild>
            <a href="/online-system/courses/create">
              <Plus className="mr-2 h-4 w-4" />
              添加课程
            </a>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <Card className="md:w-64 shrink-0">
          <CardHeader>
            <CardTitle>筛选条件</CardTitle>
            <CardDescription>根据条件筛选课程</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>课程类型</Label>
              <div className="space-y-1">
                {courseTypes.map((type) => (
                  <div key={type} className="flex items-center">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start px-2 ${selectedType === type ? 'bg-primary/10' : ''}`}
                      onClick={() => {
                        setSelectedType(type)
                        setCurrentPage(1)
                      }}
                    >
                      {type === "录播课程" && <Video className="mr-2 h-4 w-4" />}
                      {type === "直播课程" && <Play className="mr-2 h-4 w-4" />}
                      {type === "全部类型" && <BookOpen className="mr-2 h-4 w-4" />}
                      {type}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label>课程分类</Label>
              <div className="space-y-1 max-h-[200px] overflow-y-auto">
                {courseCategories.map((category) => (
                  <div key={category} className="flex items-center">
                    <Button
                      variant="ghost"
                      className={`w-full justify-start px-2 ${selectedCategory === category ? 'bg-primary/10' : ''}`}
                      onClick={() => {
                        setSelectedCategory(category)
                        setCurrentPage(1)
                      }}
                    >
                      {category}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <Button variant="outline" className="w-full" onClick={() => {
              setSelectedType("全部类型")
              setSelectedCategory("全部分类")
              setSearchTerm("")
              setCurrentPage(1)
            }}>
              <Filter className="mr-2 h-4 w-4" />
              重置筛选
            </Button>
          </CardContent>
        </Card>
        <div className="flex-1">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>课程列表</CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    网格视图
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    列表视图
                  </Button>
                </div>
              </div>
              <CardDescription>
                {filteredCourses.length > 0 
                  ? `共找到 ${filteredCourses.length} 个课程`
                  : "没有找到符合条件的课程"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {viewMode === "grid" ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {paginatedCourses.map((course) => (
                    <Card 
                      key={course.id} 
                      className="overflow-hidden cursor-pointer" 
                      onClick={() => router.push(`/online-system/courses/{course.id}`)}
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={course.coverImage} 
                          alt={course.title} 
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant={course.type === "直播课程" ? "destructive" : "secondary"}>
                            {course.type === "直播课程" ? (
                              <><Play className="mr-1 h-3 w-3" /> {course.type}</>
                            ) : (
                              <><Video className="mr-1 h-3 w-3" /> {course.type}</>
                            )}
                          </Badge>
                        </div>
                        {course.progress > 0 && (
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
                            <div 
                              className="h-full bg-primary" 
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        )}
                      </div>
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg line-clamp-1">{course.title}</CardTitle>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">操作菜单</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => router.push(`/online-system/courses/${course.id}`)}>
                                <Eye className="mr-2 h-4 w-4" />
                                查看详情
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                编辑课程
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash className="mr-2 h-4 w-4" />
                                删除课程
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <CardDescription>{course.category} | {course.instructor}</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Users className="mr-1 h-4 w-4" />
                            <span>{course.students}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="mr-1 h-4 w-4 text-yellow-500" />
                            <span>{course.rating}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button 
                          className="w-full" 
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/online-system/courses/${course.id}`);
                          }}
                        >
                          {course.progress > 0 ? "继续学习" : "开始学习"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {paginatedCourses.map((course) => (
                    <div 
                      key={course.id} 
                      className="flex gap-4 border rounded-lg overflow-hidden cursor-pointer" 
                      onClick={() => router.push(`/online-system/courses/${course.id}`)}
                    >
                      <div className="w-48 h-32 shrink-0 relative">
                        <img 
                          src={course.coverImage} 
                          alt={course.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge variant={course.type === "直播课程" ? "destructive" : "secondary"}>
                            {course.type === "直播课程" ? (
                              <><Play className="mr-1 h-3 w-3" /> {course.type}</>
                            ) : (
                              <><Video className="mr-1 h-3 w-3" /> {course.type}</>
                            )}
                          </Badge>
                        </div>
                        {course.progress > 0 && (
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted">
                            <div 
                              className="h-full bg-primary" 
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 p-4 flex flex-col">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold">{course.title}</h3>
                            <p className="text-sm text-muted-foreground">{course.category} | {course.instructor}</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">操作菜单</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => router.push(`/online-system/courses/${course.id}`)}>
                                <Eye className="mr-2 h-4 w-4" />
                                查看详情
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                编辑课程
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash className="mr-2 h-4 w-4" />
                                删除课程
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <p className="text-sm mt-2 line-clamp-2">{course.description}</p>
                        <div className="mt-auto pt-2 flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Users className="mr-1 h-4 w-4" />
                              <span>{course.students}人学习</span>
                            </div>
                            <div className="flex items-center">
                              <FileText className="mr-1 h-4 w-4" />
                              <span>{course.lessons}课时</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="mr-1 h-4 w-4" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center">
                              <Star className="mr-1 h-4 w-4 text-yellow-500" />
                              <span>{course.rating}</span>
                            </div>
                          </div>
                          <Button 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/online-system/courses/${course.id}`);
                            }}
                          >
                            {course.progress > 0 ? "继续学习" : "开始学习"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {totalPages > 1 && (
                <div className="mt-6 flex justify-center">
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
      </div>
    </div>
  )
}
