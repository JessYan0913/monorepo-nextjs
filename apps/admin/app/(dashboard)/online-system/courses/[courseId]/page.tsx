"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeft, 
  BookOpen, 
  Clock, 
  Users, 
  Calendar, 
  Star, 
  Play, 
  Video, 
  FileText,
  Edit,
  Trash,
  Share,
  MessageSquare,
  CheckCircle,
  User,
  GraduationCap
} from "lucide-react"

// 模拟课程详情数据
const courseData = { 
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
  coverImage: "https://placehold.co/800x450/3b82f6/FFFFFF.png?text=Python编程基础",
  description: "本课程介绍Python编程的基础知识，包括变量、数据类型、控制流、函数、模块等内容。适合零基础学习者。课程通过实际案例和项目，帮助学生掌握Python编程技能，为后续的进阶学习打下坚实基础。",
  tags: ["Python", "编程基础", "零基础"],
  chapters: [
    {
      title: "第1章：Python介绍与环境搭建",
      lessons: [
        { title: "1.1 Python简介与应用场景", duration: "15分钟", completed: true },
        { title: "1.2 安装Python和开发环境", duration: "20分钟", completed: true },
        { title: "1.3 第一个Python程序", duration: "15分钟", completed: false }
      ]
    },
    {
      title: "第2章：Python基础语法",
      lessons: [
        { title: "2.1 变量与数据类型", duration: "25分钟", completed: false },
        { title: "2.2 运算符与表达式", duration: "20分钟", completed: false },
        { title: "2.3 条件语句", duration: "30分钟", completed: false },
        { title: "2.4 循环语句", duration: "35分钟", completed: false }
      ]
    },
    {
      title: "第3章：函数与模块",
      lessons: [
        { title: "3.1 函数定义与调用", duration: "30分钟", completed: false },
        { title: "3.2 参数传递", duration: "25分钟", completed: false },
        { title: "3.3 模块与包", duration: "35分钟", completed: false }
      ]
    }
  ],
  requirements: [
    "基本的计算机操作能力",
    "无需编程经验，适合零基础学习者",
    "需要安装Python 3.6或更高版本"
  ],
  objectives: [
    "掌握Python基础语法和编程概念",
    "能够独立编写简单的Python程序",
    "理解函数、模块和面向对象编程的基本概念",
    "为进阶学习打下坚实基础"
  ],
  createdAt: "2023-05-15",
  updatedAt: "2023-11-20"
}

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")
  
  // 返回课程列表页面
  const goBack = () => {
    router.push("/online-system/courses")
  }
  
  // 导航到编辑页面
  const goToEdit = () => {
    router.push(`/online-system/courses/${params.id ?? 1}/edit`)
  }

  return (
    <div className="flex flex-col gap-6 pb-10">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={goBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">课程详情</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={goToEdit}>
            <Edit className="mr-2 h-4 w-4" />
            编辑课程
          </Button>
          <Button variant="destructive">
            <Trash className="mr-2 h-4 w-4" />
            删除课程
          </Button>
        </div>
      </div>
      
      {/* 课程基本信息 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* 左侧：课程封面和基本信息 */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <div className="aspect-video overflow-hidden rounded-md">
              <img 
                src={courseData.coverImage} 
                alt={courseData.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center">
                <Badge variant={courseData.type === "直播课程" ? "destructive" : "secondary"} className="text-sm">
                  {courseData.type === "直播课程" ? (
                    <><Play className="mr-1 h-3 w-3" /> {courseData.type}</>
                  ) : (
                    <><Video className="mr-1 h-3 w-3" /> {courseData.type}</>
                  )}
                </Badge>
                <Badge variant="outline" className="text-sm">{courseData.category}</Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-md">
                  <Users className="h-5 w-5 text-muted-foreground mb-1" />
                  <span className="text-sm font-medium">{courseData.students}</span>
                  <span className="text-xs text-muted-foreground">学生</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-md">
                  <FileText className="h-5 w-5 text-muted-foreground mb-1" />
                  <span className="text-sm font-medium">{courseData.lessons}</span>
                  <span className="text-xs text-muted-foreground">课时</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-md">
                  <Clock className="h-5 w-5 text-muted-foreground mb-1" />
                  <span className="text-sm font-medium">{courseData.duration}</span>
                  <span className="text-xs text-muted-foreground">总时长</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-muted rounded-md">
                  <Star className="h-5 w-5 text-yellow-500 mb-1" />
                  <span className="text-sm font-medium">{courseData.rating}</span>
                  <span className="text-xs text-muted-foreground">评分</span>
                </div>
              </div>
              
              <div className="pt-4">
                <Button className="w-full">
                  {courseData.progress > 0 ? "继续学习" : "开始学习"}
                </Button>
              </div>
              
              <div className="pt-2 flex justify-between">
                <Button variant="outline" size="sm" className="flex-1 mr-2">
                  <Share className="mr-2 h-4 w-4" />
                  分享
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  讨论
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* 右侧：课程详细信息 */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-2xl">{courseData.title}</CardTitle>
            <div className="flex items-center text-muted-foreground">
              <User className="mr-1 h-4 w-4" />
              <span className="mr-4">{courseData.instructor}</span>
              <Calendar className="mr-1 h-4 w-4" />
              <span>更新于 {courseData.updatedAt}</span>
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview" className="text-sm">
                  课程概览
                </TabsTrigger>
                <TabsTrigger value="curriculum" className="text-sm">
                  课程大纲
                </TabsTrigger>
                <TabsTrigger value="requirements" className="text-sm">
                  课程要求
                </TabsTrigger>
                <TabsTrigger value="objectives" className="text-sm">
                  学习目标
                </TabsTrigger>
              </TabsList>
              
              {/* 课程概览标签页 */}
              <TabsContent value="overview" className="pt-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">课程介绍</h3>
                  <p className="text-muted-foreground">{courseData.description}</p>
                  
                  <div className="pt-2">
                    <h4 className="text-sm font-medium mb-2">课程标签</h4>
                    <div className="flex flex-wrap gap-2">
                      {courseData.tags.map((tag) => (
                        <Badge key={tag} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* 课程大纲标签页 */}
              <TabsContent value="curriculum" className="pt-4">
                <div className="space-y-6">
                  {courseData.chapters.map((chapter, index) => (
                    <div key={index} className="space-y-3">
                      <h3 className="text-lg font-medium flex items-center">
                        <BookOpen className="mr-2 h-5 w-5 text-primary" />
                        {chapter.title}
                      </h3>
                      <div className="space-y-2 pl-7">
                        {chapter.lessons.map((lesson, lessonIndex) => (
                          <div 
                            key={lessonIndex} 
                            className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 cursor-pointer"
                          >
                            <div className="flex items-center">
                              {lesson.completed ? (
                                <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border border-muted-foreground mr-2" />
                              )}
                              <span className={lesson.completed ? "text-muted-foreground" : ""}>
                                {lesson.title}
                              </span>
                            </div>
                            <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              {/* 课程要求标签页 */}
              <TabsContent value="requirements" className="pt-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">课程要求</h3>
                  <ul className="space-y-2 list-disc pl-5">
                    {courseData.requirements.map((requirement, index) => (
                      <li key={index} className="text-muted-foreground">{requirement}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              {/* 学习目标标签页 */}
              <TabsContent value="objectives" className="pt-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">学习目标</h3>
                  <ul className="space-y-2 pl-5">
                    {courseData.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="mr-2 h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
