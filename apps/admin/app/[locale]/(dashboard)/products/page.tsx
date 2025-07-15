import * as React from "react"
import { Plus, Search, Edit } from "lucide-react"
import Link from "next/link"

import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui/components/ui/table"
import { Badge } from "@repo/ui/components/ui/badge"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@repo/ui/components/ui/pagination"
import { productList } from "@/lib/actions/product"
import { DeleteProductButton } from "@/components/products/delete-product"

export default async function ProductManagementPage({ searchParams }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { query, page } = await searchParams
  const itemsPerPage = 10
  const { data, page: currentPage, total: totalItems } = await productList({
    name: typeof query === 'string' ? query : undefined,
    page: Math.max(1, Number(page) || 1),
    size: itemsPerPage,
  })
  
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  
  // 格式化有效期
  const formatValidPeriod = (days: number) => {
    if (days === 0 || days === 365) return "永久"
    return `${days}天`
  }
  
  // 获取课程包类型标签
  const getTypeLabel = (type: string) => {
    switch (type) {
      case "课季专享": return <Badge>课季专享</Badge>
      case "体验专用": return <Badge variant="outline">体验专用</Badge>
      case "基础课包": return <Badge variant="secondary">基础课包</Badge>
      default: return <Badge variant="outline">{type}</Badge>
    }
  }
  
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">商品管理</h1>
          <p className="text-muted-foreground">管理所有课程包的基本信息、价格和销售状态</p>
        </div>
        <Link 
          href="/products/add" 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          <Plus className="mr-2 h-4 w-4" />
          添加课程包
        </Link>
      </div>

      <form method="GET" className="flex items-center gap-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          name="query"
          placeholder="搜索课程包名称..."
          className="max-w-sm"
          defaultValue={query}
        />
        <Button type="submit" variant="outline">搜索</Button>
      </form>

      <Card>
        <CardHeader>
          <CardTitle>课程包列表</CardTitle>
          <CardDescription>共有 {totalItems} 个课程包</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>序号</TableHead>
                <TableHead>课程包名称</TableHead>
                <TableHead>所属门店</TableHead>
                <TableHead>课程分类</TableHead>
                <TableHead>课时数</TableHead>
                <TableHead>销售价格</TableHead>
                <TableHead>有效期</TableHead>
                <TableHead>使用限制</TableHead>
                <TableHead>销售渠道</TableHead>
                <TableHead>状态</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((product, index) => (
                <TableRow key={product.id}>
                  <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.source}</TableCell>
                  <TableCell>{getTypeLabel(product.type)}</TableCell>
                  <TableCell>{product.count || '-'}</TableCell>
                  <TableCell>{product.price.toFixed(2)}</TableCell>
                  <TableCell>{formatValidPeriod(product.validPeriod)}</TableCell>
                  <TableCell>{product.usageLimit}</TableCell>
                  <TableCell>{product.salesChannel}</TableCell>
                  <TableCell>
                    <Badge variant={product.status === "可用" ? "default" : "secondary"}>
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex items-center justify-end gap-2">
                    <Link href={`/products/${product.id}`} className="flex items-center gap-1">
                      <Edit className="h-4 w-4" />
                      编辑
                    </Link>
                    <DeleteProductButton product={product} />
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