import { Plus, Edit, Star, Sparkles, Clock, CreditCard } from "lucide-react"
import Link from "next/link"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@repo/ui/components/ui/card"
import { Badge } from "@repo/ui/components/ui/badge"

// Import type only, we'll use mock data instead of actual API calls
import type { VipLevel } from "@/lib/actions/vip-level"
import { DeleteVipLevelButton } from "@/components/vip-level/delete-vip-level"

// Mock data for VIP levels
const mockVipLevels: VipLevel[] = [
  {
    id: 1,
    level: 1,
    consumptionAmount: 1000,
    discountPercentage: 98,
    benefitsDescription: "基础会员权益，享受98%价格购买商品",
    createTime: "2025-07-01 10:00:00",
    updateTime: "2025-07-01 10:00:00"
  },
  {
    id: 2,
    level: 2,
    consumptionAmount: 5000,
    discountPercentage: 95,
    benefitsDescription: "高级会员权益，享受95%价格购买商品，每月额外赠送100积分",
    createTime: "2025-07-01 10:05:00",
    updateTime: "2025-07-01 10:05:00"
  },
  {
    id: 3,
    level: 3,
    consumptionAmount: 10000,
    discountPercentage: 90,
    benefitsDescription: "尊享会员权益，享受90%价格购买商品，每月额外赠送300积分，专属客服",
    createTime: "2025-07-01 10:10:00",
    updateTime: "2025-07-01 10:10:00"
  }
]

// Client component for the entire page
export default function VipLevelManagementPage() {
  const vipLevels = mockVipLevels
  
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">VIP等级管理</h1>
          <p className="text-muted-foreground">管理会员VIP等级及其折扣设置</p>
        </div>
        <Link 
          href="/vip-level/add" 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          <Plus className="mr-2 h-4 w-4" />
          添加VIP等级
        </Link>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">VIP等级列表</h2>
          <p className="text-sm text-muted-foreground">共有 {vipLevels.length} 个VIP等级</p>
        </div>
        
        {vipLevels.length === 0 ? (
          <Card className="flex items-center justify-center p-8">
            <p className="text-muted-foreground">暂无VIP等级，请添加</p>
          </Card>
        ) : (
          <div className="flex flex-col space-y-4 max-w-3xl mx-auto">
            {vipLevels.map((level) => {
              return (
                <Card 
                  key={level.id} 
                  className="overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-200 dark:border-gray-700"
                >
                  
                  <CardHeader className="relative">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-gray-500" />
                        <CardTitle>VIP {level.level}</CardTitle>
                      </div>
                      <Badge variant="outline" className="font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                        {level.discountPercentage}% 折扣
                      </Badge>
                    </div>
                    <CardDescription className="mt-2">
                      <div className="flex items-center gap-1 text-sm">
                        <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>创建于 {level.createTime}</span>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="relative space-y-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">累计消费: {level.consumptionAmount} 元</span>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">等级权益:</span>
                      </div>
                      <p className="text-sm text-muted-foreground pl-6">{level.benefitsDescription}</p>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="relative flex justify-end gap-2 pt-2 border-t bg-background/80">
                    <Link 
                      href={`/vip-level/${level.id}`} 
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 py-2"
                    >
                      <Edit className="mr-1 h-3.5 w-3.5" />
                      编辑
                    </Link>
                    
                    {level.level === Math.max(...vipLevels.map(l => l.level)) && (
                      <DeleteVipLevelButton vipLevel={level} />
                    )}
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
