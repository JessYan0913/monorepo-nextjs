"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"

import { Button } from "@repo/ui/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/ui/components/ui/alert-dialog"
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/ui/alert"
import { type VipLevel } from "@/lib/actions/vip-level"

// Client component for deleting a VIP level
export function DeleteVipLevelButton({ vipLevel }: { 
  vipLevel: VipLevel, 
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  async function handleDelete() {
    setError(null);
    setIsDeleting(true);
    
    try {
      setOpen(false); // Close dialog on success
    } catch (error) {
      setError('删除VIP等级失败');
    } finally {
      setIsDeleting(false);
    }
  }
  
  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            删除
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>删除VIP等级</AlertDialogTitle>
            <AlertDialogDescription>
              确定要删除VIP {vipLevel.level} 等级吗？此操作不可撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          
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
          
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>取消</AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600"
            >
              {isDeleting ? '删除中...' : '删除'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
