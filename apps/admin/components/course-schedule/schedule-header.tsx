"use client"

import { Button } from "@repo/ui/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"
import { Input } from "@repo/ui/components/ui/input"
import { Calendar, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import type { ScheduleFilter, ViewMode, TimeViewMode } from "@/lib/actions/course"

interface ScheduleHeaderProps {
  selectedDate: Date
  viewMode: ViewMode
  timeViewMode: TimeViewMode
  filters: ScheduleFilter
  onViewModeChange: (mode: ViewMode) => void
  onTimeViewModeChange: (mode: TimeViewMode) => void
  onFilterChange: (key: keyof ScheduleFilter, value: string) => void
  onNavigateDate: (direction: "prev" | "next") => void
  onGoToToday: () => void
  onCreateCourse: () => void
}

export default function ScheduleHeader({
  selectedDate,
  viewMode,
  timeViewMode,
  filters,
  onViewModeChange,
  onTimeViewModeChange,
  onFilterChange,
  onNavigateDate,
  onGoToToday,
  onCreateCourse,
}: ScheduleHeaderProps) {
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
    <div className="bg-white border-b border-gray-200 p-4">
      {/* 主要操作栏 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button onClick={onCreateCourse} className="bg-blue-500 hover:bg-blue-600">
            <Plus className="w-4 h-4 mr-1" />
            新增排课
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            导入
          </Button>
        </div>

        {/* 筛选器 */}
        <div className="flex items-center gap-2">
          <Select value={filters.courseType} onValueChange={(value) => onFilterChange("courseType", value)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="课程类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部类型</SelectItem>
              <SelectItem value="regular">常规课程</SelectItem>
              <SelectItem value="special">特色课程</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.examStatus} onValueChange={(value) => onFilterChange("examStatus", value)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="考勤状态" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部状态</SelectItem>
              <SelectItem value="normal">正常</SelectItem>
              <SelectItem value="absent">缺勤</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.courseCategory} onValueChange={(value) => onFilterChange("courseCategory", value)}>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="课程" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              <SelectItem value="math">数学</SelectItem>
              <SelectItem value="english">英语</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.teacher} onValueChange={(value) => onFilterChange("teacher", value)}>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="教师" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              <SelectItem value="teacher1">张老师</SelectItem>
              <SelectItem value="teacher2">李老师</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.grade} onValueChange={(value) => onFilterChange("grade", value)}>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="班级" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              <SelectItem value="grade1">一年级</SelectItem>
              <SelectItem value="grade2">二年级</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.classroom} onValueChange={(value) => onFilterChange("classroom", value)}>
            <SelectTrigger className="w-24">
              <SelectValue placeholder="教室" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部</SelectItem>
              <SelectItem value="room1">教室1</SelectItem>
              <SelectItem value="room2">教室2</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="学员卡号/姓名/电话"
            className="w-40"
            value={filters.studentCard || ""}
            onChange={(e) => onFilterChange("studentCard", e.target.value)}
          />

          <Button className="bg-orange-500 hover:bg-orange-600">查询</Button>
        </div>
      </div>

      {/* 视图切换和日期导航 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Button
            variant={viewMode === "monthly" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("monthly")}
          >
            时间课表
          </Button>
          <Button
            variant={viewMode === "teacher" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("teacher")}
          >
            老师课表
          </Button>
          <Button
            variant={viewMode === "classroom" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("classroom")}
          >
            教室课表
          </Button>
          <Button
            variant={viewMode === "classGroup" ? "default" : "ghost"}
            size="sm"
            onClick={() => onViewModeChange("classGroup")}
          >
            班级课表
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Button
              variant={timeViewMode === "day" ? "default" : "ghost"}
              size="sm"
              onClick={() => onTimeViewModeChange("day")}
            >
              日
            </Button>
            <Button
              variant={timeViewMode === "week" ? "default" : "ghost"}
              size="sm"
              onClick={() => onTimeViewModeChange("week")}
            >
              周
            </Button>
            <Button
              variant={timeViewMode === "month" ? "default" : "ghost"}
              size="sm"
              onClick={() => onTimeViewModeChange("month")}
            >
              月
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => onNavigateDate("prev")}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium min-w-32 text-center">{formatDate()}</span>
            <Button variant="outline" size="sm" onClick={() => onNavigateDate("next")}>
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={onGoToToday}>
              回到今天
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-blue-500">未预约</span>
            <span className="text-green-500">未考勤</span>
            <span className="text-red-500">已考勤</span>
          </div>
        </div>
      </div>
    </div>
  )
}
