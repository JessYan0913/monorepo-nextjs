import { getClassroom } from "@/lib/actions/classroom"
import { ClassroomInfo } from "@/components/classrooms/classroom-info"

export default async function ClassroomEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const classroom = await getClassroom(id)  
  return (
    <ClassroomInfo classroom={classroom} />
  )
}