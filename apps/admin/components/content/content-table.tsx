"use client"

import { useState } from "react"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table"
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react"

import { Button } from "@repo/ui/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui/components/ui/table"
import { Badge } from "@repo/ui/components/ui/badge"
import { toast } from "@repo/ui/components/ui/sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@repo/ui/components/ui/alert-dialog"

// 模拟内容数据
const allContent: Content[] = [
  {
    id: "1",
    title: "企业管理系统介绍",
    type: "文章",
    author: "张三",
    status: "published",
    date: "2023-05-01",
    views: 1245,
  },
  {
    id: "2",
    title: "如何使用权限管理功能",
    type: "教程",
    author: "李四",
    status: "published",
    date: "2023-05-02",
    views: 986,
  },
  {
    id: "3",
    title: "系统更新公告",
    type: "公告",
    author: "管理员",
    status: "published",
    date: "2023-05-03",
    views: 1567,
  },
  {
    id: "4",
    title: "数据分析模块使用指南",
    type: "教程",
    author: "王五",
    status: "draft",
    date: "2023-04-28",
    views: 0,
  },
  {
    id: "5",
    title: "旧版本功能说明",
    type: "文档",
    author: "赵六",
    status: "archived",
    date: "2023-04-15",
    views: 432,
  },
  {
    id: "6",
    title: "用户反馈处理流程",
    type: "文档",
    author: "张三",
    status: "draft",
    date: "2023-05-04",
    views: 0,
  },
  {
    id: "7",
    title: "系统安全最佳实践",
    type: "文章",
    author: "李四",
    status: "published",
    date: "2023-05-04",
    views: 876,
  },
  {
    id: "8",
    title: "移动端适配说明",
    type: "文档",
    author: "王五",
    status: "published",
    date: "2023-05-03",
    views: 654,
  },
]

export type Content = {
  id: string
  title: string
  type: string
  author: string
  status: "published" | "draft" | "archived"
  date: string
  views: number
}

interface ContentTableProps {
  searchQuery?: string
  status?: "published" | "draft" | "archived"
}

export function ContentTable({ searchQuery = "", status }: ContentTableProps) {
  const [contentToDelete, setContentToDelete] = useState<Content | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // 根据状态和搜索查询过滤内容
  const filteredContent = allContent.filter((content) => {
    const matchesStatus = status ? content.status === status : true
    const matchesSearch =
      content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.type.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const columns: ColumnDef<Content>[] = [
    {
      accessorKey: "title",
      header: "标题",
      cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
    },
    {
      accessorKey: "type",
      header: "类型",
      cell: ({ row }) => <div>{row.getValue("type")}</div>,
    },
    {
      accessorKey: "author",
      header: "作者",
      cell: ({ row }) => <div>{row.getValue("author")}</div>,
    },
    {
      accessorKey: "status",
      header: "状态",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge variant={status === "published" ? "default" : status === "draft" ? "secondary" : "outline"}>
            {status === "published" ? "已发布" : status === "draft" ? "草稿" : "已归档"}
          </Badge>
        )
      },
    },
    {
      accessorKey: "date",
      header: "日期",
      cell: ({ row }) => <div>{row.getValue("date")}</div>,
    },
    {
      accessorKey: "views",
      header: "浏览量",
      cell: ({ row }) => <div>{row.getValue("views")}</div>,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const content = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">打开菜单</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>操作</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(content.id)}>复制ID</DropdownMenuItem>
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
        )
      },
    },
  ]

  const table = useReactTable({
    data: filteredContent,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  })

  const handleDeleteContent = () => {
    console.log("删除内容:", contentToDelete)
    setIsDeleteDialogOpen(false)

    toast.success(`内容 ${contentToDelete?.title} 已成功删除`)
  }

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  没有找到结果
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          上一页
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          下一页
        </Button>
      </div>

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
