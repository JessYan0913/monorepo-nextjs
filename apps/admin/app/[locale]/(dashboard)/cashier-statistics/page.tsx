"use client"

import { useState } from "react"
import { BarChart, PieChart, Activity, Users, UserCheck, UserX, Building, Calendar } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"
import { Button } from "@repo/ui/components/ui/button"
import { Badge } from "@repo/ui/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui/components/ui/table"

import { type Cashier } from "@/lib/actions/cashier"

// Mock data for cashiers (same as in cashiers/page.tsx)
const mockCashiers: Cashier[] = [
  {
    id: 1,
    name: "张三",
    phone: "13800138001",
    email: "zhangsan@example.com",
    avatar: "",
    school: {
      schoolId: "1",
      schoolName: "北京校区",
      schoolAddr: "北京市海淀区中关村大街1号"
    },
    status: "active",
    createTime: "2025-07-01 10:00:00",
    updateTime: "2025-07-01 10:00:00"
  },
  {
    id: 2,
    name: "李四",
    phone: "13800138002",
    email: "lisi@example.com",
    avatar: "",
    school: {
      schoolId: "2",
      schoolName: "上海校区",
      schoolAddr: "上海市浦东新区陆家嘴环路888号"
    },
    status: "active",
    createTime: "2025-07-01 10:05:00",
    updateTime: "2025-07-01 10:05:00"
  },
  {
    id: 3,
    name: "王五",
    phone: "13800138003",
    email: "wangwu@example.com",
    avatar: "",
    school: {
      schoolId: "3",
      schoolName: "广州校区",
      schoolAddr: "广州市天河区珠江新城冼村路21号"
    },
    status: "inactive",
    createTime: "2025-07-01 10:10:00",
    updateTime: "2025-07-01 10:10:00"
  },
  {
    id: 4,
    name: "赵六",
    phone: "13800138004",
    email: "zhaoliu@example.com",
    avatar: "",
    school: {
      schoolId: "4",
      schoolName: "深圳校区",
      schoolAddr: "深圳市南山区科技园南区高新南一道3号"
    },
    status: "active",
    createTime: "2025-07-02 09:00:00",
    updateTime: "2025-07-02 09:00:00"
  },
  {
    id: 5,
    name: "钱七",
    phone: "13800138005",
    email: "qianqi@example.com",
    avatar: "",
    school: {
      schoolId: "1",
      schoolName: "北京校区",
      schoolAddr: "北京市海淀区中关村大街1号"
    },
    status: "active",
    createTime: "2025-07-02 10:30:00",
    updateTime: "2025-07-02 10:30:00"
  },
  {
    id: 6,
    name: "孙八",
    phone: "13800138006",
    email: "sunba@example.com",
    avatar: "",
    school: {
      schoolId: "2",
      schoolName: "上海校区",
      schoolAddr: "上海市浦东新区陆家嘴环路888号"
    },
    status: "inactive",
    createTime: "2025-07-03 11:20:00",
    updateTime: "2025-07-03 11:20:00"
  }
]

// Mock performance data
interface CashierPerformance {
  id: number
  cashierId: number
  cashierName: string
  schoolName: string
  transactionCount: number
  totalAmount: number
  averageAmount: number
  date: string
}

const mockPerformanceData: CashierPerformance[] = [
  { id: 1, cashierId: 1, cashierName: "张三", schoolName: "北京校区", transactionCount: 42, totalAmount: 8450, averageAmount: 201.19, date: "2025-07-12" },
  { id: 2, cashierId: 2, cashierName: "李四", schoolName: "上海校区", transactionCount: 38, totalAmount: 7600, averageAmount: 200, date: "2025-07-12" },
  { id: 3, cashierId: 4, cashierName: "赵六", schoolName: "深圳校区", transactionCount: 35, totalAmount: 7000, averageAmount: 200, date: "2025-07-12" },
  { id: 4, cashierId: 5, cashierName: "钱七", schoolName: "北京校区", transactionCount: 28, totalAmount: 5600, averageAmount: 200, date: "2025-07-12" },
  { id: 5, cashierId: 1, cashierName: "张三", schoolName: "北京校区", transactionCount: 45, totalAmount: 9000, averageAmount: 200, date: "2025-07-11" },
  { id: 6, cashierId: 2, cashierName: "李四", schoolName: "上海校区", transactionCount: 36, totalAmount: 7200, averageAmount: 200, date: "2025-07-11" },
  { id: 7, cashierId: 4, cashierName: "赵六", schoolName: "深圳校区", transactionCount: 32, totalAmount: 6400, averageAmount: 200, date: "2025-07-11" },
  { id: 8, cashierId: 5, cashierName: "钱七", schoolName: "北京校区", transactionCount: 30, totalAmount: 6000, averageAmount: 200, date: "2025-07-11" },
  { id: 9, cashierId: 1, cashierName: "张三", schoolName: "北京校区", transactionCount: 40, totalAmount: 8000, averageAmount: 200, date: "2025-07-10" },
  { id: 10, cashierId: 2, cashierName: "李四", schoolName: "上海校区", transactionCount: 35, totalAmount: 7000, averageAmount: 200, date: "2025-07-10" },
]

// Helper function to group cashiers by school
function groupCashiersBySchool(cashiers: Cashier[]) {
  const schools: Record<string, { id: string, name: string, count: number }> = {}
  
  cashiers.forEach(cashier => {
    const { schoolId, schoolName } = cashier.school
    
    if (!schools[schoolId]) {
      schools[schoolId] = {
        id: schoolId,
        name: schoolName,
        count: 0
      }
    }
    
    schools[schoolId].count++
  })
  
  return Object.values(schools)
}

// Helper function to count cashiers by status
function countCashiersByStatus(cashiers: Cashier[]) {
  return {
    active: cashiers.filter(c => c.status === "active").length,
    inactive: cashiers.filter(c => c.status === "inactive").length,
    total: cashiers.length
  }
}

// Helper function to calculate total transactions
function calculateTotalTransactions(performances: CashierPerformance[]) {
  return performances.reduce((sum, item) => sum + item.transactionCount, 0)
}

// Helper function to calculate total amount
function calculateTotalAmount(performances: CashierPerformance[]) {
  return performances.reduce((sum, item) => sum + item.totalAmount, 0)
}

// Helper function to get top performing cashiers
function getTopPerformingCashiers(performances: CashierPerformance[], limit: number = 5) {
  // Group by cashier and sum their transactions
  const cashierMap: Record<number, { cashierId: number, cashierName: string, schoolName: string, totalTransactions: number, totalAmount: number }> = {}
  
  performances.forEach(perf => {
    if (!cashierMap[perf.cashierId]) {
      cashierMap[perf.cashierId] = {
        cashierId: perf.cashierId,
        cashierName: perf.cashierName,
        schoolName: perf.schoolName,
        totalTransactions: 0,
        totalAmount: 0
      }
    }
    
    cashierMap[perf.cashierId].totalTransactions += perf.transactionCount
    cashierMap[perf.cashierId].totalAmount += perf.totalAmount
  })
  
  // Convert to array and sort by total transactions
  return Object.values(cashierMap)
    .sort((a, b) => b.totalTransactions - a.totalTransactions)
    .slice(0, limit)
}

// Helper function to format currency
function formatCurrency(amount: number) {
  return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY' }).format(amount)
}

export default function CashierStatisticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")
  const [selectedSchool, setSelectedSchool] = useState("all")
  
  // Calculate statistics
  const cashiers = selectedSchool === "all" 
    ? mockCashiers 
    : mockCashiers.filter(c => c.school.schoolId === selectedSchool)
  
  const statusCounts = countCashiersByStatus(cashiers)
  const schoolDistribution = groupCashiersBySchool(mockCashiers)
  const totalTransactions = calculateTotalTransactions(mockPerformanceData)
  const totalAmount = calculateTotalAmount(mockPerformanceData)
  const topPerformers = getTopPerformingCashiers(mockPerformanceData)
  
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">收银员统计</h1>
          <p className="text-muted-foreground">查看收银员数据统计和业绩分析</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="选择时间范围" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">今日</SelectItem>
              <SelectItem value="week">本周</SelectItem>
              <SelectItem value="month">本月</SelectItem>
              <SelectItem value="quarter">本季度</SelectItem>
              <SelectItem value="year">本年度</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedSchool} onValueChange={setSelectedSchool}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="选择校区" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部校区</SelectItem>
              {schoolDistribution.map(school => (
                <SelectItem key={school.id} value={school.id}>{school.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* 统计卡片 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* 总收银员数 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总收银员数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.total}</div>
            <p className="text-xs text-muted-foreground">
              {statusCounts.active} 在职, {statusCounts.inactive} 离职
            </p>
          </CardContent>
        </Card>
        
        {/* 在职率 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">在职率</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statusCounts.total > 0 ? Math.round((statusCounts.active / statusCounts.total) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              共 {statusCounts.active} 名在职收银员
            </p>
          </CardContent>
        </Card>
        
        {/* 总交易笔数 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总交易笔数</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTransactions}</div>
            <p className="text-xs text-muted-foreground">
              {selectedPeriod === "today" ? "今日" : selectedPeriod === "week" ? "本周" : selectedPeriod === "month" ? "本月" : selectedPeriod === "quarter" ? "本季度" : "本年度"}
              交易总量
            </p>
          </CardContent>
        </Card>
        
        {/* 总交易金额 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总交易金额</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalAmount)}</div>
            <p className="text-xs text-muted-foreground">
              平均交易额: {formatCurrency(totalAmount / totalTransactions)}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">总览</TabsTrigger>
          <TabsTrigger value="by-school">校区分布</TabsTrigger>
          <TabsTrigger value="performance">业绩排名</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* 收银员状态分布 */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>收银员状态分布</CardTitle>
                <CardDescription>按在职状态统计收银员数量</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="flex items-center justify-center h-[200px]">
                  {/* 这里应该是一个饼图组件，这里用简单的 div 表示 */}
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <PieChart className="h-24 w-24 text-primary" />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <div className="h-3 w-3 rounded-full bg-primary" />
                        <span className="text-sm">在职: {statusCounts.active}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-3 w-3 rounded-full bg-muted" />
                        <span className="text-sm">离职: {statusCounts.inactive}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* 校区分布 */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>校区分布</CardTitle>
                <CardDescription>各校区收银员数量</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schoolDistribution.map(school => (
                    <div key={school.id} className="flex items-center">
                      <div className="flex-1">
                        <div className="text-sm font-medium">{school.name}</div>
                        <div className="text-xs text-muted-foreground">{school.count} 名收银员</div>
                      </div>
                      <div className="w-1/2 h-2 rounded-full bg-secondary overflow-hidden">
                        <div 
                          className="h-full bg-primary" 
                          style={{ width: `${(school.count / statusCounts.total) * 100}%` }}
                        />
                      </div>
                      <span className="ml-2 text-xs font-medium">
                        {Math.round((school.count / statusCounts.total) * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* 业绩排名 */}
            <Card className="col-span-1 lg:col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>业绩排名</CardTitle>
                <CardDescription>收银员交易笔数排名</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((performer, index) => (
                    <div key={performer.cashierId} className="flex items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Badge variant={index < 3 ? "default" : "outline"} className={index === 0 ? "bg-yellow-500 hover:bg-yellow-500" : index === 1 ? "bg-gray-400 hover:bg-gray-400" : index === 2 ? "bg-amber-700 hover:bg-amber-700" : ""}>
                            {index + 1}
                          </Badge>
                          <div className="text-sm font-medium">{performer.cashierName}</div>
                        </div>
                        <div className="text-xs text-muted-foreground ml-8">{performer.schoolName}</div>
                      </div>
                      <div className="text-sm font-medium">
                        {performer.totalTransactions} 笔
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button variant="ghost" className="w-full">
                  查看完整排名
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="by-school" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>校区收银员分布</CardTitle>
              <CardDescription>各校区收银员数量及状态分布</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>校区</TableHead>
                    <TableHead>在职收银员</TableHead>
                    <TableHead>离职收银员</TableHead>
                    <TableHead>总数</TableHead>
                    <TableHead>在职率</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schoolDistribution.map(school => {
                    const schoolCashiers = mockCashiers.filter(c => c.school.schoolId === school.id)
                    const activeCount = schoolCashiers.filter(c => c.status === "active").length
                    const inactiveCount = schoolCashiers.filter(c => c.status === "inactive").length
                    const activeRate = Math.round((activeCount / schoolCashiers.length) * 100)
                    
                    return (
                      <TableRow key={school.id}>
                        <TableCell className="font-medium">{school.name}</TableCell>
                        <TableCell>{activeCount}</TableCell>
                        <TableCell>{inactiveCount}</TableCell>
                        <TableCell>{schoolCashiers.length}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 rounded-full bg-secondary overflow-hidden">
                              <div 
                                className="h-full bg-primary" 
                                style={{ width: `${activeRate}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium">{activeRate}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>收银员业绩详情</CardTitle>
              <CardDescription>收银员交易数据统计</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>排名</TableHead>
                    <TableHead>姓名</TableHead>
                    <TableHead>校区</TableHead>
                    <TableHead>交易笔数</TableHead>
                    <TableHead>交易金额</TableHead>
                    <TableHead>平均交易额</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topPerformers.map((performer, index) => (
                    <TableRow key={performer.cashierId}>
                      <TableCell>
                        <Badge variant={index < 3 ? "default" : "outline"} className={index === 0 ? "bg-yellow-500 hover:bg-yellow-500" : index === 1 ? "bg-gray-400 hover:bg-gray-400" : index === 2 ? "bg-amber-700 hover:bg-amber-700" : ""}>
                          {index + 1}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{performer.cashierName}</TableCell>
                      <TableCell>{performer.schoolName}</TableCell>
                      <TableCell>{performer.totalTransactions}</TableCell>
                      <TableCell>{formatCurrency(performer.totalAmount)}</TableCell>
                      <TableCell>{formatCurrency(performer.totalAmount / performer.totalTransactions)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="border-t px-6 py-4 flex justify-between">
              <div className="text-sm text-muted-foreground">
                <Calendar className="inline-block mr-2 h-4 w-4" />
                {selectedPeriod === "today" ? "今日" : selectedPeriod === "week" ? "本周" : selectedPeriod === "month" ? "本月" : selectedPeriod === "quarter" ? "本季度" : "本年度"}
                数据
              </div>
              <Button variant="outline" size="sm">
                导出数据
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
