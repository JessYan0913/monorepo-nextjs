"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@repo/ui/components/ui/dialog"
import { Button } from "@repo/ui/components/ui/button"
import { Badge } from "@repo/ui/components/ui/badge"
import { Calendar, Clock, MapPin, Users, User } from "lucide-react"
import type { TimeSlot } from "@/lib/actions/course"

interface CourseDetailModalProps {
  timeSlot: TimeSlot | null
  isOpen: boolean
  onClose: () => void
  onEdit: (timeSlot: TimeSlot) => void
  onDelete: (timeSlot: TimeSlot) => void
}

export default function CourseDetailModal({ timeSlot, isOpen, onClose, onEdit, onDelete }: CourseDetailModalProps) {
  if (!timeSlot || !timeSlot.course) return null

  const { course, startTime, endTime, studentCount, maxStudents } = timeSlot

  const getStatusBadge = () => {
    switch (course.status) {
      case "conflict":
        return <Badge variant="destructive">冲突</Badge>
      case "cancelled":
        return <Badge variant="secondary">已取消</Badge>
      default:
        return <Badge variant="default">正常</Badge>
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{course.name}</span>
            {getStatusBadge()}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>2025年7月13日</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-gray-500" />
              <span>
                {startTime}-{endTime}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span>教室A-101</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <User className="w-4 h-4 text-gray-500" />
            <span>张老师</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-gray-500" />
            <span>
              {studentCount || 0}/{maxStudents || 0}人{course.ageGroup && ` (${course.ageGroup})`}
            </span>
          </div>

          {course.status === "conflict" && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="text-sm text-red-700">
                <strong>冲突原因：</strong>
                <ul className="mt-1 list-disc list-inside">
                  <li>教师时间冲突</li>
                  <li>教室占用冲突</li>
                </ul>
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button onClick={() => onEdit(timeSlot)} className="flex-1">
              编辑课程
            </Button>
            <Button variant="outline" onClick={() => onDelete(timeSlot)} className="flex-1">
              删除课程
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
