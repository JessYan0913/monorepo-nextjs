import { Plus, Phone, Mail, Clock, Building } from "lucide-react"
import Link from "next/link"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@repo/ui/components/ui/card"
import { Badge } from "@repo/ui/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar"
import { DeleteCashierButton } from "@/components/cashiers/delete-cashier"
import { cashierList, type Cashier } from "@/lib/actions/cashier"

// Client component for the entire page
export default async function CashierManagementPage() {
  const cashiers = await cashierList({
    name: "",
    phone: "",
    email: "",
    schoolId: "",
    status: "active",
    startTime: "",
    endTime: "",
    page: 1,
    size: 10
  })
  
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
          <p className="text-sm text-muted-foreground">共有 {cashiers.total} 个收银员账号</p>
        </div>
        
        {cashiers.data.length === 0 ? (
          <Card className="flex items-center justify-center p-8">
            <p className="text-muted-foreground">暂无收银员账号，请添加</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cashiers.data.map((cashier) => {
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
                    <Link
                      href={`/cashiers/${cashier.id}`}
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 py-2"
                    >
                      编辑
                    </Link>
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
