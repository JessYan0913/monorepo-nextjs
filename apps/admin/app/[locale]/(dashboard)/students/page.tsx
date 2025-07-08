import * as React from "react"
import { Plus, Search, Edit } from "lucide-react"
import Link from "next/link"

import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui/components/ui/table"
import { Badge } from "@repo/ui/components/ui/badge"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@repo/ui/components/ui/pagination"
import { studentList } from "@/lib/actions/student"
import { DeleteStudentButton } from "@/components/students/delete-student"

export default async function StudentManagementPage({ searchParams }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { query, page } = await searchParams
  const itemsPerPage = 10
  const { data, page: currentPage, total: totalItems } = await studentList({
    studentName: typeof query === 'string' ? query : undefined,
    page: Math.max(1, Number(page) || 1),
    size: itemsPerPage,
  })
  
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  
  // Helper function to format date string
  const formatDate = (dateString: string) => {
    if (!dateString) return "-"
    return new Date(dateString).toLocaleDateString()
  }
  
  // Helper function to get sex label
  const getSexLabel = (sex: number) => {
    switch (sex) {
      case 0: return "男"
      case 1: return "女"
      default: return "未知"
    }
  }
  
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">学生管理</h1>
          <p className="text-muted-foreground">管理所有学生的基本信息、状态和个人资料</p>
        </div>
        <Link 
          href="/students/add" 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          <Plus className="mr-2 h-4 w-4" />
          添加学生
        </Link>
      </div>

      <form method="GET" className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          name="query"
          placeholder="搜索学生姓名、电话或身份证..."
          className="max-w-sm"
          defaultValue={query}
        />
        <Button type="submit" variant="outline">搜索</Button>
      </form>

      <Card>
        <CardHeader>
          <CardTitle>学生列表</CardTitle>
          <CardDescription>共有 {totalItems} 名学生</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>姓名</TableHead>
                <TableHead>账号</TableHead>
                <TableHead>电话</TableHead>
                <TableHead>性别</TableHead>
                <TableHead>班级</TableHead>
                <TableHead>年级</TableHead>
                <TableHead>入学日期</TableHead>
                <TableHead>状态</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((student) => (
                <TableRow key={student.studentId}>
                  <TableCell className="font-medium">{student.studentName}</TableCell>
                  <TableCell>{student.studentAccount}</TableCell>
                  <TableCell>{student.studentPhone}</TableCell>
                  <TableCell>{getSexLabel(student.studentSex)}</TableCell>
                  <TableCell>{student.studentClass}</TableCell>
                  <TableCell>{student.studentGrade}</TableCell>
                  <TableCell>{formatDate(student.studentEnrollDate)}</TableCell>
                  <TableCell>
                    <Badge variant={student.studentStatus === "active" ? "default" : "secondary"}>
                      {student.studentStatus === "active" ? "在读" : "休学"}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex items-center justify-end gap-2">
                    <Link href={`/students/${student.studentId}`} className="flex items-center gap-1">
                      <Edit className="h-4 w-4" />
                      编辑
                    </Link>
                    <DeleteStudentButton id={student.studentId} />
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
                  href={`?page=${currentPage - 1}${query ? `&query=${query}` : ''}`}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href={`?page=${pageNum}${query ? `&query=${query}` : ''}`}
                    isActive={pageNum === currentPage}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext
                  href={`?page=${currentPage + 1}${query ? `&query=${query}` : ''}`}
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
