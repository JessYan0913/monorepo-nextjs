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
import { schoolList } from "@/lib/actions/school"

export default async function SchoolManagementPage({ searchParams }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { query, page } = await searchParams
  const itemsPerPage = 4
  const { data, page: currentPage, total: totalItems } = await schoolList({
    addEndTime: "",
    addStartTime: "",
    schoolDirectorIds: [],
    schoolName: "",
    page: Math.max(1, Number(page) || 1),
    size: itemsPerPage,
  })
  
  const totalPages = Math.ceil(totalItems / itemsPerPage)
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
          <CardTitle>学校列表</CardTitle>
          <CardDescription>共有 {totalItems} 个学校</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>学校名称</TableHead>
                <TableHead>地址</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>学校负责人</TableHead>
                <TableHead>创建时间</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((school) => (
                <TableRow key={school.schoolId}>
                  <TableCell className="font-medium">{school.schoolName}</TableCell>
                  <TableCell>{school.schoolAddr}</TableCell>
                  <TableCell>
                    <Badge variant={school.schoolStatus === "normal" ? "default" : "secondary"}>
                      {school.schoolStatus === "normal" ? "正常运营" : "暂停运营"}
                    </Badge>
                  </TableCell>
                  <TableCell>{school.director?.map((director) => director.staffName).join(", ")}</TableCell>
                  <TableCell>{school.createTime}</TableCell>
                  <TableCell className="flex items-center justify-center gap-2">
                    <Link href={`/schools/${school.schoolId}`} className="flex items-center gap-1">
                      <Edit className="h-4 w-4" />
                      编辑
                    </Link>
                    <DeleteCampusButton id={school.schoolId} />
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
