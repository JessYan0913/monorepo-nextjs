"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const data = [
  {
    source: "直接访问",
    visitors: 12453,
    percentage: 35,
    change: "增加",
  },
  {
    source: "搜索引擎",
    visitors: 8763,
    percentage: 25,
    change: "增加",
  },
  {
    source: "社交媒体",
    visitors: 6234,
    percentage: 18,
    change: "减少",
  },
  {
    source: "外部链接",
    visitors: 4532,
    percentage: 13,
    change: "增加",
  },
  {
    source: "邮件营销",
    visitors: 2345,
    percentage: 7,
    change: "减少",
  },
  {
    source: "其他来源",
    visitors: 904,
    percentage: 2,
    change: "持平",
  },
]

export function SourceTable() {
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>来源</TableHead>
            <TableHead>访问量</TableHead>
            <TableHead>占比</TableHead>
            <TableHead>趋势</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.source}>
              <TableCell className="font-medium">{item.source}</TableCell>
              <TableCell>{item.visitors.toLocaleString()}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Progress value={item.percentage} className="w-[100px]" />
                  <span className="text-sm">{item.percentage}%</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={item.change === "增加" ? "default" : item.change === "减少" ? "destructive" : "secondary"}
                >
                  {item.change}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
