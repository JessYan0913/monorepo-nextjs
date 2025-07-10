import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { getSchool } from "@/lib/actions/school"
import { SchoolInfo } from "@/components/schools/school-info"

export default async function SchoolEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const school = await getSchool(id)  
  return (
    <div className="container max-w-6xl mx-auto p-4 sm:p-6 space-y-6 transition-all duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <Link 
          href="/schools" 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回列表
        </Link>
      </div>
      <SchoolInfo school={school} />
    </div>
  )
}