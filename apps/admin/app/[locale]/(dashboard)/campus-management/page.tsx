"use client"

import * as React from "react"
import { useState } from "react"
import { Plus, Search, Edit, Trash2, MoreHorizontal } from "lucide-react"

import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui/components/ui/table"
import { Badge } from "@repo/ui/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@repo/ui/components/ui/dropdown-menu"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@repo/ui/components/ui/pagination"

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

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">校园管理</h1>
          <p className="text-muted-foreground">管理所有校区的基本信息、状态和统计数据</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          添加校区
        </Button>
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
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          编辑
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
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
    </div>
  )
}
