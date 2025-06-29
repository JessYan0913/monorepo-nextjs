"use client"

import { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  FileText, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  ChevronRight 
} from "lucide-react"
import { Button } from "@repo/ui/components/ui/button"
import { Input } from "@repo/ui/components/ui/input"
import { Badge } from "@repo/ui/components/ui/badge"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@repo/ui/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs"

// 订单状态枚举
enum OrderStatus {
  PENDING_PAYMENT = "待付款",
  PROCESSING = "处理中",
  SHIPPED = "已发货",
  DELIVERED = "已送达",
  COMPLETED = "已完成",
  CANCELLED = "已取消"
}

// 订单类型接口
interface OrderItem {
  id: string
  title: string
  price: number
  quantity: number
  image: string
}

interface Order {
  id: string
  orderNumber: string
  date: Date
  status: OrderStatus
  totalAmount: number
  items: OrderItem[]
  paymentMethod: string
}

// 模拟订单数据
const mockOrders: Order[] = [
  {
    id: "order-1",
    orderNumber: "ORD20250516001",
    date: new Date(2025, 4, 16), // 2025-05-16
    status: OrderStatus.COMPLETED,
    totalAmount: 1999,
    paymentMethod: "微信支付",
    items: [
      {
        id: "basic-1",
        title: "英语口语基础课程包",
        price: 1999,
        quantity: 1,
        image: "/images/courses/english-basic.jpg"
      }
    ]
  },
  {
    id: "order-2",
    orderNumber: "ORD20250514002",
    date: new Date(2025, 4, 14), // 2025-05-14
    status: OrderStatus.DELIVERED,
    totalAmount: 2199,
    paymentMethod: "支付宝",
    items: [
      {
        id: "basic-3",
        title: "少儿编程入门课程",
        price: 2199,
        quantity: 1,
        image: "/images/courses/math-basic.jpg"
      }
    ]
  },
  {
    id: "order-3",
    orderNumber: "ORD20250510003",
    date: new Date(2025, 4, 10), // 2025-05-10
    status: OrderStatus.PROCESSING,
    totalAmount: 3198,
    paymentMethod: "微信支付",
    items: [
      {
        id: "basic-2",
        title: "数学思维启蒙课程",
        price: 1599,
        quantity: 2,
        image: "/images/courses/math-basic.jpg"
      }
    ]
  },
  {
    id: "order-4",
    orderNumber: "ORD20250505004",
    date: new Date(2025, 4, 5), // 2025-05-05
    status: OrderStatus.COMPLETED,
    totalAmount: 4398,
    paymentMethod: "支付宝",
    items: [
      {
        id: "basic-1",
        title: "英语口语基础课程包",
        price: 1999,
        quantity: 1,
        image: "/images/courses/english-basic.jpg"
      },
      {
        id: "basic-3",
        title: "少儿编程入门课程",
        price: 2399,
        quantity: 1,
        image: "/images/courses/math-basic.jpg"
      }
    ]
  },
  {
    id: "order-5",
    orderNumber: "ORD20250501005",
    date: new Date(2025, 4, 1), // 2025-05-01
    status: OrderStatus.CANCELLED,
    totalAmount: 1599,
    paymentMethod: "微信支付",
    items: [
      {
        id: "basic-2",
        title: "数学思维启蒙课程",
        price: 1599,
        quantity: 1,
        image: "/images/courses/math-basic.jpg"
      }
    ]
  }
];

// 获取订单状态对应的图标和颜色
function getStatusInfo(status: OrderStatus) {
  switch (status) {
    case OrderStatus.PENDING_PAYMENT:
      return { icon: <Clock className="h-5 w-5" />, color: "bg-yellow-100 text-yellow-800" };
    case OrderStatus.PROCESSING:
      return { icon: <Package className="h-5 w-5" />, color: "bg-blue-100 text-blue-800" };
    case OrderStatus.SHIPPED:
      return { icon: <Truck className="h-5 w-5" />, color: "bg-indigo-100 text-indigo-800" };
    case OrderStatus.DELIVERED:
      return { icon: <Truck className="h-5 w-5" />, color: "bg-purple-100 text-purple-800" };
    case OrderStatus.COMPLETED:
      return { icon: <CheckCircle className="h-5 w-5" />, color: "bg-green-100 text-green-800" };
    case OrderStatus.CANCELLED:
      return { icon: <FileText className="h-5 w-5" />, color: "bg-red-100 text-red-800" };
    default:
      return { icon: <FileText className="h-5 w-5" />, color: "bg-gray-100 text-gray-800" };
  }
}

export default function OrderPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  
  // 根据筛选条件过滤订单
  const filteredOrders = mockOrders.filter(order => {
    // 搜索过滤
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // 状态过滤
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    
    // 时间过滤
    let matchesTime = true;
    const now = new Date();
    const orderDate = new Date(order.date);
    
    if (timeFilter === "last-week") {
      const lastWeek = new Date(now);
      lastWeek.setDate(lastWeek.getDate() - 7);
      matchesTime = orderDate >= lastWeek;
    } else if (timeFilter === "last-month") {
      const lastMonth = new Date(now);
      lastMonth.setMonth(lastMonth.getMonth() - 1);
      matchesTime = orderDate >= lastMonth;
    } else if (timeFilter === "last-3-months") {
      const last3Months = new Date(now);
      last3Months.setMonth(last3Months.getMonth() - 3);
      matchesTime = orderDate >= last3Months;
    }
    
    return matchesSearch && matchesStatus && matchesTime;
  });
  
  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold">我的订单</h1>
      
      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <TabsList className="mb-2 sm:mb-0">
            <TabsTrigger value="all" onClick={() => setStatusFilter("all")}>全部订单</TabsTrigger>
            <TabsTrigger value="pending" onClick={() => setStatusFilter(OrderStatus.PENDING_PAYMENT)}>待付款</TabsTrigger>
            <TabsTrigger value="processing" onClick={() => setStatusFilter(OrderStatus.PROCESSING)}>处理中</TabsTrigger>
            <TabsTrigger value="completed" onClick={() => setStatusFilter(OrderStatus.COMPLETED)}>已完成</TabsTrigger>
          </TabsList>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-[260px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="搜索订单号或商品名称"
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="时间筛选" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部时间</SelectItem>
                <SelectItem value="last-week">最近一周</SelectItem>
                <SelectItem value="last-month">最近一个月</SelectItem>
                <SelectItem value="last-3-months">最近三个月</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <TabsContent value="all" className="mt-0">
          {filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="h-16 w-16 text-muted-foreground opacity-20 mb-4" />
              <h3 className="text-lg font-medium mb-1">没有找到订单</h3>
              <p className="text-muted-foreground mb-4">尝试调整筛选条件或搜索其他关键词</p>
              <Button asChild variant="outline">
                <Link href="/mall">去购物</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const { icon, color } = getStatusInfo(order.status);
                return (
                  <Card key={order.id} className="overflow-hidden">
                    <CardHeader className="bg-muted/30 py-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                          <div className="text-sm text-muted-foreground">订单号: {order.orderNumber}</div>
                          <div className="hidden sm:block text-muted-foreground">|</div>
                          <div className="text-sm text-muted-foreground">
                            {format(order.date, 'yyyy年MM月dd日', { locale: zhCN })}
                          </div>
                        </div>
                        <Badge className={`${color} px-2 py-1 rounded-md`}>
                          <span className="flex items-center gap-1">
                            {icon}
                            {order.status}
                          </span>
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      {order.items.map((item, index) => (
                        <div key={`${order.id}-${item.id}`} className={`flex items-center p-4 ${index !== order.items.length - 1 ? 'border-b' : ''}`}>
                          <div className="w-16 h-16 rounded-md bg-muted overflow-hidden mr-4">
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://via.placeholder.com/64?text=课程";
                              }}
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium line-clamp-1">{item.title}</h4>
                            <div className="text-sm text-muted-foreground mt-1">
                              单价: ¥{item.price.toFixed(2)} × {item.quantity}
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <div className="font-medium">¥{(item.price * item.quantity).toFixed(2)}</div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                    <CardFooter className="flex justify-between items-center border-t py-4">
                      <div>
                        <div className="text-sm text-muted-foreground">支付方式: {order.paymentMethod}</div>
                        <div className="font-medium">总计: ¥{order.totalAmount.toFixed(2)}</div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/mall/order/${order.id}`}>
                            <span className="flex items-center gap-1">
                              订单详情 <ChevronRight className="h-4 w-4" />
                            </span>
                          </Link>
                        </Button>
                        {order.status === OrderStatus.COMPLETED && (
                          <Button size="sm">再次购买</Button>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
        
        {/* 其他标签页内容与 "all" 相同，只是通过状态筛选器过滤 */}
        <TabsContent value="pending" className="mt-0">
          {/* 内容与 "all" 相同，但已通过 statusFilter 过滤 */}
        </TabsContent>
        <TabsContent value="processing" className="mt-0">
          {/* 内容与 "all" 相同，但已通过 statusFilter 过滤 */}
        </TabsContent>
        <TabsContent value="completed" className="mt-0">
          {/* 内容与 "all" 相同，但已通过 statusFilter 过滤 */}
        </TabsContent>
      </Tabs>
    </div>
  )
}