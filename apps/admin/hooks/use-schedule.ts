"use client"

import { useState, useCallback } from "react"
import type { TimeSlot, ScheduleFilter, ViewMode, TimeViewMode } from "@/lib/actions/course"

export function useSchedule() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<ViewMode>("monthly")
  const [timeViewMode, setTimeViewMode] = useState<TimeViewMode>("month")
  const [filters, setFilters] = useState<ScheduleFilter>({})
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null)

  const updateFilter = useCallback((key: keyof ScheduleFilter, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }, [])

  const clearFilters = useCallback(() => {
    setFilters({})
  }, [])

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

  return {
    selectedDate,
    setSelectedDate,
    viewMode,
    setViewMode,
    timeViewMode,
    setTimeViewMode,
    filters,
    updateFilter,
    clearFilters,
    selectedTimeSlot,
    setSelectedTimeSlot,
    navigateDate,
    goToToday,
  }
}
