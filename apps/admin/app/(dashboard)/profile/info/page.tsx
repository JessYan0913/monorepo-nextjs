"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, MapPin, Clock } from "lucide-react"

// 模拟用户数据，实际项目中应该从API获取
const mockUserData = {
  id: "user-001",
  name: "张三",
  avatar: "/public/placeholder-user.jpg",
  campus: "北京校区",
  email: "zhangsan@example.com",
  phone: "138****1234",
  registrationDate: "2023-01-15T08:30:00Z",
  lastLogin: "2023-05-17T14:22:10Z",
  role: "学生",
  financialStatus: {
    balance: 2500.00,
    pendingPayments: 0,
    lastTransaction: {
      amount: 1200.00,
      date: "2023-05-10T09:15:00Z",
      type: "充值",
      status: "已完成"
    },
    transactions: []
  }
}

export default function ProfileInfoPage() {
  const [user, setUser] = useState<typeof mockUserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 模拟API请求
    const fetchUserData = async () => {
      try {
        // 实际项目中应该从API获取数据
        // const response = await fetch('/api/user/profile')
        // const data = await response.json()
        // setUser(data)
        
        // 使用模拟数据
        setTimeout(() => {
          setUser(mockUserData)
          setLoading(false)
        }, 800)
      } catch (error) {
        console.error("Failed to fetch user data:", error)
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>基本信息</CardTitle>
          <CardDescription>查看和管理您的个人信息</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
              <Skeleton className="h-4 w-[300px]" />
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/placeholder-user.jpg" alt={user?.name} />
                  <AvatarFallback>{user?.name?.slice(0, 1) || "U"}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-medium">{user?.name}</h3>
                  <p className="text-sm text-muted-foreground">{user?.role}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>校区</span>
                  </div>
                  <p>{user?.campus}</p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>注册时间</span>
                  </div>
                  <p>{user ? formatDate(user.registrationDate) : ""}</p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>上次登录</span>
                  </div>
                  <p>{user ? formatDate(user.lastLogin) : ""}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">邮箱</p>
                  <p>{user?.email}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">手机号</p>
                  <p>{user?.phone}</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}