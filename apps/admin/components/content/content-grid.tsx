"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// 模拟内容数据
const allContent = [
  {
    id: "1",
    title: "企业管理系统介绍",
    type: "文章",
    author: "张三",
    status: "published",
    date: "2023-05-01",
    views: 1245,
    excerpt: "本文介绍了企业管理系统的主要功能和使用方法，帮助新用户快速上手。",
  },
  {
    id: "2",
    title: "如何使用权限管理功能",
    type: "教程",
    author: "李四",
    status: "published",
    date: "2023-05-02",
    views: 986,
    excerpt: "详细讲解了权限管理模块的使用方法，包括角色创建、权限分配等操作。",
  },
  {
    id: "3",
    title: "系统更新公告",
    type: "公告",
    author: "管理员",
    status: "published",
    date: "2023-05-03",
    views: 1567,
    excerpt: "关于系统最新版本的更新内容，包括新增功能、优化改进和问题修复。",
  },
  {
    id: "4",
    title: "数据分析模块使用指南",
    type: "教程",
    author: "王五",
    status: "draft",
    date: "2023-04-28",
    views: 0,
    excerpt: "数据分析模块的详细使用指南，包括数据导入、分析方法和报表生成。",
  },
  {
    id: "5",
    title: "旧版本功能说明",
    type: "文档",
    author: "赵六",
    status: "archived",
    date: "2023-04-15",
    views: 432,
    excerpt: "旧版本系统的功能说明文档，供用户参考和比对。",
  },
  {
    id: "6",
    title: "用户反馈处理流程",
    type: "文档",
    author: "张三",
    status: "draft",
    date: "2023-05-04",
    views: 0,
    excerpt: "详细说明了用户反馈的处理流程，包括接收、分类、处理和回复等环节。",
  },
  {
    id: "7",
    title: "系统安全最佳实践",
    type: "文章",
    author: "李四",
    status: "published",
    date: "2023-05-04",
    views: 876,
    excerpt: "介绍了系统安全的最佳实践，包括密码管理、权限控制和数据备份等方面。",
  },
  {
    id: "8",
    title: "移动端适配说明",
    type: "文档",
    author: "王五",
    status: "published",
    date: "2023-05-03",
    views: 654,
    excerpt: "关于系统移动端适配的说明，包括界面布局、功能调整和使用建议。",
  },
]

interface ContentGridProps {
  searchQuery?: string
  status?: "published" | "draft" | "archived"
}

export function ContentGrid({ searchQuery = "", status }: ContentGridProps) {
  const { toast } = useToast()
  const [contentToDelete, setContentToDelete] = useState<any | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // 根据状态和搜索查询过滤内容
  const filteredContent = allContent.filter((content) => {
    const matchesStatus = status ? content.status === status : true
    const matchesSearch =
      content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const handleDeleteContent = () => {
    console.log("删除内容:", contentToDelete)
    setIsDeleteDialogOpen(false)

    toast({
      title: "内容已删除",
      description: `内容 ${contentToDelete?.title} 已成功删除`,
      variant: "destructive",
    })
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filteredContent.length > 0 ? (
        filteredContent.map((content) => (
          <Card key={content.id}>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{content.title}</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">打开菜单</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>操作</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => navigator.clipboard.writeText(content.id)}>
                      复制ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      查看
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Pencil className="mr-2 h-4 w-4" />
                      编辑
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => {
                        setContentToDelete(content)
                        setIsDeleteDialogOpen(true)
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      删除
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Badge
                  variant={
                    content.status === "published" ? "default" : content.status === "draft" ? "secondary" : "outline"
                  }
                >
                  {content.status === "published" ? "已发布" : content.status === "draft" ? "草稿" : "已归档"}
                </Badge>
                <Badge variant="outline">{content.type}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">{content.excerpt}</p>
            </CardContent>
            <CardFooter className="flex justify-between text-sm text-muted-foreground">
              <div>作者: {content.author}</div>
              <div className="flex items-center gap-2">
                <span>{content.date}</span>
                {content.status === "published" && <span>浏览: {content.views}</span>}
              </div>
            </CardFooter>
          </Card>
        ))
      ) : (
        <div className="col-span-full flex h-40 items-center justify-center text-muted-foreground">
          没有找到匹配的内容
        </div>
      )}

      {/* 删除内容确认对话框 */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除内容</AlertDialogTitle>
            <AlertDialogDescription>
              您确定要删除内容 {contentToDelete?.title} 吗？此操作不可撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteContent} className="bg-red-600 hover:bg-red-700">
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
