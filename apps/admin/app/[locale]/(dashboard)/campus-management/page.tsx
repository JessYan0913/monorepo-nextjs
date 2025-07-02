import * as React from "react"
import { Plus, Search, Edit } from "lucide-react"
import Link from "next/link"

import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui/components/ui/table"
import { Badge } from "@repo/ui/components/ui/badge"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@repo/ui/components/ui/pagination"
import { DeleteCampusButton } from "@/components/campus-management/delete-campus"

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

export default async function CampusManagementPage({ searchParams }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { query, page } = await searchParams
  const itemsPerPage = 4
  const filteredCampuses = mockCampuses.filter(campus => {
    if (!query) return true;
    const lowerQuery = query.toString().toLowerCase();
    return (
      campus.name.toLowerCase().includes(lowerQuery) ||
      campus.address.toLowerCase().includes(lowerQuery) ||
      campus.region.toLowerCase().includes(lowerQuery)
    )
  })
  const totalPages = Math.ceil(filteredCampuses.length / itemsPerPage)
  const currentPage = Math.max(1, Math.min(Number(page) || 1, totalPages || 1))

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentCampuses = filteredCampuses.slice(indexOfFirstItem, indexOfLastItem)

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">校园管理</h1>
          <p className="text-muted-foreground">管理所有校区的基本信息、状态和统计数据</p>
        </div>
        <Link 
          href="/campus-management/add" 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          <Plus className="mr-2 h-4 w-4" />
          添加校区
        </Link>
      </div>

      <form method="GET" className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          name="query"
          placeholder="搜索校区名称、地址或区域..."
          className="max-w-sm"
          defaultValue={query}
        />
        <Button type="submit" variant="outline">搜索</Button>
      </form>

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
                  <TableCell className="flex items-center justify-center gap-2">
                    <Link href={`/campus-management/${campus.id}`} className="flex items-center gap-1">
                      <Edit className="h-4 w-4" />
                      编辑
                    </Link>
                    <DeleteCampusButton id={campus.id} />
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
                  href={`?page=${currentPage - 1}`}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href={`?page=${page}`}
                    isActive={page === currentPage}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext
                  href={`?page=${currentPage + 1}`}
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
