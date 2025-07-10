import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { getStaff } from "@/lib/actions/staff"
import { StaffInfo } from "@/components/staffs/staff-info"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@repo/ui/components/ui/tabs"

export default async function StaffEditPage({ params, searchParams }: {
  params: { id: string };
  searchParams: {
    tab?: string
  }
}) {
  const { id } = params

  const tab = searchParams.tab ?? "info"

  const staff = await getStaff(id)  
  return (
    <div className="container max-w-6xl mx-auto p-4 sm:p-6 space-y-6 transition-all duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <Link 
          href="/staffs" 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回列表
        </Link>
      </div>

      <Tabs defaultValue={tab} className="w-full">
        <TabsList>
          <TabsTrigger value="info" asChild>
            <Link href={`/staffs/${id}?tab=info`}>信息</Link>
          </TabsTrigger>
          <TabsTrigger value="profile" asChild>
            <Link href={`/staffs/${id}?tab=profile`}>权限</Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <StaffInfo staff={staff || undefined} />
        </TabsContent>
        <TabsContent value="profile">
          <div className="p-4 border rounded-md bg-muted/5">
            <h2 className="text-lg font-medium mb-2">权限管理</h2>
            <p className="text-muted-foreground">此部分用于管理员工权限</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}