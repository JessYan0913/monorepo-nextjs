import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { getStudent } from "@/lib/actions/student"
import { StudentInfo } from "@/components/students/student-info"

export default async function StudentEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const student = await getStudent(id)  
  return (
    <div className="container max-w-6xl mx-auto p-4 sm:p-6 space-y-6 transition-all duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <Link 
          href="/students" 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回列表
        </Link>
      </div>
      <StudentInfo student={student || undefined} />
    </div>
  )
}