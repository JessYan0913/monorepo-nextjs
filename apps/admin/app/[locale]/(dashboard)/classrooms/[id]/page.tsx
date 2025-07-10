import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { getClassroom } from "@/lib/actions/classroom"
import { ClassroomInfo } from "@/components/classrooms/classroom-info"

export default async function ClassroomEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const classroom = await getClassroom(id)  
  return (
    <div className="container max-w-3xl mx-auto p-4 sm:p-6 space-y-6 transition-all duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <Link 
          href="/vip-level" 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回列表
        </Link>
      </div>
      <ClassroomInfo classroom={classroom} />
    </div>
  )
}