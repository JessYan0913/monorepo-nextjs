"use client"

import { useMemo } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar"
import CourseCard from "./course-card"
import type { TimeSlot, Teacher } from "@/lib/actions/course"

interface TeacherScheduleProps {
  selectedDate: Date
  timeSlots: TimeSlot[]
  teachers: Teacher[]
  onTimeSlotClick: (timeSlot: TimeSlot) => void
}

export default function TeacherSchedule({ selectedDate, timeSlots, teachers, onTimeSlotClick }: TeacherScheduleProps) {
  const scheduleByTeacher = useMemo(() => {
    const schedule: { [teacherId: string]: { [day: string]: TimeSlot[] } } = {}

    timeSlots.forEach((slot) => {
      if (!slot.teacherId) return

      if (!schedule[slot.teacherId]) {
        schedule[slot.teacherId] = {}
      }

      const day = "monday" // 简化处理
      if (!schedule[slot.teacherId][day]) {
        schedule[slot.teacherId][day] = []
      }

      schedule[slot.teacherId][day].push(slot)
    })

    return schedule
  }, [timeSlots])

  const weekDays = [
    { key: "monday", label: "周一(07.07)" },
    { key: "tuesday", label: "周二(07.08)" },
    { key: "wednesday", label: "周三(07.09)" },
    { key: "thursday", label: "周四(07.10)" },
    { key: "friday", label: "周五(07.11)" },
    { key: "saturday", label: "周六(07.12)" },
    { key: "sunday", label: "周日(07.13)" },
  ]

  return (
    <div className="bg-white">
      <div className="grid grid-cols-8 border-b">
        <div className="p-4 font-medium text-gray-700 border-r">老师</div>
        {weekDays.map((day) => (
          <div key={day.key} className="p-4 text-center font-medium text-gray-700 border-r last:border-r-0">
            {day.label}
          </div>
        ))}
      </div>

      {teachers.map((teacher) => (
        <div key={teacher.id} className="grid grid-cols-8 border-b">
          <div className="p-4 border-r bg-gray-50">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={teacher.avatar || "/placeholder.svg"} />
                <AvatarFallback>{teacher.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-sm">{teacher.name}</div>
                <div className="text-xs text-gray-500">{teacher.specialties.join(", ")}</div>
              </div>
            </div>
          </div>
          {weekDays.map((day) => (
            <div key={day.key} className="p-2 border-r last:border-r-0 min-h-32">
              <div className="space-y-1">
                {scheduleByTeacher[teacher.id]?.[day.key]?.map((timeSlot) => (
                  <CourseCard key={timeSlot.id} timeSlot={timeSlot} onClick={() => onTimeSlotClick(timeSlot)} compact />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
