"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

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
import { type Cashier } from "@/lib/actions/cashier"

export function DeleteCashierButton({ cashier }: { cashier: Cashier }) {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      
      setOpen(false)
      router.refresh()
    } catch (error) {
      console.error("Error deleting school:", error)
    } finally {
      setIsDeleting(false)
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
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              您确定要删除这个收银员 {cashier.name} 吗？
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>取消</AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => {
                e.preventDefault()
                handleDelete()
              }}
              disabled={isDeleting}
              className="bg-red-500 hover:bg-red-600"
            >
              {isDeleting ? "删除中..." : "删除"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
