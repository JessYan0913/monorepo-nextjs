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
} from "@repo/ui/components/ui/alert-dialog"
import { deleteStudent } from "@/lib/actions/student"

export function DeleteStudentButton({ id }: { id: number }) {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      const success = await deleteStudent(id)
      
      if (success) {
        setOpen(false)
        router.refresh()
      } else {
        console.error("Failed to delete student")
      }
    } catch (error) {
      console.error("Error deleting student:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <Button 
        variant="ghost" 
        size="sm" 
        className="text-red-500 hover:text-red-700"
        onClick={() => setOpen(true)}
      >
        <Trash2 className="h-4 w-4 mr-1" />
        删除
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              您确定要删除这名学生吗？此操作无法撤销，学生的所有信息将被永久删除。
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
