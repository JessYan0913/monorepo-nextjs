"use client"

import { useState } from "react"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { MoreHorizontal, Pencil, Trash2, Shield } from "lucide-react"

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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@repo/ui/components/ui/dialog"
import { RoleForm } from "@/components/permissions/role-form"
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
import { toast } from "@repo/ui/components/ui/sonner"
import { Skeleton } from "@repo/ui/components/ui/skeleton"
import { Checkbox } from "@repo/ui/components/ui/checkbox"

// 模拟角色数据
const data: Role[] = [
  {
    id: "1",
    name: "超级管理员",
    description: "拥有系统所有权限",
    permissions: ["用户管理", "角色管理", "系统设置", "数据管理", "审计日志"],
    userCount: 2,
  },
  {
    id: "2",
    name: "管理员",
    description: "拥有大部分系统权限",
    permissions: ["用户管理", "角色管理", "系统设置"],
    userCount: 5,
  },
  {
    id: "3",
    name: "编辑",
    description: "可以编辑内容",
    permissions: ["内容编辑", "内容审核"],
    userCount: 10,
  },
  {
    id: "4",
    name: "财务",
    description: "财务相关权限",
    permissions: ["财务报表", "账单管理"],
    userCount: 3,
  },
  {
    id: "5",
    name: "用户",
    description: "普通用户权限",
    permissions: ["个人资料", "基础功能"],
    userCount: 120,
  },
  {
    id: "6",
    name: "访客",
    description: "只读权限",
    permissions: ["只读权限"],
    userCount: 45,
  },
  {
    id: "7",
    name: "开发者",
    description: "开发相关权限",
    permissions: ["API访问", "开发工具", "测试环境"],
    userCount: 8,
  },
  {
    id: "8",
    name: "审计员",
    description: "审计相关权限",
    permissions: ["审计日志", "系统监控"],
    userCount: 2,
  },
]

export type Role = {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
}

interface RoleTableProps {
  isRefreshing?: boolean
}

const availablePermissions = [
  { id: "user_management", label: "用户管理" },
  { id: "role_management", label: "角色管理" },
  { id: "system_settings", label: "系统设置" },
  { id: "data_management", label: "数据管理" },
  { id: "audit_logs", label: "审计日志" },
  { id: "content_editing", label: "内容编辑" },
  { id: "content_review", label: "内容审核" },
  { id: "financial_reports", label: "财务报表" },
  { id: "billing_management", label: "账单管理" },
  { id: "personal_profile", label: "个人资料" },
  { id: "basic_functionality", label: "基础功能" },
  { id: "read_only_access", label: "只读权限" },
  { id: "api_access", label: "API访问" },
  { id: "development_tools", label: "开发工具" },
  { id: "test_environment", label: "测试环境" },
  { id: "system_monitoring", label: "系统监控" },
]

export function RoleTable({ isRefreshing = false }: RoleTableProps) {
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isPermissionDialogOpen, setIsPermissionDialogOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)

  const columns: ColumnDef<Role>[] = [
    {
      accessorKey: "name",
      header: "角色名称",
      cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "description",
      header: "描述",
      cell: ({ row }) => <div>{row.getValue("description")}</div>,
    },
    {
      accessorKey: "permissions",
      header: "权限",
      cell: ({ row }) => {
        const permissions = row.original.permissions
        return (
          <div className="flex flex-wrap gap-1">
            {permissions.slice(0, 2).map((permission) => (
              <Badge key={permission} variant="outline">
                {permission}
              </Badge>
            ))}
            {permissions.length > 2 && <Badge variant="outline">+{permissions.length - 2}</Badge>}
          </div>
        )
      },
    },
    {
      accessorKey: "userCount",
      header: "用户数",
      cell: ({ row }) => <div>{row.getValue("userCount")}</div>,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const role = row.original

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
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(role.id)}>复制角色ID</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setSelectedRole(role)
                  setIsPermissionDialogOpen(true)
                }}
              >
                <Shield className="mr-2 h-4 w-4" />
                管理权限
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setEditingRole(role)
                  setIsEditDialogOpen(true)
                }}
              >
                <Pencil className="mr-2 h-4 w-4" />
                编辑角色
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600"
                onClick={() => {
                  setRoleToDelete(role)
                  setIsDeleteDialogOpen(true)
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                删除角色
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
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  })

  const handleEditRole = (formData: any) => {
    console.log("编辑角色:", formData)
    setIsEditDialogOpen(false)

    toast.success(`角色 ${formData.name} 的信息已成功更新`)
  }

  const handleDeleteRole = () => {
    console.log("删除角色:", roleToDelete)
    setIsDeleteDialogOpen(false)

    toast.success(`角色 ${roleToDelete?.name} 已成功从系统中删除`)
  }

  const handleManagePermissions = () => {
    setIsPermissionDialogOpen(false)

    toast.success(`角色 ${selectedRole?.name} 的权限已成功更新`)
  }

  if (isRefreshing) {
    return (
      <div className="w-full space-y-4">
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

      {/* 编辑角色对话框 */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>编辑角色</DialogTitle>
            <DialogDescription>修改角色信息。点击提交保存更改。</DialogDescription>
          </DialogHeader>
          {editingRole && (
            <RoleForm
              onSubmit={handleEditRole}
              defaultValues={{
                name: editingRole.name,
                description: editingRole.description,
                permissions: editingRole.permissions.map((p) => p.toLowerCase().replace(/\s+/g, "_")),
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* 删除角色确认对话框 */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除角色</AlertDialogTitle>
            <AlertDialogDescription>
              您确定要删除角色 {roleToDelete?.name} 吗？此操作不可撤销，与该角色关联的所有用户将失去相应权限。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteRole} className="bg-red-600 hover:bg-red-700">
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 管理权限对话框 */}
      <Dialog open={isPermissionDialogOpen} onOpenChange={setIsPermissionDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>管理权限 - {selectedRole?.name}</DialogTitle>
            <DialogDescription>为该角色分配权限。</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {availablePermissions.map((permission) => (
                  <div key={permission.id} className="flex items-center space-x-2">
                    <Checkbox id={permission.id} />
                    <label
                      htmlFor={permission.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {permission.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsPermissionDialogOpen(false)}>
                取消
              </Button>
              <Button onClick={handleManagePermissions}>保存</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
