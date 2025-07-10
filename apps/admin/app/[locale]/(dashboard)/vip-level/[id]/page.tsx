import { vipLevelList } from "@/lib/actions/vip-level"
import { VipLevelInfo } from "@/components/vip-level/vip-level-info"

export default async function VipLevelEditPage({ params }: { params: { id: string } }) {
  const { id } = params
  
  // Fetch all VIP levels and find the one with matching ID
  const vipLevels = await vipLevelList()
  const vipLevel = vipLevels.find(level => level.id === Number(id))
  
  return (
    <VipLevelInfo vipLevel={vipLevel} />
  )
}
