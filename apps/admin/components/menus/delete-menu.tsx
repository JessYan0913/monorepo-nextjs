'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Trash2 } from "lucide-react"
import { Button } from "@repo/ui/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@repo/ui/components/ui/dialog"
import { deleteMenu } from "@/lib/actions/menu"

export function DeleteMenuButton({ id }: { id: string }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  async function onConfirmDelete() {
    await deleteMenu(id)
    setOpen(false)
    router.refresh()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* ⛳️ type="button" 避免误触提交 */}
        <div className="text-red-600 flex items-center gap-1">
          <Trash2 className="h-4 w-4" />
          删除
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>确认删除？</DialogTitle>
        </DialogHeader>
        <div>你确定要删除这个菜单吗？此操作无法撤销。</div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>取消</Button>
          <Button variant="destructive" onClick={onConfirmDelete}>确认删除</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
