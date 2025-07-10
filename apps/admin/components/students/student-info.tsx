"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { Save } from "lucide-react"

import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form"
import { ImageUploader } from "@repo/ui/components/image-uploader"
import { DatePicker } from "@repo/ui/components/ui/date-picker"
import { type Student } from "@/lib/actions/student"

const studentEditSchema = z.object({
  studentId: z.number({
    required_error: "学生ID是必填项",
  }),
  studentName: z.string({
    required_error: "姓名是必填项",
  }).min(2, "姓名至少需要2个字符"),
  studentAccount: z.string({
    required_error: "账号是必填项",
  }),
  studentPhone: z.string({
    required_error: "电话是必填项",
  }).regex(/^1[3-9]\d{9}$/, "请输入有效的手机号码"),
  studentIdcard: z.string({
    required_error: "身份证号是必填项",
  }).regex(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, "请输入有效的身份证号码"),
  studentAddr: z.string().optional(),
  studentBirthday: z.string().optional(),
  studentEnrollDate: z.string({
    required_error: "入学日期是必填项",
  }),
  studentSex: z.number({
    required_error: "性别是必填项",
  }),
  studentStatus: z.string({
    required_error: "状态是必填项",
  }),
  studentClass: z.string({
    required_error: "班级是必填项",
  }),
  studentGrade: z.string({
    required_error: "年级是必填项",
  }),
  studentProfilePicture: z.string().optional(),
})

type StudentFormValues = z.infer<typeof studentEditSchema>

export function StudentInfo({ student }: { student?: Student }) {
  const router = useRouter()

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentEditSchema),
    defaultValues: {
      studentId: student?.studentId,
      studentName: student?.studentName,
      studentAccount: student?.studentAccount,
      studentPhone: student?.studentPhone,
      studentIdcard: student?.studentIdcard,
      studentAddr: student?.studentAddr,
      studentBirthday: student?.studentBirthday,
      studentEnrollDate: student?.studentEnrollDate,
      studentSex: student?.studentSex,
      studentStatus: student?.studentStatus,
      studentClass: student?.studentClass,
      studentGrade: student?.studentGrade,
      studentProfilePicture: student?.studentProfilePicture,
    },
  })

  async function onSubmit(values: StudentFormValues) {
    try {
      // In a real app, you would handle both create and update here
      router.push("/students")
      router.refresh()
    } catch (error) {
      console.error("Error saving student:", error)
    }
  }

  return (
    <Card className="border-border/50">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="px-6 py-4 border-b bg-muted/10">
            <CardTitle className="text-lg font-medium">
              学生信息
            </CardTitle>
            <CardDescription>
              管理学生的基本信息和状态
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="studentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="studentName" className="text-sm font-medium">
                      姓名
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="studentName"
                        placeholder="请输入姓名"
                        {...field}
                        className="mt-1 focus-visible:ring-2 focus-visible:ring-primary/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="studentAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="studentAccount" className="text-sm font-medium">
                      账号
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="studentAccount"
                        placeholder="请输入账号"
                        {...field}
                        className="mt-1 focus-visible:ring-2 focus-visible:ring-primary/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="studentPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="studentPhone" className="text-sm font-medium">
                      电话
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="studentPhone"
                        placeholder="请输入电话"
                        {...field}
                        className="mt-1 focus-visible:ring-2 focus-visible:ring-primary/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="studentIdcard"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="studentIdcard" className="text-sm font-medium">
                      身份证号
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="studentIdcard"
                        placeholder="请输入身份证号"
                        {...field}
                        className="mt-1 focus-visible:ring-2 focus-visible:ring-primary/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="studentAddr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="studentAddr" className="text-sm font-medium">
                      地址
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="studentAddr"
                        placeholder="请输入地址"
                        {...field}
                        className="mt-1 focus-visible:ring-2 focus-visible:ring-primary/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="studentBirthday"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="studentBirthday" className="text-sm font-medium">
                      出生日期
                    </FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value ? new Date(field.value) : undefined}
                        onChange={(date) => field.onChange(date ? date.toISOString().split('T')[0] : '')}
                        className="mt-1 focus-visible:ring-2 focus-visible:ring-primary/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="studentEnrollDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="studentEnrollDate" className="text-sm font-medium">
                      入学日期
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value ? new Date(field.value) : undefined}
                        onChange={(date) => field.onChange(date ? date.toISOString().split('T')[0] : '')}
                        className="mt-1 focus-visible:ring-2 focus-visible:ring-primary/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="studentSex"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="studentSex" className="text-sm font-medium">
                      性别
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="mt-1 focus-visible:ring-2 focus-visible:ring-primary/50">
                          <SelectValue placeholder="请选择性别" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="0">男</SelectItem>
                        <SelectItem value="1">女</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="studentStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="studentStatus" className="text-sm font-medium">
                      状态
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="mt-1 focus-visible:ring-2 focus-visible:ring-primary/50">
                          <SelectValue placeholder="请选择状态" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">在读</SelectItem>
                        <SelectItem value="inactive">休学</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="studentClass"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="studentClass" className="text-sm font-medium">
                      班级
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="studentClass"
                        placeholder="请输入班级"
                        {...field}
                        className="mt-1 focus-visible:ring-2 focus-visible:ring-primary/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="studentGrade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="studentGrade" className="text-sm font-medium">
                      年级
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="studentGrade"
                        placeholder="请输入年级"
                        {...field}
                        className="mt-1 focus-visible:ring-2 focus-visible:ring-primary/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="studentProfilePicture"
              render={({ field }) => ( 
                <FormItem>
                  <FormLabel htmlFor="studentProfilePicture" className="text-sm font-medium">
                    头像
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      {field.value && (
                        <div className="relative w-32 h-32 rounded-full overflow-hidden">
                          <img 
                            src={field.value} 
                            alt="学生头像" 
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                      <ImageUploader
                        className="mt-1 focus-visible:ring-2 focus-visible:ring-primary/50"
                        onImageChange={(url) => field.onChange(url)}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-end gap-3 px-6 py-4 border-t bg-muted/10">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => router.back()}
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
              保存更改
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}