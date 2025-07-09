import * as React from "react"
import { Plus, Search, Edit } from "lucide-react"
import Link from "next/link"

import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui/components/ui/table"
import { DeleteClassroomButton } from "@/components/classrooms/delete-classroom"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@repo/ui/components/ui/pagination"
import { classroomList } from "@/lib/actions/classroom"

export default async function ClassroomManagementPage({ searchParams }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { query, page, schoolId } = await searchParams
  const itemsPerPage = 4
  const { data, page: currentPage, total: totalItems } = await classroomList({
    classroomName: typeof query === 'string' ? query : '',
    schoolId: typeof schoolId === 'string' ? parseInt(schoolId) : undefined,
    page: Math.max(1, Number(page) || 1),
    size: itemsPerPage,
  })
  
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">教室管理</h1>
          <p className="text-muted-foreground">管理所有教室的基本信息、容量和使用状态</p>
        </div>
        <Link 
          href="/classrooms/add" 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          <Plus className="mr-2 h-4 w-4" />
          添加教室
        </Link>
      </div>

      <form method="GET" className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          name="query"
          placeholder="搜索教室名称、地址或区域..."
          className="max-w-sm"
          defaultValue={query}
        />
        <Button type="submit" variant="outline">搜索</Button>
      </form>

      <Card>
        <CardHeader>
          <CardTitle>教室列表</CardTitle>
          <CardDescription>共有 {totalItems} 个教室</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>教室名称</TableHead>
                <TableHead>所属校区</TableHead>
                <TableHead>地址</TableHead>
                <TableHead>容量</TableHead>
                <TableHead>创建时间</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((classroom) => (
                <TableRow key={classroom.classroomId}>
                  <TableCell className="font-medium">{classroom.classroomName}</TableCell>
                  <TableCell>{classroom.schoolName}</TableCell>
                  <TableCell>{classroom.classroomAddr}</TableCell>
                  <TableCell>{classroom.classroomCapacity}人</TableCell>
                  <TableCell>{classroom.createTime}</TableCell>
                  <TableCell className="flex items-center justify-end gap-2">
                    <Link href={`/classrooms/${classroom.classroomId}`} className="flex items-center gap-1">
                      <Edit className="h-4 w-4" />
                      编辑
                    </Link>
                    <DeleteClassroomButton id={classroom.classroomId} />
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
                  href={`?page=${currentPage - 1}${query ? `&query=${query}` : ''}${schoolId ? `&schoolId=${schoolId}` : ''}`}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href={`?page=${pageNum}${query ? `&query=${query}` : ''}${schoolId ? `&schoolId=${schoolId}` : ''}`}
                    isActive={pageNum === currentPage}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext
                  href={`?page=${currentPage + 1}${query ? `&query=${query}` : ''}${schoolId ? `&schoolId=${schoolId}` : ''}`}
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