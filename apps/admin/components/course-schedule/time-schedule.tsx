"use client"

import { useState, useCallback } from "react"
import { Button } from "@repo/ui/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

import MonthlyCalendar from "./monthly-calendar";
import WeeklySchedule from "./weekly-schedule";
import DailySchedule from "./daily-schedule";
import type { TimeSlot } from "@/lib/actions/course"

interface TimeScheduleProps {
  onTimeSlotClick: (timeSlot: TimeSlot) => void
}

export default function TimeSchedule({ onTimeSlotClick }: TimeScheduleProps) {
  const [timeViewMode, setTimeViewMode] = useState("month")
  const [selectedDate, setSelectedDate] = useState(new Date())

  const navigateDate = useCallback(
    (direction: "prev" | "next") => {
      setSelectedDate((prev) => {
        const newDate = new Date(prev)
        if (timeViewMode === "day") {
          newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1))
        } else if (timeViewMode === "week") {
          newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7))
        } else {
          newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1))
        }
        return newDate
      })
    },
    [timeViewMode],
  )

  const goToToday = useCallback(() => {
    setSelectedDate(new Date())
  }, [])

  const formatDate = () => {
    if (timeViewMode === "month") {
      return `${selectedDate.getFullYear()}年${selectedDate.getMonth() + 1}月`
    } else if (timeViewMode === "week") {
      return `第${Math.ceil(selectedDate.getDate() / 7)}周 (${selectedDate.getMonth() + 1}.${selectedDate.getDate()}-${selectedDate.getMonth() + 1}.${selectedDate.getDate() + 6})`
    } else {
      return `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
    }
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-4 items-center">
        <div className="flex items-center gap-1">
          <Button
            variant={timeViewMode === "day" ? "default" : "ghost"}
            size="sm"
            onClick={() => setTimeViewMode("day")}
          >
            日
          </Button>
          <Button
            variant={timeViewMode === "week" ? "default" : "ghost"}
            size="sm"
            onClick={() => setTimeViewMode("week")}
          >
            周
          </Button>
          <Button
            variant={timeViewMode === "month" ? "default" : "ghost"}
            size="sm"
            onClick={() => setTimeViewMode("month")}
          >
            月
          </Button>
        </div>

        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" onClick={() => navigateDate("prev")}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm font-medium min-w-32 text-center">{formatDate()}</span>
          <Button variant="outline" size="sm" onClick={() => navigateDate("next")}>
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={goToToday}>
            回到今天
          </Button>
        </div>

        <div className="flex items-center justify-end gap-4 text-sm">
          <span className="text-blue-500">未预约</span>
          <span className="text-green-500">未考勤</span>
          <span className="text-red-500">已考勤</span>
        </div>
      </div>
      {timeViewMode === "month" && <MonthlyCalendar onTimeSlotClick={onTimeSlotClick} />}
      {timeViewMode === "week" && <WeeklySchedule onTimeSlotClick={onTimeSlotClick} />}
      {timeViewMode === "day" && <DailySchedule onTimeSlotClick={onTimeSlotClick} />}
    </div>
  )
}
