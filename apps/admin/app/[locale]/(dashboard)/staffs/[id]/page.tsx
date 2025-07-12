import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { getStaff } from "@/lib/actions/staff"
import { StaffInfo } from "@/components/staffs/staff-info"
import { StaffPermission } from "@/components/staffs/staff-permission"
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
        <TabsList className="w-full sm:w-auto grid grid-cols-2 sm:inline-flex">
          <TabsTrigger value="info" asChild className="px-6 py-2 text-sm">
            <Link href={`/staffs/${id}?tab=info`} className="w-full text-center">员工信息</Link>
          </TabsTrigger>
          <TabsTrigger value="profile" asChild className="px-6 py-2 text-sm">
            <Link href={`/staffs/${id}?tab=profile`} className="w-full text-center">权限配置</Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <StaffInfo staff={staff || undefined} />
        </TabsContent>
        <TabsContent value="profile">
          <StaffPermission staff={staff || undefined} currentRoles={[]} />
        </TabsContent>
      </Tabs>
    </div>
  )
}