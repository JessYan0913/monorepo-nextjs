"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@repo/ui/components/ui/dialog"
import { Button } from "@repo/ui/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/ui/radio-group"
import { Label } from "@repo/ui/components/ui/label"
import { Plus, X } from "lucide-react"

interface CreateCourseModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (courseData: any) => void
}

interface CourseScheduleItem {
  id: string
  type: string
  date: string
  time: string
}

export default function CreateCourseModal({ isOpen, onClose, onSubmit }: CreateCourseModalProps) {
  const [courseType, setCourseType] = useState("private")
  const [courseName, setCourseName] = useState("")
  const [teacher, setTeacher] = useState("")
  const [assistantTeacher, setAssistantTeacher] = useState("")
  const [classroom, setClassroom] = useState("")
  const [classLevel, setClassLevel] = useState("")
  const [students, setStudents] = useState<string[]>([])
  const [scheduleItems, setScheduleItems] = useState<CourseScheduleItem[]>([])

  const handleSubmit = () => {
    const courseData = {
      courseType,
      courseName,
      teacher,
      assistantTeacher,
      classroom,
      classLevel,
      students,
      scheduleItems,
    }
    onSubmit(courseData)
    onClose()
  }

  const handleAddStudent = () => {
    // 这里应该打开学员选择弹窗
    console.log("添加学员")
  }

  const handleAddSchedule = () => {
    const newItem: CourseScheduleItem = {
      id: Date.now().toString(),
      type: "新增课时",
      date: "",
      time: "",
    }
    setScheduleItems([...scheduleItems, newItem])
  }

  const handleRemoveSchedule = (id: string) => {
    setScheduleItems(scheduleItems.filter((item) => item.id !== id))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-medium">新建排课</DialogTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-6 p-6">
          {/* 排课类型 */}
          <div className="space-y-3">
            <div className="flex items-center gap-1">
              <span className="text-red-500">*</span>
              <Label className="text-sm font-medium">排课类型:</Label>
            </div>
            <RadioGroup value={courseType} onValueChange={setCourseType} className="flex gap-6">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="private" id="private" />
                <Label htmlFor="private" className="text-sm">
                  私教课(一对一)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="group" id="group" />
                <Label htmlFor="group" className="text-sm">
                  团体课(一对多)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="appointment" id="appointment" />
                <Label htmlFor="appointment" className="text-sm">
                  预约课
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* 课程名称 */}
          <div className="space-y-3">
            <div className="flex items-center gap-1">
              <span className="text-red-500">*</span>
              <Label className="text-sm font-medium">课程名称:</Label>
            </div>
            <Select value={courseName} onValueChange={setCourseName}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="- 选择课程 -" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="psychology">儿童心理沙盘</SelectItem>
                <SelectItem value="woodwork">木工坊</SelectItem>
                <SelectItem value="sensory">感统综合专注力</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 授课教师 */}
          <div className="space-y-3">
            <div className="flex items-center gap-1">
              <span className="text-red-500">*</span>
              <Label className="text-sm font-medium">授课教师:</Label>
            </div>
            <Select value={teacher} onValueChange={setTeacher}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="- 选择教师 -" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="teacher1">张老师</SelectItem>
                <SelectItem value="teacher2">李老师</SelectItem>
                <SelectItem value="teacher3">王老师</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 助理教师 */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">助理教师:</Label>
            <Select value={assistantTeacher} onValueChange={setAssistantTeacher}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="已选中 0" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="assistant1">助教A</SelectItem>
                <SelectItem value="assistant2">助教B</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 授课教室 */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">授课教室:</Label>
            <Select value={classroom} onValueChange={setClassroom}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="- 选择教室 -" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="room1">教室A-101</SelectItem>
                <SelectItem value="room2">教室B-102</SelectItem>
                <SelectItem value="room3">感统专注力训练区-C</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 班级 */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">班级:</Label>
            <Select value={classLevel} onValueChange={setClassLevel}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="- 选择班级 -" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="class1">火星V6班</SelectItem>
                <SelectItem value="class2">火星V5班</SelectItem>
                <SelectItem value="class3">初级班</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 上课学员 */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">上课学员:</Label>
            <div className="border border-gray-200 rounded-lg p-4 min-h-20">
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddStudent}
                className="text-blue-500 border-blue-500 hover:bg-blue-50 bg-transparent"
              >
                <Plus className="w-4 h-4 mr-1" />
                添加学员
              </Button>
              {students.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {students.map((student, index) => (
                    <div key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {student}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 课时安排 */}
          <div className="space-y-3">
            <div className="flex items-center gap-1">
              <span className="text-red-500">*</span>
              <Label className="text-sm font-medium">课时安排:</Label>
            </div>
            <div className="space-y-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddSchedule}
                className="text-blue-500 border-blue-500 hover:bg-blue-50 bg-transparent"
              >
                新增课时
              </Button>

              {/* 课时表格 */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="grid grid-cols-4 bg-gray-50 border-b">
                  <div className="p-3 text-sm font-medium text-gray-700 border-r">类型</div>
                  <div className="p-3 text-sm font-medium text-gray-700 border-r">日期</div>
                  <div className="p-3 text-sm font-medium text-gray-700 border-r">时间</div>
                  <div className="p-3 text-sm font-medium text-gray-700">操作</div>
                </div>

                {scheduleItems.length === 0 ? (
                  <div className="p-8 text-center text-gray-500 text-sm">暂无课时安排</div>
                ) : (
                  scheduleItems.map((item) => (
                    <div key={item.id} className="grid grid-cols-4 border-b last:border-b-0">
                      <div className="p-3 text-sm border-r">{item.type}</div>
                      <div className="p-3 text-sm border-r">
                        <input
                          type="date"
                          className="w-full border-0 outline-none text-sm"
                          value={item.date}
                          onChange={(e) => {
                            const updated = scheduleItems.map((si) =>
                              si.id === item.id ? { ...si, date: e.target.value } : si,
                            )
                            setScheduleItems(updated)
                          }}
                        />
                      </div>
                      <div className="p-3 text-sm border-r">
                        <input
                          type="time"
                          className="w-full border-0 outline-none text-sm"
                          value={item.time}
                          onChange={(e) => {
                            const updated = scheduleItems.map((si) =>
                              si.id === item.id ? { ...si, time: e.target.value } : si,
                            )
                            setScheduleItems(updated)
                          }}
                        />
                      </div>
                      <div className="p-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveSchedule(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          删除
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="flex justify-end gap-3 p-6 border-t">
          <Button variant="outline" onClick={onClose}>
            取消
          </Button>
          <Button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600">
            确定
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
