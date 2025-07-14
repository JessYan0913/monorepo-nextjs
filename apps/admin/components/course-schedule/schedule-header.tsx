"use client"

import { Button } from "@repo/ui/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"
import { Input } from "@repo/ui/components/ui/input"
import { Plus } from "lucide-react"
import type { ScheduleFilter } from "@/lib/actions/course"

interface ScheduleHeaderProps {
  filters: ScheduleFilter
  onFilterChange: (key: keyof ScheduleFilter, value: string) => void
  onCreateCourse: () => void
}

export default function ScheduleHeader({
  filters,
  onFilterChange,
  onCreateCourse,
}: ScheduleHeaderProps) {

  return (
    <div className="bg-white p-4">
      {/* 主要操作栏 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button onClick={onCreateCourse}>
            <Plus className="w-4 h-4 mr-1" />
            新增排课
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

          <Button>查询</Button>
        </div>
      </div>
    </div>
  )
}
