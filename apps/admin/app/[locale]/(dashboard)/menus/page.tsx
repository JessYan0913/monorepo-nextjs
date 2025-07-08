import * as React from "react"
import { Plus, Search, Edit } from "lucide-react"
import Link from "next/link"

import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui/components/ui/table"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@repo/ui/components/ui/pagination"
import { DeleteMenuButton } from "@/components/menus/delete-menu"
import { menuList } from "@/lib/actions/menu"

export default async function MenuManagementPage({ searchParams }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { query, page } = await searchParams
  const itemsPerPage = 10
  const { data, page: currentPage, total: totalItems } = await menuList({
    menuName: typeof query === "string" ? query : "",
    page: Math.max(1, Number(page) || 1),
    size: itemsPerPage,
  })
  
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">菜单管理</h1>
          <p className="text-muted-foreground">管理系统菜单及其路径设置</p>
        </div>
        <Link 
          href="/menus/add" 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          <Plus className="mr-2 h-4 w-4" />
          添加菜单
        </Link>
      </div>

      <form method="GET" className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          name="query"
          placeholder="搜索菜单名称..."
          className="max-w-sm"
          defaultValue={query}
        />
        <Button type="submit" variant="outline">搜索</Button>
      </form>

      <Card>
        <CardHeader>
          <CardTitle>菜单列表</CardTitle>
          <CardDescription>共有 {totalItems} 个菜单</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>菜单名称</TableHead>
                <TableHead>菜单路径</TableHead>
                <TableHead>菜单类型</TableHead>
                <TableHead>创建时间</TableHead>
                <TableHead>更新时间</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((menu) => (
                <TableRow key={menu.menuId}>
                  <TableCell className="font-medium">{menu.menuName}</TableCell>
                  <TableCell>{menu.menuPath}</TableCell>
                  <TableCell>{menu.menuType}</TableCell>
                  <TableCell>{menu.createTime}</TableCell>
                  <TableCell>{menu.updateTime}</TableCell>
                  <TableCell className="flex items-center justify-end gap-2">
                    <Link href={`/menus/${menu.menuId}`} className="flex items-center gap-1">
                      <Edit className="h-4 w-4" />
                      编辑
                    </Link>
                    <DeleteMenuButton id={`${menu.menuId}`} />
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
