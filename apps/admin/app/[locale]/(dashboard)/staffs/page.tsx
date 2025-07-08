import * as React from "react"
import { Plus, Search, Edit } from "lucide-react"
import Link from "next/link"

import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui/components/ui/table"
import { Badge } from "@repo/ui/components/ui/badge"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@repo/ui/components/ui/pagination"
import { staffList } from "@/lib/actions/staff"
import { DeleteStaffButton } from "@/components/staffs/delete-staff"

export default async function StaffManagementPage({ searchParams }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { query, page } = await searchParams
  const itemsPerPage = 10
  const { data, page: currentPage, total: totalItems } = await staffList({
    staffName: typeof query === 'string' ? query : undefined,
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
          <h1 className="text-2xl font-bold tracking-tight">人员管理</h1>
          <p className="text-muted-foreground">管理所有员工的基本信息、状态和个人资料</p>
        </div>
        <Link 
          href="/staffs/add" 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          <Plus className="mr-2 h-4 w-4" />
          添加员工
        </Link>
      </div>

      <form method="GET" className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          name="query"
          placeholder="搜索员工姓名、电话或身份证..."
          className="max-w-sm"
          defaultValue={query}
        />
        <Button type="submit" variant="outline">搜索</Button>
      </form>

      <Card>
        <CardHeader>
          <CardTitle>员工列表</CardTitle>
          <CardDescription>共有 {totalItems} 名员工</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>姓名</TableHead>
                <TableHead>账号</TableHead>
                <TableHead>电话</TableHead>
                <TableHead>性别</TableHead>
                <TableHead>地址</TableHead>
                <TableHead>入职日期</TableHead>
                <TableHead>状态</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((staff) => (
                <TableRow key={staff.staffId}>
                  <TableCell className="font-medium">{staff.staffName}</TableCell>
                  <TableCell>{staff.staffAccount}</TableCell>
                  <TableCell>{staff.staffPhone}</TableCell>
                  <TableCell>{getSexLabel(staff.staffSex)}</TableCell>
                  <TableCell>{staff.staffAddr}</TableCell>
                  <TableCell>{formatDate(staff.staffHiredate)}</TableCell>
                  <TableCell>
                    <Badge variant={staff.staffStatus === "active" ? "default" : "secondary"}>
                      {staff.staffStatus === "active" ? "在职" : "离职"}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex items-center justify-end gap-2">
                    <Link href={`/staffs/${staff.staffId}`} className="flex items-center gap-1">
                      <Edit className="h-4 w-4" />
                      编辑
                    </Link>
                    <DeleteStaffButton id={staff.staffId} />
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
