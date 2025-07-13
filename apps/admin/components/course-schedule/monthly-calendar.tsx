"use client"

import { useMemo } from "react"
import CourseCard from "./course-card"
import type { TimeSlot } from "@/lib/actions/course"

interface MonthlyCalendarProps {
  selectedDate: Date
  timeSlots: TimeSlot[]
  onTimeSlotClick: (timeSlot: TimeSlot) => void
}

export default function MonthlyCalendar({ selectedDate, timeSlots, onTimeSlotClick }: MonthlyCalendarProps) {
  const { calendarDays, weekDays } = useMemo(() => {
    const year = selectedDate.getFullYear()
    const month = selectedDate.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const current = new Date(startDate)

    for (let i = 0; i < 42; i++) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }

    return {
      calendarDays: days,
      weekDays: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
    }
  }, [selectedDate])

  const getTimeSlotsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return timeSlots.filter((slot) => {
      // 假设 timeSlot 有 date 字段
      return slot.id.includes(dateStr)
    })
  }

  return (
    <div className="bg-white">
      {/* 星期标题 */}
      <div className="grid grid-cols-7 border-b">
        {weekDays.map((day) => (
          <div key={day} className="p-4 text-center font-medium text-gray-700 border-r last:border-r-0">
            {day}
          </div>
        ))}
      </div>

      {/* 日历网格 */}
      <div className="grid grid-cols-7">
        {calendarDays.map((date, index) => {
          const dayTimeSlots = getTimeSlotsForDate(date)
          const isCurrentMonth = date.getMonth() === selectedDate.getMonth()
          const isToday = date.toDateString() === new Date().toDateString()

          return (
            <div
              key={index}
              className={`min-h-32 p-2 border-r border-b last:border-r-0 ${!isCurrentMonth ? "bg-gray-50" : ""}`}
            >
              <div
                className={`text-sm mb-2 ${
                  isToday ? "font-bold text-blue-600" : !isCurrentMonth ? "text-gray-400" : "text-gray-700"
                }`}
              >
                {date.getDate()}
              </div>

              <div className="space-y-1">
                {dayTimeSlots.map((timeSlot) => (
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
          )
        })}
      </div>
    </div>
  )
}
