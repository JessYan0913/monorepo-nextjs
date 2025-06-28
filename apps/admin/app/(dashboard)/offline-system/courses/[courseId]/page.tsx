"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { format } from "date-fns"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import { Calendar as CalendarIcon, Plus, Trash, ChevronDown, ChevronUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

// 定义动作步骤验证架构
const actionStepSchema = z.object({
  content: z.string().min(1, { message: "内容不能为空" }),
  duration: z.string().min(1, { message: "时长不能为空" }),
})

// 定义动作验证架构
const actionSchema = z.object({
  action: z.string().min(1, { message: "动作不能为空" }),
  requirement: z.string().min(1, { message: "动作要求不能为空" }),
  purpose: z.string().min(1, { message: "训练目的不能为空" }),
  beginnerStep: actionStepSchema,
  intermediateStep: actionStepSchema,
  advancedStep: actionStepSchema,
})

// 定义表单验证架构
const formSchema = z.object({
  // 教案信息
  courseId: z.string().min(1, { message: "教案编号不能为空" }),
  classTime: z.date({
    required_error: "请选择上课时间",
  }),
  
  // 召集环节
  gatheringDuration: z.string().min(1, { message: "召集环节时长不能为空" }),
  gatheringContent: z.string().min(1, { message: "召集环节内容不能为空" }),
  warmupContent: z.string().min(1, { message: "热身内容不能为空" }),
  warmupDuration: z.string().min(1, { message: "热身时长不能为空" }),
  
  // 课程主轴（动态表单）
  actions: z.array(actionSchema).min(1, { message: "至少添加一个课程主轴" }),
})

// 定义表单数据类型
type FormValues = z.infer<typeof formSchema>

export default function CourseDetailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const courseId = searchParams.get("id")
  
  // 初始化表单
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // 教案信息
      courseId: courseId || "",
      classTime: new Date(),
      
      // 召集环节
      gatheringDuration: "",
      gatheringContent: "",
      warmupContent: "",
      warmupDuration: "",
      
      // 课程主轴（动态表单）
      actions: [
        {
          action: "",
          requirement: "",
          purpose: "",
          beginnerStep: { content: "", duration: "" },
          intermediateStep: { content: "", duration: "" },
          advancedStep: { content: "", duration: "" },
        }
      ],
    },
  })
  
  // 初始化动态表单数组
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "actions",
  })

  // 模拟从API获取数据
  useEffect(() => {
    if (courseId) {
      // 这里可以添加实际的API调用来获取教案详情
      // 现在只是模拟数据
      const mockData = {
        // 教案信息
        courseId: courseId,
        classTime: new Date(),
        
        // 召集环节
        gatheringDuration: "15分钟",
        gatheringContent: "师生问候、自我介绍",
        warmupContent: "简单的英语对话练习",
        warmupDuration: "10分钟",
        
        // 课程主轴（动态表单）
        actions: [
          {
            action: "单词发音练习",
            requirement: "正确发音，注意音调",
            purpose: "提高发音准确性",
            beginnerStep: { content: "基础单词发音", duration: "5分钟" },
            intermediateStep: { content: "连读和弱读", duration: "7分钟" },
            advancedStep: { content: "语调和重音", duration: "8分钟" },
          },
          {
            action: "对话练习",
            requirement: "流利表达，自然交流",
            purpose: "提高口语交流能力",
            beginnerStep: { content: "简单问候对话", duration: "10分钟" },
            intermediateStep: { content: "日常情景对话", duration: "15分钟" },
            advancedStep: { content: "复杂话题讨论", duration: "20分钟" },
          }
        ],
      }
      
      form.reset(mockData)
    }
  }, [courseId, form])

  // 表单提交处理
  function onSubmit(data: FormValues) {
    console.log("表单数据:", data)
    // 这里可以添加实际的API调用来保存数据
    alert("教案保存成功！")
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">教案详情</h1>
        <Button variant="outline" onClick={() => router.back()}>返回</Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* 教案信息卡片 */}
          <Card>
            <CardHeader>
              <CardTitle>教案信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 教案编号 */}
              <FormField
                control={form.control}
                name="courseId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>教案编号</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入教案编号" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 上课时间 */}
              <FormField
                control={form.control}
                name="classTime"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>上课时间</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>请选择日期</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* 召集环节卡片 */}
          <Card>
            <CardHeader>
              <CardTitle>召集环节</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 召集环节时长 */}
                <FormField
                  control={form.control}
                  name="gatheringDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>时长</FormLabel>
                      <FormControl>
                        <Input placeholder="请输入召集环节时长" {...field} />
                      </FormControl>
                      <FormDescription>例如：15分钟</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 召集环节内容 */}
                <FormField
                  control={form.control}
                  name="gatheringContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>内容</FormLabel>
                      <FormControl>
                        <Input placeholder="请输入召集环节内容" {...field} />
                      </FormControl>
                      <FormDescription>例如：师生问候、自我介绍等</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 热身内容 */}
                <FormField
                  control={form.control}
                  name="warmupContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>热身内容</FormLabel>
                      <FormControl>
                        <Input placeholder="请输入热身内容" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* 热身时长 */}
                <FormField
                  control={form.control}
                  name="warmupDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>热身时长</FormLabel>
                      <FormControl>
                        <Input placeholder="请输入热身时长" {...field} />
                      </FormControl>
                      <FormDescription>例如：10分钟</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* 课程主轴卡片 */}
          <Card>
            <CardHeader>
              <CardTitle>课程主轴</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {fields.map((field, index) => (
                <div key={field.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">主轴 {index + 1}</h3>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                      disabled={fields.length === 1}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* 动作 */}
                    <FormField
                      control={form.control}
                      name={`actions.${index}.action`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>动作</FormLabel>
                          <FormControl>
                            <Input placeholder="请输入动作" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* 动作要求 */}
                    <FormField
                      control={form.control}
                      name={`actions.${index}.requirement`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>动作要求</FormLabel>
                          <FormControl>
                            <Input placeholder="请输入动作要求" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* 训练目的 */}
                    <FormField
                      control={form.control}
                      name={`actions.${index}.purpose`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>训练目的</FormLabel>
                          <FormControl>
                            <Input placeholder="请输入训练目的" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* 动作步骤 */}
                  <div className="mt-4">
                    <h4 className="text-md font-medium mb-2">动作步骤</h4>
                    
                    {/* 初步步骤 */}
                    <div className="border rounded-md p-3 mb-3 bg-muted/30">
                      <h5 className="text-sm font-medium mb-2">初步步骤</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`actions.${index}.beginnerStep.content`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>内容</FormLabel>
                              <FormControl>
                                <Input placeholder="请输入内容" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`actions.${index}.beginnerStep.duration`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>时长</FormLabel>
                              <FormControl>
                                <Input placeholder="请输入时长" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    {/* 中级步骤 */}
                    <div className="border rounded-md p-3 mb-3 bg-muted/30">
                      <h5 className="text-sm font-medium mb-2">中级步骤</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`actions.${index}.intermediateStep.content`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>内容</FormLabel>
                              <FormControl>
                                <Input placeholder="请输入内容" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`actions.${index}.intermediateStep.duration`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>时长</FormLabel>
                              <FormControl>
                                <Input placeholder="请输入时长" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    {/* 高级步骤 */}
                    <div className="border rounded-md p-3 bg-muted/30">
                      <h5 className="text-sm font-medium mb-2">高级步骤</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`actions.${index}.advancedStep.content`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>内容</FormLabel>
                              <FormControl>
                                <Input placeholder="请输入内容" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`actions.${index}.advancedStep.duration`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>时长</FormLabel>
                              <FormControl>
                                <Input placeholder="请输入时长" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {form.formState.errors.actions?.message && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.actions.message}
                </p>
              )}
              
              {/* 添加课程主轴按钮 */}
              <div className="mt-6 flex justify-center">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    append({
                      action: "",
                      requirement: "",
                      purpose: "",
                      beginnerStep: { content: "", duration: "" },
                      intermediateStep: { content: "", duration: "" },
                      advancedStep: { content: "", duration: "" },
                    });
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  添加课程主轴
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 提交按钮 */}
          <div className="flex justify-end">
            <Button type="submit">保存教案</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}