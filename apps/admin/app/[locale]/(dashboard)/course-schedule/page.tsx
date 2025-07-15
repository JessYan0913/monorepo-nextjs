"use client"

import { useState, useCallback } from "react"
import ScheduleHeader from "@/components/course-schedule/schedule-header"
import TimeSchedule from "@/components/course-schedule/time-schedule"
import ClassroomSchedule from "@/components/course-schedule/classroom-schedule"
import TeacherSchedule from "@/components/course-schedule/teacher-schedule"
import ClassGroupSchedule from "@/components/course-schedule/class-group-schedule"
import CourseDetailModal from "@/components/course-schedule/course-detail-modal"
import type { TimeSlot, ScheduleFilter } from "@/lib/actions/course"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@repo/ui/components/ui/tabs"

export default function ScheduleManagement() {
  const [filters, setFilters] = useState<ScheduleFilter>({})
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null)

  const updateFilter = useCallback((key: keyof ScheduleFilter, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }, [])

  const clearFilters = useCallback(() => {
    setFilters({})
  }, [])

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  const handleTimeSlotClick = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot)
    setIsDetailModalOpen(true)
  }

  const handleEditCourse = (timeSlot: TimeSlot) => {
    console.log("编辑课程:", timeSlot)
    setIsDetailModalOpen(false)
  }

  const handleDeleteCourse = (timeSlot: TimeSlot) => {
    console.log("删除课程:", timeSlot)
    setIsDetailModalOpen(false)
  }

  return (
    <div className="min-h-screen">
      <ScheduleHeader
        filters={filters}
        onFilterChange={updateFilter}
      />

      <Tabs defaultValue="time">
        <TabsList>
          <TabsTrigger value="time">时间课表</TabsTrigger>
          <TabsTrigger value="teacher">教师课表</TabsTrigger>
          <TabsTrigger value="classroom">教室课表</TabsTrigger>
          <TabsTrigger value="classGroup">班级课表</TabsTrigger>
        </TabsList>
        <TabsContent value="time">
          <TimeSchedule onTimeSlotClick={handleTimeSlotClick} />
        </TabsContent>
        <TabsContent value="teacher">
          <TeacherSchedule onTimeSlotClick={handleTimeSlotClick} />
        </TabsContent>
        <TabsContent value="classroom">
          <ClassroomSchedule onTimeSlotClick={handleTimeSlotClick} />
        </TabsContent>
        <TabsContent value="classGroup">
          <ClassGroupSchedule onTimeSlotClick={handleTimeSlotClick} />
        </TabsContent>
      </Tabs>

      <CourseDetailModal
        timeSlot={selectedTimeSlot}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onEdit={handleEditCourse}
        onDelete={handleDeleteCourse}
      />
    </div>
  )
}
