import { getSchool } from "@/lib/actions/school"
import { SchoolInfo } from "@/components/schools/school-info"

export default async function SchoolEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const school = await getSchool(id)  
  return (
    <SchoolInfo school={school} />
  )
}