"use client"

import { useMemo } from "react"
import CourseCard from "./course-card"
import type { TimeSlot } from "@/lib/actions/course"

const timeSlots: TimeSlot[] = [
  {
    id: "1",
    startTime: "09:30",
    endTime: "10:30",
    courseId: "1",
    course: {
      id: "1",
      name: "儿童心理沙盘",
      type: "单人",
      ageGroup: "3-6岁",
      duration: 60,
      color: "orange",
      status: "scheduled",
    },
    teacherId: "1",
    classroomId: "1",
    classGroupId: "1",
    studentCount: 8,
    maxStudents: 10,
  },
  {
    id: "2",
    startTime: "10:40",
    endTime: "11:40",
    courseId: "2",
    course: {
      id: "2",
      name: "木工坊",
      type: "小组",
      ageGroup: "7-12岁",
      duration: 60,
      color: "red",
      status: "conflict",
    },
    teacherId: "2",
    classroomId: "2",
    studentCount: 12,
    maxStudents: 10,
  },
]

interface DailyScheduleProps {
  onTimeSlotClick: (timeSlot: TimeSlot) => void
}

export default function DailySchedule({ onTimeSlotClick }: DailyScheduleProps) {
  const timeSlotsByHour = useMemo(() => {
    const slots: { [hour: string]: TimeSlot[] } = {}

    timeSlots.forEach((slot) => {
      const hour = slot.startTime.split(":")[0]
      if (!slots[hour]) slots[hour] = []
      slots[hour].push(slot)
    })

    return slots
  }, [timeSlots])

  const hours = Array.from({ length: 16 }, (_, i) => i + 7) // 7:00 - 22:00

  return (
    <div className="bg-white">
      <div className="flex border-b bg-gray-50">
        <div className="w-20 p-4 font-medium text-gray-700 border-r">时间</div>
        <div className="flex-1 p-4 text-center font-medium text-gray-700">
          {new Date().toLocaleDateString("zh-CN", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "long",
          })}
        </div>
      </div>

      {hours.map((hour) => (
        <div key={hour} className="flex border-b min-h-20">
          <div className="w-20 p-2 border-r text-sm text-gray-600 flex items-center justify-center bg-gray-50">
            {hour}:00
          </div>
          <div className="flex-1 p-2">
            <div className="space-y-1">
              {timeSlotsByHour[hour.toString()]?.map((timeSlot) => (
                <CourseCard key={timeSlot.id} timeSlot={timeSlot} onClick={() => onTimeSlotClick(timeSlot)} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
