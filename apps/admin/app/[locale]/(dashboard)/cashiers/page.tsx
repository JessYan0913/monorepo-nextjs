import { Plus, Phone, Mail, Clock, Building } from "lucide-react"
import Link from "next/link"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@repo/ui/components/ui/card"
import { Badge } from "@repo/ui/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar"
import { DeleteCashierButton } from "@/components/cashiers/delete-cashier"
import { type Cashier } from "@/lib/actions/cashier"

// Mock data for cashiers
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

// Client component for the entire page
export default function CashierManagementPage() {
  const cashiers = mockCashiers
  
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">收银员管理</h1>
          <p className="text-muted-foreground">管理店铺收银员账号及权限</p>
        </div>
        <Link 
          href="/cashiers/add" 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          <Plus className="mr-2 h-4 w-4" />
          添加收银员
        </Link>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">收银员列表</h2>
          <p className="text-sm text-muted-foreground">共有 {cashiers.length} 个收银员账号</p>
        </div>
        
        {cashiers.length === 0 ? (
          <Card className="flex items-center justify-center p-8">
            <p className="text-muted-foreground">暂无收银员账号，请添加</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cashiers.map((cashier) => {
              return (
                <Card 
                  key={cashier.id} 
                  className="overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col h-full"
                >
                  <CardHeader className="relative pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={cashier.avatar} alt={cashier.name} />
                          <AvatarFallback>{cashier.name.slice(0, 1)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{cashier.name}</CardTitle>
                          <CardDescription className="mt-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Building className="h-3.5 w-3.5 text-muted-foreground" />
                              <Link href={`/schools/${cashier.school.schoolId}`}>{cashier.school.schoolName}</Link>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                              <span className="ml-4">{cashier.school.schoolAddr}</span>
                            </div>
                          </CardDescription>
                        </div>
                      </div>
                      <Badge 
                        variant={cashier.status === "active" ? "default" : "secondary"}
                        className={cashier.status === "active" 
                          ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400" 
                          : "bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400"}
                      >
                        {cashier.status === "active" ? "在职" : "离职"}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="relative space-y-3 flex-grow">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{cashier.phone}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{cashier.email}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">创建于 {cashier.createTime}</span>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="relative flex justify-end gap-2 pt-2 border-t bg-background/80">
                    <DeleteCashierButton cashier={cashier} />
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  )
}
