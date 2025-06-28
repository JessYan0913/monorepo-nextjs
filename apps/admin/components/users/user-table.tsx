"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, Pencil, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { UserForm } from "@/components/users/user-form"
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
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

// 模拟用户数据
const data: User[] = [
  {
    id: "1",
    name: "张三",
    email: "zhangsan@example.com",
    role: "管理员",
    status: "活跃",
    lastActive: "2023-05-01",
  },
  {
    id: "2",
    name: "李四",
    email: "lisi@example.com",
    role: "编辑",
    status: "活跃",
    lastActive: "2023-05-02",
  },
  {
    id: "3",
    name: "王五",
    email: "wangwu@example.com",
    role: "用户",
    status: "活跃",
    lastActive: "2023-05-03",
  },
  {
    id: "4",
    name: "赵六",
    email: "zhaoliu@example.com",
    role: "财务",
    status: "未激活",
    lastActive: "2023-04-28",
  },
  {
    id: "5",
    name: "钱七",
    email: "qianqi@example.com",
    role: "用户",
    status: "已禁用",
    lastActive: "2023-04-15",
  },
  {
    id: "6",
    name: "孙八",
    email: "sunba@example.com",
    role: "编辑",
    status: "活跃",
    lastActive: "2023-05-04",
  },
  {
    id: "7",
    name: "周九",
    email: "zhoujiu@example.com",
    role: "用户",
    status: "活跃",
    lastActive: "2023-05-04",
  },
  {
    id: "8",
    name: "吴十",
    email: "wushi@example.com",
    role: "用户",
    status: "活跃",
    lastActive: "2023-05-03",
  },
  {
    id: "9",
    name: "郑十一",
    email: "zhengshiyi@example.com",
    role: "用户",
    status: "未激活",
    lastActive: "2023-04-20",
  },
  {
    id: "10",
    name: "王十二",
    email: "wangshier@example.com",
    role: "用户",
    status: "已禁用",
    lastActive: "2023-03-15",
  },
]

export type User = {
  id: string
  name: string
  email: string
  role: string
  status: "活跃" | "未激活" | "已禁用"
  lastActive: string
}

interface UserTableProps {
  isRefreshing?: boolean
}

export function UserTable({ isRefreshing = false }: UserTableProps) {
  const { toast } = useToast()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "姓名",
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            邮箱
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "role",
      header: "角色",
      cell: ({ row }) => <div>{row.getValue("role")}</div>,
    },
    {
      accessorKey: "status",
      header: "状态",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge variant={status === "活跃" ? "default" : status === "未激活" ? "secondary" : "destructive"}>
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "lastActive",
      header: "最后活跃",
      cell: ({ row }) => <div>{row.getValue("lastActive")}</div>,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original

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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>复制用户ID</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setEditingUser(user)
                  setIsEditDialogOpen(true)
                }}
              >
                <Pencil className="mr-2 h-4 w-4" />
                编辑用户
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => {
                  setUserToDelete(user)
                  setIsDeleteDialogOpen(true)
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                删除用户
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  const handleEditUser = (formData: any) => {
    console.log("编辑用户:", formData)
    setIsEditDialogOpen(false)

    toast({
      title: "用户已更新",
      description: `用户 ${formData.username} 的信息已成功更新`,
    })
  }

  const handleDeleteUser = () => {
    console.log("删除用户:", userToDelete)
    setIsDeleteDialogOpen(false)

    toast({
      title: "用户已删除",
      description: `用户 ${userToDelete?.name} 已成功从系统中删除`,
      variant: "destructive",
    })
  }

  if (isRefreshing) {
    return (
      <div className="w-full space-y-4">
        <div className="flex items-center py-4">
          <Skeleton className="h-10 w-[250px]" />
          <Skeleton className="ml-auto h-10 w-[100px]" />
        </div>
        <div className="rounded-md border">
          <div className="h-[400px] space-y-4 p-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="按姓名搜索..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              筛选 <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>按状态筛选</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={table.getColumn("status")?.getFilterValue() === "活跃"}
              onCheckedChange={() => table.getColumn("status")?.setFilterValue("活跃")}
            >
              活跃
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={table.getColumn("status")?.getFilterValue() === "未激活"}
              onCheckedChange={() => table.getColumn("status")?.setFilterValue("未激活")}
            >
              未激活
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={table.getColumn("status")?.getFilterValue() === "已禁用"}
              onCheckedChange={() => table.getColumn("status")?.setFilterValue("已禁用")}
            >
              已禁用
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => table.getColumn("status")?.setFilterValue(undefined)}>
              清除筛选
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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
        <div className="text-sm text-muted-foreground">
          第 <span className="font-medium">{table.getState().pagination.pageIndex + 1}</span> 页，共{" "}
          <span className="font-medium">{table.getPageCount()}</span> 页
        </div>
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          上一页
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          下一页
        </Button>
      </div>

      {/* 编辑用户对话框 */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>编辑用户</DialogTitle>
            <DialogDescription>修改用户信息。点击提交保存更改。</DialogDescription>
          </DialogHeader>
          {editingUser && (
            <UserForm
              onSubmit={handleEditUser}
              defaultValues={{
                username: editingUser.name,
                email: editingUser.email,
                role:
                  editingUser.role === "管理员"
                    ? "admin"
                    : editingUser.role === "编辑"
                      ? "editor"
                      : editingUser.role === "用户"
                        ? "user"
                        : "guest",
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* 删除用户确认对话框 */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除用户</AlertDialogTitle>
            <AlertDialogDescription>
              您确定要删除用户 {userToDelete?.name} 吗？此操作不可撤销，用户的所有数据将被永久删除。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-red-600 hover:bg-red-700">
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
