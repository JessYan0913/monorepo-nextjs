"use client"

import { Button } from "@repo/ui/components/ui/button"
import { MoreHorizontal, AlertCircle } from "lucide-react"
import { cn } from "@repo/ui/lib/utils"
import type { TimeSlot } from "@/lib/actions/course"

interface CourseCardProps {
  timeSlot: TimeSlot
  onClick?: () => void
  className?: string
  showTime?: boolean
  compact?: boolean
}

export default function CourseCard({
  timeSlot,
  onClick,
  className,
  showTime = true,
  compact = false,
}: CourseCardProps) {
  const { course, startTime, endTime, studentCount, maxStudents } = timeSlot

  if (!course) return null

  const getStatusColor = () => {
    switch (course.status) {
      case "conflict":
        return "border-red-300 bg-red-50 text-red-700"
      case "cancelled":
        return "border-gray-300 bg-gray-50 text-gray-500"
      default:
        return "border-orange-300 bg-orange-50 text-orange-700"
    }
  }

  const isOverCapacity = studentCount && maxStudents && studentCount > maxStudents

  return (
    <div
      className={cn(
        "relative border rounded-lg p-2 cursor-pointer hover:shadow-md transition-shadow",
        getStatusColor(),
        compact && "p-1",
        className,
      )}
      onClick={onClick}
    >
      {course.status === "conflict" && <AlertCircle className="absolute top-1 left-1 w-3 h-3 text-red-500" />}

      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className={cn("font-medium truncate", compact && "text-xs")}>{course.name}</div>

          {course.ageGroup && (
            <div className={cn("text-xs text-gray-600 mt-1", compact && "text-xs")}>({course.ageGroup})</div>
          )}

          {showTime && (
            <div className={cn("text-xs text-gray-500 mt-1", compact && "text-xs")}>
              {startTime}-{endTime}
            </div>
          )}

          {studentCount !== undefined && maxStudents && (
            <div
              className={cn("text-xs mt-1", isOverCapacity ? "text-red-600" : "text-gray-600", compact && "text-xs")}
            >
              当前{studentCount}人/满班{maxStudents}人
            </div>
          )}
        </div>

        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <MoreHorizontal className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
}
