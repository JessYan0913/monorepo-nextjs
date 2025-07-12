"use client"

import * as React from "react"
import { Trash2 } from "lucide-react"

import { Button } from "@repo/ui/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@repo/ui/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/ui/alert"
import { type VipLevel } from "@/lib/actions/vip-level"

// Client component for deleting a VIP level
export function DeleteVipLevelButton({ vipLevel }: { 
  vipLevel: VipLevel, 
}) {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  function handleDelete() {
    setError(null);
    setIsSubmitting(true);
    
    try {
      setOpen(false); // Close dialog on success
    } catch (error) {
      setError('删除VIP等级失败');
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="mr-1 h-4 w-4" />
          删除
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>删除VIP等级</DialogTitle>
          <DialogDescription>
            确定要删除VIP {vipLevel.level} 等级吗？此操作不可撤销。
          </DialogDescription>
        </DialogHeader>
        
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>警告</AlertTitle>
          <AlertDescription>
            只能删除最高的VIP等级。删除后，相应的会员权益将会失效。
          </AlertDescription>
        </Alert>
        
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>错误</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={(e) => {
          e.preventDefault();
          handleDelete();
        }} className="space-y-4">
          <DialogFooter>
            <Button type="submit" variant="destructive" disabled={isSubmitting}>
              {isSubmitting ? '删除中...' : '确认删除'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
