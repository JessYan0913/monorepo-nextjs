"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@repo/ui/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/ui/radio-group"
import { Label } from "@repo/ui/components/ui/label"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form"
import { Input } from "@repo/ui/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Plus, X, Save } from "lucide-react"
import { MultiSelect } from "@repo/ui/components/multi-select"

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

// 模拟学员数据，实际应用中应该从API获取
const studentOptions = [
  { label: "张三", value: "zhangsan" },
  { label: "李四", value: "lisi" },
  { label: "王五", value: "wangwu" },
  { label: "赵六", value: "zhaoliu" },
  { label: "钱七", value: "qianqi" },
  { label: "孙八", value: "sunba" },
  { label: "周九", value: "zhoujiu" },
  { label: "吴十", value: "wushi" },
]

export function CreateCourseForm() {
  const router = useRouter()
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

  const scheduleItems = form.watch("scheduleItems") || []

  const handleAddSchedule = () => {
    const newItem: CourseScheduleItem = {
      id: Date.now().toString(),
      type: "新增课时",
      date: "",
      time: "",
    }
    form.setValue("scheduleItems", [...scheduleItems, newItem])
  }

  const handleRemoveSchedule = (id: string) => {
    form.setValue(
      "scheduleItems", 
      scheduleItems.filter((item) => item.id !== id)
    )
  }
  
  const onSubmit = form.handleSubmit((data) => {
    console.log(data)
    router.push("/course-schedule")
  })

  const onCancel = () => {
    form.reset()
    router.back()
  }

  return (
    <Card className="overflow-hidden border border-border/50 shadow-sm transition-all hover:shadow-md">
      <CardHeader className="bg-muted/10 border-b">
        <div className="space-y-1">
          <CardTitle className="text-xl">新建排课</CardTitle>
          <CardDescription className="text-sm">创建新的课程排期和安排</CardDescription>
        </div>
      </CardHeader>
      
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 排课类型 */}
              <FormField
                control={form.control}
                name="courseType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      排课类型
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="private" id="private" />
                          <Label htmlFor="private">一对一</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="group" id="group" />
                          <Label htmlFor="group">小组课</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="appointment" id="appointment" />
                          <Label htmlFor="appointment">预约课</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 课程名称 */}
              <FormField
                control={form.control}
                name="courseName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      课程名称
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="请输入课程名称" 
                        {...field} 
                        className="focus-visible:ring-2 focus-visible:ring-primary/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 授课教师 */}
              <FormField
                control={form.control}
                name="teacher"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      授课教师
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full focus-visible:ring-2 focus-visible:ring-primary/50">
                          <SelectValue placeholder="选择授课教师" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="teacher1">张老师</SelectItem>
                          <SelectItem value="teacher2">李老师</SelectItem>
                          <SelectItem value="teacher3">王老师</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 助教 */}
              <FormField
                control={form.control}
                name="assistantTeacher"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">助教</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full focus-visible:ring-2 focus-visible:ring-primary/50">
                          <SelectValue placeholder="选择助教（可选）" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="assistant1">助教A</SelectItem>
                          <SelectItem value="assistant2">助教B</SelectItem>
                          <SelectItem value="assistant3">助教C</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 教室 */}
              <FormField
                control={form.control}
                name="classroom"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">教室</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full focus-visible:ring-2 focus-visible:ring-primary/50">
                          <SelectValue placeholder="选择教室（可选）" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="room1">教室A</SelectItem>
                          <SelectItem value="room2">教室B</SelectItem>
                          <SelectItem value="room3">教室C</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 班级 */}
              <FormField
                control={form.control}
                name="classLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">班级</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger className="w-full focus-visible:ring-2 focus-visible:ring-primary/50">
                          <SelectValue placeholder="选择班级（可选）" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="class1">班级A</SelectItem>
                          <SelectItem value="class2">班级B</SelectItem>
                          <SelectItem value="class3">班级C</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* 学员 */}
            <FormField
              control={form.control}
              name="students"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">学员</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={studentOptions}
                      selected={field.value || []}
                      onChange={field.onChange}
                      placeholder="选择学员..."
                      searchPlaceholder="搜索学员..."
                      className="w-full focus-visible:ring-2 focus-visible:ring-primary/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 课时安排 */}
            <FormItem>
              <div className="flex justify-between items-center mb-2">
                <FormLabel className="text-sm font-medium">课时安排</FormLabel>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={handleAddSchedule}
                  className="flex items-center gap-1 border-border/50 hover:border-foreground/50"
                >
                  <Plus className="w-4 h-4" />
                  添加课时
                </Button>
              </div>
              <FormControl>
                <div className="space-y-4">
                  {scheduleItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 border rounded-md bg-card">
                      <div className="flex-1">
                        <Input 
                          placeholder="课时类型" 
                          value={item.type}
                          onChange={(e) => {
                            const newItems = scheduleItems.map((i) => 
                              i.id === item.id ? { ...i, type: e.target.value } : i
                            )
                            form.setValue("scheduleItems", newItems)
                          }}
                          className="focus-visible:ring-2 focus-visible:ring-primary/50"
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
                            form.setValue("scheduleItems", newItems)
                          }}
                          className="focus-visible:ring-2 focus-visible:ring-primary/50"
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
                            form.setValue("scheduleItems", newItems)
                          }}
                          className="focus-visible:ring-2 focus-visible:ring-primary/50"
                        />
                      </div>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleRemoveSchedule(item.id)}
                        className="hover:bg-destructive/10 hover:text-destructive"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  {scheduleItems.length === 0 && (
                    <div className="text-center p-4 border border-dashed rounded-md text-muted-foreground">
                      请添加至少一个课时安排
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>

          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-end gap-3 px-6 py-4 border-t bg-muted/10">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                disabled={form.formState.isSubmitting}
                className="border-border/50 hover:border-foreground/50"
              >
                取消
              </Button>
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 transition-colors shadow-sm hover:shadow"
                disabled={form.formState.isSubmitting}
              >
                <Save className="mr-2 h-4 w-4" />
                保存
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
  )
}
