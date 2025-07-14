"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@repo/ui/components/ui/dialog"
import { Button } from "@repo/ui/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/ui/radio-group"
import { Label } from "@repo/ui/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form"
import { Input } from "@repo/ui/components/ui/input"
import { Badge } from "@repo/ui/components/ui/badge"
import { Plus, X, Save } from "lucide-react"

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

const courseScheduleSchema = z.object({
  courseType: z.enum(["private", "group", "appointment"], {
    required_error: "请选择排课类型",
  }),
  courseName: z.string({
    required_error: "请选择课程名称",
  }),
  teacher: z.string({
    required_error: "请选择授课教师",
  }),
  assistantTeacher: z.string().optional(),
  classroom: z.string().optional(),
  classLevel: z.string().optional(),
  students: z.array(z.string()).optional(),
  scheduleItems: z.array(
    z.object({
      id: z.string(),
      type: z.string(),
      date: z.string({
        required_error: "请选择日期",
      }),
      time: z.string({
        required_error: "请选择时间",
      }),
    }),
    {
      required_error: "请添加至少一个课时",
    }
  ),
})

type CourseFormValues = z.infer<typeof courseScheduleSchema>

export default function CreateCourseModal({ isOpen, onClose, onSubmit }: CreateCourseModalProps) {
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseScheduleSchema),
    defaultValues: {
      courseType: "private",
      courseName: "",
      teacher: "",
      assistantTeacher: "",
      classroom: "",
      classLevel: "",
      students: [],
      scheduleItems: [],
    },
  })
  
  const { control, handleSubmit, watch, setValue } = form
  const scheduleItems = watch("scheduleItems") || []
  const students = watch("students") || []

  const handleAddStudent = () => {
    // 这里应该打开学员选择弹窗
    console.log("添加学员")
    // 示例：添加一个测试学员
    setValue("students", [...students, `学员${students.length + 1}`])
  }

  const handleRemoveStudent = (index: number) => {
    const newStudents = [...students]
    newStudents.splice(index, 1)
    setValue("students", newStudents)
  }

  const handleAddSchedule = () => {
    const newItem: CourseScheduleItem = {
      id: Date.now().toString(),
      type: "新增课时",
      date: "",
      time: "",
    }
    setValue("scheduleItems", [...scheduleItems, newItem])
  }

  const handleRemoveSchedule = (id: string) => {
    setValue(
      "scheduleItems", 
      scheduleItems.filter((item) => item.id !== id)
    )
  }
  
  const onSubmitForm = (data: CourseFormValues) => {
    onSubmit(data)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent showCloseButton={false} className="max-w-8xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-medium">新建排课</DialogTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6 p-6">
            {/* 排课类型 */}
            <FormField
              control={control}
              name="courseType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel className="flex items-center gap-1">
                    <span className="text-destructive">*</span>
                    排课类型
                  </FormLabel>
                  <FormControl>
                    <RadioGroup 
                      value={field.value} 
                      onValueChange={field.onChange} 
                      className="flex gap-6"
                    >
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 课程名称 */}
            <FormField
              control={control}
              name="courseName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <span className="text-destructive">*</span>
                    课程名称
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="请输入课程名称" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 授课教师 */}
            <FormField
              control={control}
              name="teacher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    <span className="text-destructive">*</span>
                    授课教师
                  </FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="请选择授课教师" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="teacher1">教师1</SelectItem>
                        <SelectItem value="teacher2">教师2</SelectItem>
                        <SelectItem value="teacher3">教师3</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 助教 */}
            <FormField
              control={control}
              name="assistantTeacher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>助教</FormLabel>
                  <FormControl>
                    <Select value={field.value || ""} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="请选择助教" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="assistant1">助教1</SelectItem>
                        <SelectItem value="assistant2">助教2</SelectItem>
                        <SelectItem value="assistant3">助教3</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 教室 */}
            <FormField
              control={control}
              name="classroom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>教室</FormLabel>
                  <FormControl>
                    <Select value={field.value || ""} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="请选择教室" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="classroom1">教室1</SelectItem>
                        <SelectItem value="classroom2">教室2</SelectItem>
                        <SelectItem value="classroom3">教室3</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 班级 */}
            <FormField
              control={control}
              name="classLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>班级</FormLabel>
                  <FormControl>
                    <Select value={field.value || ""} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="请选择班级" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="class1">班级1</SelectItem>
                        <SelectItem value="class2">班级2</SelectItem>
                        <SelectItem value="class3">班级3</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 学员 */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <FormLabel>学员</FormLabel>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={handleAddStudent}
                  className="flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  添加学员
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {students.map((student, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {student}
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => handleRemoveStudent(index)} 
                    />
                  </Badge>
                ))}
              </div>
            </div>

            {/* 课时安排 */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <FormLabel>课时安排</FormLabel>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={handleAddSchedule}
                  className="flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" />
                  添加课时
                </Button>
              </div>
              <div className="space-y-4">
                {scheduleItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border rounded-md">
                    <div className="flex-1">
                      <Input 
                        placeholder="课时类型" 
                        value={item.type}
                        onChange={(e) => {
                          const newItems = scheduleItems.map((i) => 
                            i.id === item.id ? { ...i, type: e.target.value } : i
                          )
                          setValue("scheduleItems", newItems)
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <Input 
                        type="date" 
                        placeholder="日期" 
                        value={item.date}
                        onChange={(e) => {
                          const newItems = scheduleItems.map((i) => 
                            i.id === item.id ? { ...i, date: e.target.value } : i
                          )
                          setValue("scheduleItems", newItems)
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <Input 
                        type="time" 
                        placeholder="时间" 
                        value={item.time}
                        onChange={(e) => {
                          const newItems = scheduleItems.map((i) => 
                            i.id === item.id ? { ...i, time: e.target.value } : i
                          )
                          setValue("scheduleItems", newItems)
                        }}
                      />
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRemoveSchedule(item.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                取消
              </Button>
              <Button type="submit" className="flex items-center gap-1">
                <Save className="w-4 h-4" />
                保存
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
