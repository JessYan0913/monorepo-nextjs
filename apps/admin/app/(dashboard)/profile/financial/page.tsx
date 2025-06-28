"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

// 模拟用户数据，实际项目中应该从API获取
const mockUserData = {
  id: "user-001",
  name: "张三",
  financialStatus: {
    balance: 2500.00,
    pendingPayments: 0,
    lastTransaction: {
      amount: 1200.00,
      date: "2023-05-10T09:15:00Z",
      type: "充值",
      status: "已完成"
    },
    transactions: [
      {
        id: "tx-001",
        amount: 1200.00,
        date: "2023-05-10T09:15:00Z",
        description: "课程费用充值",
        type: "充值",
        status: "已完成"
      },
      {
        id: "tx-002",
        amount: -500.00,
        date: "2023-04-25T13:20:00Z",
        description: "英语课程报名",
        type: "支出",
        status: "已完成"
      },
      {
        id: "tx-003",
        amount: 1800.00,
        date: "2023-03-18T10:45:00Z",
        description: "学期费用充值",
        type: "充值",
        status: "已完成"
      }
    ]
  }
}

export default function ProfileFinancialPage() {
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
      <Card>
        <CardHeader>
          <CardTitle>账户余额</CardTitle>
          <CardDescription>您当前的账户余额和待付款项</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-3xl font-bold">
                  ¥ {user?.financialStatus.balance.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">
                  待付款项: ¥ {user?.financialStatus.pendingPayments.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">上次交易</p>
                <p>
                  {user?.financialStatus.lastTransaction.type}：
                  ¥ {user?.financialStatus.lastTransaction.amount.toFixed(2)}
                  （{user ? formatDate(user.financialStatus.lastTransaction.date) : ""}）
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>交易记录</CardTitle>
          <CardDescription>最近的交易记录</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : (
            <div className="space-y-4">
              {user?.financialStatus.transactions.map((transaction) => (
                <div key={transaction.id} className="flex justify-between border-b pb-3">
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                  <div className={`text-right ${transaction.amount > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    <p className="font-medium">
                      {transaction.amount > 0 ? '+' : ''}
                      ¥ {transaction.amount.toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground">{transaction.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}