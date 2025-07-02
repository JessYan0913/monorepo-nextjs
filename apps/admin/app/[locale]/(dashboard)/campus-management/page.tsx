"use client"

import * as React from "react"
import { useState } from "react"
import { Plus, Search, Edit, Trash2, MoreHorizontal } from "lucide-react"

import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui/components/ui/table"
import { Badge } from "@repo/ui/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@repo/ui/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@repo/ui/components/ui/dropdown-menu"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@repo/ui/components/ui/pagination"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"
import { Label } from "@repo/ui/components/ui/label"

// 校园数据类型定义
type Campus = {
  id: string
  name: string
  address: string
  region: string
  status: "active" | "inactive"
  studentCount: number
  classroomCount: number
  createdAt: string
}

// 模拟校园数据
const mockCampuses: Campus[] = [
  {
    id: "1",
    name: "顺义校区",
    address: "北京市顺义区后沙峪镇安富街8号",
    region: "北京市-顺义区",
    status: "active",
    studentCount: 1250,
    classroomCount: 45,
    createdAt: "2020-05-15",
  },
  {
    id: "2",
    name: "昌平校区",
    address: "北京市昌平区沙河镇松兰堡村西口",
    region: "北京市-昌平区",
    status: "active",
    studentCount: 980,
    classroomCount: 32,
    createdAt: "2021-03-20",
  },
  {
    id: "3",
    name: "海淀校区",
    address: "北京市海淀区西三旗建材城西路31号",
    region: "北京市-海淀区",
    status: "active",
    studentCount: 1580,
    classroomCount: 52,
    createdAt: "2019-09-01",
  },
  {
    id: "4",
    name: "朝阳校区",
    address: "北京市朝阳区望京西园四区417号楼",
    region: "北京市-朝阳区",
    status: "inactive",
    studentCount: 750,
    classroomCount: 28,
    createdAt: "2022-01-10",
  },
  {
    id: "5",
    name: "通州校区",
    address: "北京市通州区永顺镇潞苑北大街15号",
    region: "北京市-通州区",
    status: "active",
    studentCount: 620,
    classroomCount: 25,
    createdAt: "2022-08-15",
  },
]

export default function CampusManagementPage() {
  // 状态管理
  const [campuses, setCampuses] = useState<Campus[]>(mockCampuses)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [itemsPerPage] = useState<number>(4)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false)
  const [currentCampus, setCurrentCampus] = useState<Campus | null>(null)
  const [newCampus, setNewCampus] = useState<Partial<Campus>>({
    name: "",
    address: "",
    region: "",
    status: "active",
  })

  // 过滤校园数据
  const filteredCampuses = campuses.filter((campus) =>
    campus.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campus.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    campus.region.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // 分页逻辑
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentCampuses = filteredCampuses.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredCampuses.length / itemsPerPage)

  // 处理页面变化
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // 处理添加校园
  const handleAddCampus = () => {
    const id = (campuses.length + 1).toString()
    const createdAt = new Date().toISOString().split('T')[0]
    const newCampusData: Campus = {
      id,
      name: newCampus.name || "",
      address: newCampus.address || "",
      region: newCampus.region || "",
      status: newCampus.status as "active" | "inactive" || "active",
      studentCount: 0,
      classroomCount: 0,
      createdAt,
    }
    
    setCampuses([...campuses, newCampusData])
    setNewCampus({
      name: "",
      address: "",
      region: "",
      status: "active",
    })
    setIsAddDialogOpen(false)
  }

  // 处理编辑校园
  const handleEditCampus = () => {
    if (!currentCampus) return
    
    const updatedCampuses = campuses.map(campus => 
      campus.id === currentCampus.id ? { ...campus, ...currentCampus } : campus
    )
    
    setCampuses(updatedCampuses)
    setIsEditDialogOpen(false)
    setCurrentCampus(null)
  }

  // 处理删除校园
  const handleDeleteCampus = () => {
    if (!currentCampus) return
    
    const updatedCampuses = campuses.filter(campus => campus.id !== currentCampus.id)
    setCampuses(updatedCampuses)
    setIsDeleteDialogOpen(false)
    setCurrentCampus(null)
  }

  // 打开编辑对话框
  const openEditDialog = (campus: Campus) => {
    setCurrentCampus({ ...campus })
    setIsEditDialogOpen(true)
  }

  // 打开删除对话框
  const openDeleteDialog = (campus: Campus) => {
    setCurrentCampus(campus)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">校园管理</h1>
          <p className="text-muted-foreground">管理所有校区的基本信息、状态和统计数据</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              添加校区
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>添加新校区</DialogTitle>
              <DialogDescription>
                填写以下信息创建新的校区。创建后可以进一步管理校区详情。
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  校区名称
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  value={newCampus.name}
                  onChange={(e) => setNewCampus({ ...newCampus, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  详细地址
                </Label>
                <Input
                  id="address"
                  className="col-span-3"
                  value={newCampus.address}
                  onChange={(e) => setNewCampus({ ...newCampus, address: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="region" className="text-right">
                  所属区域
                </Label>
                <Input
                  id="region"
                  className="col-span-3"
                  value={newCampus.region}
                  onChange={(e) => setNewCampus({ ...newCampus, region: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  状态
                </Label>
                <Select
                  value={newCampus.status}
                  onValueChange={(value: "active" | "inactive") => setNewCampus({ ...newCampus, status: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="选择状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">正常运营</SelectItem>
                    <SelectItem value="inactive">暂停运营</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                取消
              </Button>
              <Button onClick={handleAddCampus}>创建校区</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="搜索校区名称、地址或区域..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>校区列表</CardTitle>
          <CardDescription>共有 {filteredCampuses.length} 个校区</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>校区名称</TableHead>
                <TableHead>地址</TableHead>
                <TableHead>所属区域</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>学生数</TableHead>
                <TableHead>教室数</TableHead>
                <TableHead>创建时间</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentCampuses.map((campus) => (
                <TableRow key={campus.id}>
                  <TableCell className="font-medium">{campus.name}</TableCell>
                  <TableCell>{campus.address}</TableCell>
                  <TableCell>{campus.region}</TableCell>
                  <TableCell>
                    <Badge variant={campus.status === "active" ? "default" : "secondary"}>
                      {campus.status === "active" ? "正常运营" : "暂停运营"}
                    </Badge>
                  </TableCell>
                  <TableCell>{campus.studentCount}</TableCell>
                  <TableCell>{campus.classroomCount}</TableCell>
                  <TableCell>{campus.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">操作菜单</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openEditDialog(campus)}>
                          <Edit className="mr-2 h-4 w-4" />
                          编辑
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => openDeleteDialog(campus)} className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink 
                    onClick={() => handlePageChange(page)}
                    isActive={page === currentPage}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>

      {/* 编辑校区对话框 */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>编辑校区信息</DialogTitle>
            <DialogDescription>
              修改校区的基本信息和运营状态。
            </DialogDescription>
          </DialogHeader>
          {currentCampus && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  校区名称
                </Label>
                <Input
                  id="edit-name"
                  className="col-span-3"
                  value={currentCampus.name}
                  onChange={(e) => setCurrentCampus({ ...currentCampus, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-address" className="text-right">
                  详细地址
                </Label>
                <Input
                  id="edit-address"
                  className="col-span-3"
                  value={currentCampus.address}
                  onChange={(e) => setCurrentCampus({ ...currentCampus, address: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-region" className="text-right">
                  所属区域
                </Label>
                <Input
                  id="edit-region"
                  className="col-span-3"
                  value={currentCampus.region}
                  onChange={(e) => setCurrentCampus({ ...currentCampus, region: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  状态
                </Label>
                <Select
                  value={currentCampus.status}
                  onValueChange={(value: "active" | "inactive") => setCurrentCampus({ ...currentCampus, status: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="选择状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">正常运营</SelectItem>
                    <SelectItem value="inactive">暂停运营</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-students" className="text-right">
                  学生数
                </Label>
                <Input
                  id="edit-students"
                  className="col-span-3"
                  type="number"
                  value={currentCampus.studentCount}
                  onChange={(e) => setCurrentCampus({ ...currentCampus, studentCount: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-classrooms" className="text-right">
                  教室数
                </Label>
                <Input
                  id="edit-classrooms"
                  className="col-span-3"
                  type="number"
                  value={currentCampus.classroomCount}
                  onChange={(e) => setCurrentCampus({ ...currentCampus, classroomCount: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleEditCampus}>保存更改</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 删除校区确认对话框 */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
            <DialogDescription>
              您确定要删除 {currentCampus?.name} 校区吗？此操作无法撤销。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={handleDeleteCampus}>
              确认删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
