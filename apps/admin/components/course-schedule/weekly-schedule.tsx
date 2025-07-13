"use client"

import { useMemo } from "react"
import CourseCard from "./course-card"
import type { TimeSlot } from "@/lib/actions/course"

interface WeeklyScheduleProps {
  selectedDate: Date
  timeSlots: TimeSlot[]
  onTimeSlotClick: (timeSlot: TimeSlot) => void
}

export default function WeeklySchedule({ selectedDate, timeSlots, onTimeSlotClick }: WeeklyScheduleProps) {
  const { weekDays, timeSlotsByDayAndHour } = useMemo(() => {
    // 获取当前周的开始日期（周一）
    const startOfWeek = new Date(selectedDate)
    const day = startOfWeek.getDay()
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1)
    startOfWeek.setDate(diff)

    // 生成一周的日期
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      return {
        date,
        label: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"][i],
        dateStr: `${date.getMonth() + 1}.${String(date.getDate()).padStart(2, "0")}`,
      }
    })

    // 按日期和小时组织时间段
    const slotsByDayAndHour: { [dayIndex: number]: { [hour: number]: TimeSlot[] } } = {}

    timeSlots.forEach((slot) => {
      // 这里需要根据实际的时间段数据结构来解析日期
      // 假设可以从slot中获取日期信息
      const slotDate = new Date() // 简化处理，实际应该从slot中获取
      const dayIndex = slotDate.getDay() === 0 ? 6 : slotDate.getDay() - 1 // 转换为周一=0的索引
      const hour = Number.parseInt(slot.startTime.split(":")[0])

      if (!slotsByDayAndHour[dayIndex]) {
        slotsByDayAndHour[dayIndex] = {}
      }
      if (!slotsByDayAndHour[dayIndex][hour]) {
        slotsByDayAndHour[dayIndex][hour] = []
      }
      slotsByDayAndHour[dayIndex][hour].push(slot)
    })

    return {
      weekDays: days,
      timeSlotsByDayAndHour: slotsByDayAndHour,
    }
  }, [selectedDate, timeSlots])

  // 生成7:00到22:00的时间段
  const hours = Array.from({ length: 16 }, (_, i) => i + 7) // 7:00 - 22:00

  return (
    <div className="bg-white">
      {/* 表头 */}
      <div className="grid grid-cols-8 border-b bg-gray-50">
        <div className="p-4 font-medium text-gray-700 border-r">时间</div>
        {weekDays.map((day, index) => (
          <div key={index} className="p-4 text-center font-medium text-gray-700 border-r last:border-r-0">
            <div>{day.label}</div>
            <div className="text-xs text-gray-500 mt-1">({day.dateStr})</div>
          </div>
        ))}
      </div>

      {/* 时间网格 */}
      {hours.map((hour) => (
        <div key={hour} className="grid grid-cols-8 border-b min-h-20">
          <div className="p-4 border-r text-sm text-gray-600 flex items-center bg-gray-50">{hour}:00</div>
          {weekDays.map((_, dayIndex) => (
            <div key={dayIndex} className="p-2 border-r last:border-r-0 min-h-20">
              <div className="space-y-1">
                {timeSlotsByDayAndHour[dayIndex]?.[hour]?.map((timeSlot) => (
                  <CourseCard
                    key={timeSlot.id}
                    timeSlot={timeSlot}
                    onClick={() => onTimeSlotClick(timeSlot)}
                    showTime={false}
                    compact
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
