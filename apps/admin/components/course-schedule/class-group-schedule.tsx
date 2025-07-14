"use client"

import { useMemo } from "react"
import CourseCard from "./course-card"
import type { TimeSlot, ClassGroup } from "@/lib/actions/course"

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

const classGroups: ClassGroup[] = [
  {
    id: "1",
    name: "火星V6班",
    level: "高级",
    studentCount: 10,
  },
  {
    id: "2",
    name: "火星V5班",
    level: "中级",
    studentCount: 8,
  },
]

interface ClassGroupScheduleProps {
  onTimeSlotClick: (timeSlot: TimeSlot) => void
}

export default function ClassGroupSchedule({
  onTimeSlotClick,
}: ClassGroupScheduleProps) {
  const scheduleByClassGroup = useMemo(() => {
    const schedule: { [classGroupId: string]: { [day: string]: TimeSlot[] } } = {}

    timeSlots.forEach((slot) => {
      if (!slot.classGroupId) return

      if (!schedule[slot.classGroupId]) {
        schedule[slot.classGroupId] = {}
      }

      const day = "monday" // 简化处理
      if (!schedule[slot.classGroupId][day]) {
        schedule[slot.classGroupId][day] = []
      }

      schedule[slot.classGroupId][day].push(slot)
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
        <div className="p-4 font-medium text-gray-700 border-r">班级</div>
        {weekDays.map((day) => (
          <div key={day.key} className="p-4 text-center font-medium text-gray-700 border-r last:border-r-0">
            {day.label}
          </div>
        ))}
      </div>

      {classGroups.map((classGroup) => (
        <div key={classGroup.id} className="grid grid-cols-8 border-b">
          <div className="p-4 border-r bg-gray-50">
            <div className="font-medium text-sm">{classGroup.name}</div>
            <div className="text-xs text-gray-500 mt-1">
              {classGroup.level} · {classGroup.studentCount}人
            </div>
          </div>
          {weekDays.map((day) => (
            <div key={day.key} className="p-2 border-r last:border-r-0 min-h-32">
              <div className="space-y-1">
                {scheduleByClassGroup[classGroup.id]?.[day.key]?.map((timeSlot) => (
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
