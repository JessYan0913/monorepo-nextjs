"use client"

import { useMemo } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui/components/ui/avatar"
import CourseCard from "./course-card"
import type { TimeSlot, Teacher } from "@/lib/actions/course"

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

const teachers: Teacher[] = [
  {
    id: "1",
    name: "小江老师",
    avatar: "/placeholder.svg?height=32&width=32",
    specialties: ["心理沙盘", "儿童心理"],
  },
  {
    id: "2",
    name: "李老师",
    specialties: ["手工制作", "创意思维"],
  },
]

interface TeacherScheduleProps {
  onTimeSlotClick: (timeSlot: TimeSlot) => void
}

export default function TeacherSchedule({ onTimeSlotClick }: TeacherScheduleProps) {
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
