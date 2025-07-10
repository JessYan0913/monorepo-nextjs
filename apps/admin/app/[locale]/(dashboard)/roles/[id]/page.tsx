import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { getRole } from "@/lib/actions/role"
import { RoleInfo } from "@/components/roles/role-info"

export default async function RoleEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const role = await getRole(id)  
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center">
        <Link 
          href="/roles" 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回列表
        </Link>
      </div>
      <RoleInfo role={role} />
    </div>
  )
}