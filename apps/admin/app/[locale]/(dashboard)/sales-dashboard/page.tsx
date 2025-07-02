"use client"

import { StatsCard } from "@/components/dashboard/stats-card"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs"
import { CreditCard, DollarSign, Package, Users } from "lucide-react"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

// 销售统计数据（模拟数据）
const salesStats = [
  {
    title: "总销售额",
    value: "¥128,430",
    description: "本月销售总额",
    icon: DollarSign,
    trend: {
      value: "12.5%",
      positive: true,
    },
  },
  {
    title: "订单数量",
    value: "1,284",
    description: "本月订单总数",
    icon: CreditCard,
    trend: {
      value: "8.2%",
      positive: true,
    },
  },
  {
    title: "产品销量",
    value: "3,891",
    description: "本月产品销量",
    icon: Package,
    trend: {
      value: "5.1%",
      positive: true,
    },
  },
  {
    title: "新客户",
    value: "342",
    description: "本月新增客户",
    icon: Users,
    trend: {
      value: "2.3%",
      positive: false,
    },
  },
]

// 最近销售活动（模拟数据）
const recentSales = [
  {
    id: 1,
    user: {
      name: "李明",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "李",
    },
    action: "购买了",
    target: "高级套餐",
    time: "刚刚",
  },
  {
    id: 2,
    user: {
      name: "王芳",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "王",
    },
    action: "续订了",
    target: "标准套餐",
    time: "10分钟前",
  },
  {
    id: 3,
    user: {
      name: "张伟",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "张",
    },
    action: "升级到",
    target: "企业版",
    time: "1小时前",
  },
  {
    id: 4,
    user: {
      name: "刘洋",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "刘",
    },
    action: "购买了",
    target: "入门套餐",
    time: "2小时前",
  },
  {
    id: 5,
    user: {
      name: "赵静",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "赵",
    },
    action: "取消了",
    target: "标准套餐",
    time: "3小时前",
  },
]

// 自定义销售活动组件
function RecentSalesActivity() {
  return (
    <div className="space-y-8">
      {recentSales.map((sale) => (
        <div className="flex items-center" key={sale.id}>
          <Avatar className="h-9 w-9">
            <AvatarImage src={sale.user.avatar || "/placeholder.svg"} alt={sale.user.name} />
            <AvatarFallback>{sale.user.initials}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{sale.user.name}</p>
            <p className="text-sm text-muted-foreground">
              {sale.action} <span className="font-medium">{sale.target}</span>
            </p>
          </div>
          <div className="ml-auto font-medium text-xs text-muted-foreground">{sale.time}</div>
        </div>
      ))}
    </div>
  )
}

// 自定义周销售数据（模拟数据）
const weeklySalesData = [
  {
    name: "周一",
    value: 12400,
  },
  {
    name: "周二",
    value: 9800,
  },
  {
    name: "周三",
    value: 15600,
  },
  {
    name: "周四",
    value: 18200,
  },
  {
    name: "周五",
    value: 21500,
  },
  {
    name: "周六",
    value: 16800,
  },
  {
    name: "周日",
    value: 8900,
  },
]

// 自定义周销售图表组件
function WeeklySalesChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={weeklySalesData}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `¥${value}`} />
        <Tooltip formatter={(value) => [`¥${value}`, "销售额"]} labelFormatter={(label) => `${label}`} />
        <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

// 自定义月销售数据（模拟数据）
const monthlySalesData = [
  {
    name: "1月",
    total: 84000,
  },
  {
    name: "2月",
    total: 92000,
  },
  {
    name: "3月",
    total: 120000,
  },
  {
    name: "4月",
    total: 105000,
  },
  {
    name: "5月",
    total: 118000,
  },
  {
    name: "6月",
    total: 132000,
  },
  {
    name: "7月",
    total: 145000,
  },
  {
    name: "8月",
    total: 158000,
  },
  {
    name: "9月",
    total: 172000,
  },
  {
    name: "10月",
    total: 185000,
  },
  {
    name: "11月",
    total: 198000,
  },
  {
    name: "12月",
    total: 210000,
  },
]

// 自定义月销售图表组件
function MonthlySalesChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={monthlySalesData}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `¥${value}`} />
        <Tooltip formatter={(value) => [`¥${value}`, "销售额"]} labelFormatter={(label) => `${label}`} />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default function SalesDashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">销售数据看板</h2>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="weekly">周数据</TabsTrigger>
          <TabsTrigger value="monthly">月数据</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {salesStats.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat.title}
                value={stat.value}
                description={stat.description}
                icon={stat.icon}
                trend={stat.trend}
              />
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>周销售趋势</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <WeeklySalesChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>最近销售</CardTitle>
                <CardDescription>最近完成的销售订单</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSalesActivity />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="weekly" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {salesStats.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat.title}
                value={stat.value}
                description={stat.description}
                icon={stat.icon}
                trend={stat.trend}
              />
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-7">
              <CardHeader>
                <CardTitle>周销售详情</CardTitle>
                <CardDescription>本周每日销售数据</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <WeeklySalesChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="monthly" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {salesStats.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat.title}
                value={stat.value}
                description={stat.description}
                icon={stat.icon}
                trend={stat.trend}
              />
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-7">
              <CardHeader>
                <CardTitle>月销售详情</CardTitle>
                <CardDescription>今年每月销售数据</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <MonthlySalesChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
