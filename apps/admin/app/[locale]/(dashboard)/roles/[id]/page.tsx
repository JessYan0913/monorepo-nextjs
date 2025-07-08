import { getRole } from "@/lib/actions/role"
import { RoleInfo } from "@/components/roles/role-info"

export default async function RoleEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const role = await getRole(id)  
  return (
    <RoleInfo role={role} />
  )
}