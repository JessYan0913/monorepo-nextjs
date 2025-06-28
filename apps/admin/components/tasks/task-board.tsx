"use client"

import { useState } from "react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { PlusCircle, MoreHorizontal, Calendar, MessageSquare } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// 任务类型
type Task = {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high"
  dueDate?: string
  assignee?: {
    name: string
    avatar?: string
    initials: string
  }
  comments?: number
  attachments?: number
  labels?: string[]
}

// 列类型
type Column = {
  id: string
  title: string
  tasks: Task[]
}

// 初始数据
const initialData: Column[] = [
  {
    id: "todo",
    title: "待办",
    tasks: [
      {
        id: "task-1",
        title: "更新用户文档",
        description: "更新系统用户手册，包括新功能的使用说明",
        priority: "medium",
        dueDate: "2023-06-15",
        assignee: {
          name: "张三",
          avatar: "/placeholder.svg?height=32&width=32",
          initials: "张",
        },
        comments: 5,
        labels: ["文档", "重要"],
      },
      {
        id: "task-2",
        title: "修复登录问题",
        description: "修复用户在某些浏览器下无法登录的问题",
        priority: "high",
        dueDate: "2023-06-10",
        assignee: {
          name: "李四",
          avatar: "/placeholder.svg?height=32&width=32",
          initials: "李",
        },
        comments: 3,
        labels: ["Bug", "紧急"],
      },
      {
        id: "task-3",
        title: "设计新功能原型",
        description: "为即将开发的新功能设计用户界面原型",
        priority: "low",
        dueDate: "2023-06-20",
        labels: ["设计", "UI/UX"],
      },
    ],
  },
  {
    id: "in-progress",
    title: "进行中",
    tasks: [
      {
        id: "task-4",
        title: "开发数据导出功能",
        description: "实现将系统数据导出为Excel和PDF格式的功能",
        priority: "medium",
        dueDate: "2023-06-18",
        assignee: {
          name: "王五",
          avatar: "/placeholder.svg?height=32&width=32",
          initials: "王",
        },
        comments: 2,
        labels: ["开发", "功能"],
      },
      {
        id: "task-5",
        title: "优化系统性能",
        description: "优化数据库查询和前端加载速度",
        priority: "high",
        dueDate: "2023-06-12",
        assignee: {
          name: "赵六",
          avatar: "/placeholder.svg?height=32&width=32",
          initials: "赵",
        },
        labels: ["优化", "技术"],
      },
    ],
  },
  {
    id: "done",
    title: "已完成",
    tasks: [
      {
        id: "task-6",
        title: "更新依赖库",
        description: "将系统依赖库更新到最新版本",
        priority: "low",
        dueDate: "2023-06-05",
        assignee: {
          name: "张三",
          avatar: "/placeholder.svg?height=32&width=32",
          initials: "张",
        },
        comments: 1,
        labels: ["维护"],
      },
      {
        id: "task-7",
        title: "添加用户反馈功能",
        description: "在系统中添加用户反馈收集功能",
        priority: "medium",
        dueDate: "2023-06-08",
        assignee: {
          name: "李四",
          avatar: "/placeholder.svg?height=32&width=32",
          initials: "李",
        },
        labels: ["功能", "用户体验"],
      },
    ],
  },
]

export function TaskBoard() {
  const { toast } = useToast()
  const [columns, setColumns] = useState<Column[]>(initialData)

  // 处理拖拽结束事件
  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    // 如果没有目标位置或目标位置与源位置相同，则不做任何操作
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return
    }

    // 找到源列和目标列
    const sourceColumn = columns.find((col) => col.id === source.droppableId)
    const destColumn = columns.find((col) => col.id === destination.droppableId)

    if (!sourceColumn || !destColumn) return

    // 复制任务列表
    const sourceTasks = [...sourceColumn.tasks]
    const destTasks = sourceColumn === destColumn ? sourceTasks : [...destColumn.tasks]

    // 从源列中移除任务
    const [movedTask] = sourceTasks.splice(source.index, 1)

    // 将任务添加到目标列
    destTasks.splice(destination.index, 0, movedTask)

    // 更新状态
    const newColumns = columns.map((col) => {
      if (col.id === source.droppableId) {
        return { ...col, tasks: sourceTasks }
      }
      if (col.id === destination.droppableId) {
        return { ...col, tasks: destTasks }
      }
      return col
    })

    setColumns(newColumns)

    // 显示通知
    if (source.droppableId !== destination.droppableId) {
      toast({
        title: "任务状态已更新",
        description: `任务"${movedTask.title}"已从${sourceColumn.title}移动到${destColumn.title}`,
      })
    }
  }

  // 获取优先级对应的样式
  const getPriorityBadgeStyle = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500 hover:bg-red-600"
      case "medium":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "low":
        return "bg-green-500 hover:bg-green-600"
      default:
        return "bg-gray-500 hover:bg-gray-600"
    }
  }

  // 获取优先级对应的文本
  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "high":
        return "高"
      case "medium":
        return "中"
      case "low":
        return "低"
      default:
        return "未设置"
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex h-full gap-4 overflow-x-auto pb-4">
        {columns.map((column) => (
          <div key={column.id} className="flex-shrink-0 w-80">
            <Card className="h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center">
                    {column.title}
                    <Badge className="ml-2 bg-muted text-muted-foreground">{column.tasks.length}</Badge>
                  </CardTitle>
                  <Button variant="ghost" size="icon">
                    <PlusCircle className="h-5 w-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="px-2">
                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2 min-h-[200px]">
                      {column.tasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="rounded-md border bg-card p-3 shadow-sm"
                            >
                              <div className="flex flex-col gap-2">
                                <div className="flex items-start justify-between">
                                  <h3 className="font-medium">{task.title}</h3>
                                  <Button variant="ghost" size="icon" className="h-6 w-6">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                                <div className="flex flex-wrap gap-1 pt-1">
                                  {task.labels?.map((label) => (
                                    <Badge key={label} variant="outline" className="text-xs">
                                      {label}
                                    </Badge>
                                  ))}
                                </div>
                                <div className="flex items-center justify-between pt-2">
                                  <div className="flex items-center gap-2">
                                    {task.dueDate && (
                                      <div className="flex items-center text-xs text-muted-foreground">
                                        <Calendar className="mr-1 h-3 w-3" />
                                        {task.dueDate}
                                      </div>
                                    )}
                                    {task.comments && (
                                      <div className="flex items-center text-xs text-muted-foreground">
                                        <MessageSquare className="mr-1 h-3 w-3" />
                                        {task.comments}
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Badge className={`text-xs text-white ${getPriorityBadgeStyle(task.priority)}`}>
                                      {getPriorityText(task.priority)}
                                    </Badge>
                                    {task.assignee && (
                                      <Avatar className="h-6 w-6">
                                        <AvatarImage
                                          src={task.assignee.avatar || "/placeholder.svg"}
                                          alt={task.assignee.name}
                                        />
                                        <AvatarFallback className="text-xs">{task.assignee.initials}</AvatarFallback>
                                      </Avatar>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </DragDropContext>
  )
}
