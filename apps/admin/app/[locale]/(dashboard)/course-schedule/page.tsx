"use client"

import { useState } from "react"
import ScheduleHeader from "@/components/course-schedule/schedule-header"
import MonthlyCalendar from "@/components/course-schedule/monthly-calendar"
import DailySchedule from "@/components/course-schedule/daily-schedule"
import ClassroomSchedule from "@/components/course-schedule/classroom-schedule"
import TeacherSchedule from "@/components/course-schedule/teacher-schedule"
import ClassGroupSchedule from "@/components/course-schedule/class-group-schedule"
import CourseDetailModal from "@/components/course-schedule/course-detail-modal"
import { useSchedule } from "@/hooks/use-schedule"
import type { TimeSlot, Teacher, Classroom, ClassGroup } from "@/lib/actions/course"
import WeeklySchedule from "@/components/course-schedule/weekly-schedule"
import CreateCourseModal from "@/components/course-schedule/create-course-modal"

// 模拟数据
const mockTimeSlots: TimeSlot[] = [
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

const mockTeachers: Teacher[] = [
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

const mockClassrooms: Classroom[] = [
  {
    id: "1",
    name: "感统专注力训练区-C",
    capacity: 15,
    equipment: ["感统器材", "专注力训练设备"],
  },
  {
    id: "2",
    name: "创意工坊",
    capacity: 12,
    equipment: ["工具台", "安全设备"],
  },
]

const mockClassGroups: ClassGroup[] = [
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

export default function ScheduleManagement() {
  const {
    selectedDate,
    viewMode,
    timeViewMode,
    filters,
    selectedTimeSlot,
    setSelectedTimeSlot,
    setViewMode,
    setTimeViewMode,
    updateFilter,
    navigateDate,
    goToToday,
  } = useSchedule()

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  const handleTimeSlotClick = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot)
    setIsDetailModalOpen(true)
  }

  const handleCreateCourse = () => {
    setIsCreateModalOpen(true)
  }

  const handleCreateCourseSubmit = (courseData: any) => {
    console.log("创建课程:", courseData)
    // 这里应该调用API创建课程
    setIsCreateModalOpen(false)
  }

  const handleEditCourse = (timeSlot: TimeSlot) => {
    console.log("编辑课程:", timeSlot)
    setIsDetailModalOpen(false)
  }

  const handleDeleteCourse = (timeSlot: TimeSlot) => {
    console.log("删除课程:", timeSlot)
    setIsDetailModalOpen(false)
  }

  const renderScheduleView = () => {
    // 当viewMode为"monthly"时，根据timeViewMode决定具体展示哪种视图
    if (viewMode === "monthly") {
      switch (timeViewMode) {
        case "day":
          return (
            <DailySchedule
              selectedDate={selectedDate}
              timeSlots={mockTimeSlots}
              onTimeSlotClick={handleTimeSlotClick}
            />
          )
        case "week":
          return (
            <WeeklySchedule
              selectedDate={selectedDate}
              timeSlots={mockTimeSlots}
              onTimeSlotClick={handleTimeSlotClick}
            />
          )
        case "month":
          return (
            <MonthlyCalendar
              selectedDate={selectedDate}
              timeSlots={mockTimeSlots}
              onTimeSlotClick={handleTimeSlotClick}
            />
          )
        default:
          return (
            <MonthlyCalendar
              selectedDate={selectedDate}
              timeSlots={mockTimeSlots}
              onTimeSlotClick={handleTimeSlotClick}
            />
          )
      }
    }

    // 其他视图模式保持原有逻辑
    switch (viewMode) {
      case "classroom":
        return (
          <ClassroomSchedule
            selectedDate={selectedDate}
            timeSlots={mockTimeSlots}
            classrooms={mockClassrooms}
            onTimeSlotClick={handleTimeSlotClick}
          />
        )
      case "teacher":
        return (
          <TeacherSchedule
            selectedDate={selectedDate}
            timeSlots={mockTimeSlots}
            teachers={mockTeachers}
            onTimeSlotClick={handleTimeSlotClick}
          />
        )
      case "classGroup":
        return (
          <ClassGroupSchedule
            selectedDate={selectedDate}
            timeSlots={mockTimeSlots}
            classGroups={mockClassGroups}
            onTimeSlotClick={handleTimeSlotClick}
          />
        )
      default:
        return (
          <MonthlyCalendar
            selectedDate={selectedDate}
            timeSlots={mockTimeSlots}
            onTimeSlotClick={handleTimeSlotClick}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ScheduleHeader
        selectedDate={selectedDate}
        viewMode={viewMode}
        timeViewMode={timeViewMode}
        filters={filters}
        onViewModeChange={setViewMode}
        onTimeViewModeChange={setTimeViewMode}
        onFilterChange={updateFilter}
        onNavigateDate={navigateDate}
        onGoToToday={goToToday}
        onCreateCourse={handleCreateCourse}
      />

      <div className="p-4">{renderScheduleView()}</div>

      <CourseDetailModal
        timeSlot={selectedTimeSlot}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onEdit={handleEditCourse}
        onDelete={handleDeleteCourse}
      />

      <CreateCourseModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateCourseSubmit}
      />
    </div>
  )
}
