import { getMenu } from "@/lib/actions/menu"
import { MenuInfo } from "@/components/menus/menu-info"

export default async function MenuEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const menu = await getMenu(id)  
  return (
    <MenuInfo menu={menu} />
  )
}