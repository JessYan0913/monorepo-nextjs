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
import { Textarea } from "@repo/ui/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form"
import { ImageUploader } from "@repo/ui/components/image-uploader"
import { DatePicker } from "@repo/ui/components/ui/date-picker"
import { getStaff, type Staff } from "@/lib/actions/staff"

const staffEditSchema = z.object({
  staffId: z.number({
    required_error: "员工ID是必填项",
  }),
  staffName: z.string({
    required_error: "姓名是必填项",
  }).min(2, "姓名至少需要2个字符"),
  staffNick: z.string().optional(),
  staffAccount: z.string({
    required_error: "账号是必填项",
  }),
  staffPhone: z.string({
    required_error: "电话是必填项",
  }).regex(/^1[3-9]\d{9}$/, "请输入有效的手机号码"),
  staffIdcard: z.string({
    required_error: "身份证号是必填项",
  }).regex(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, "请输入有效的身份证号码"),
  staffAddr: z.string().optional(),
  staffBirthday: z.string().optional(),
  staffHiredate: z.string({
    required_error: "入职日期是必填项",
  }),
  staffSex: z.number({
    required_error: "性别是必填项",
  }),
  staffStatus: z.string({
    required_error: "状态是必填项",
  }),
  staffIntro: z.string().optional(),
  staffProfilePicture: z.string().optional(),
  staffIntroPicture: z.string().optional(),
})

const mockStaffData = {
  staffId: 1,
  staffName: "张三",
  staffNick: "小张",
  staffAccount: "zhangsan",
  staffPhone: "13800138000",
  staffIdcard: "110101199001011234",
  staffAddr: "北京市海淀区中关村南大街5号",
  staffBirthday: "1990-01-01",
  staffHiredate: "2020-01-01",
  staffSex: 0,
  staffStatus: "active",
  staffSerial: 1001,
  staffIntro: "张三是一位经验丰富的教师，擅长数学和物理教学。",
  staffProfilePicture: "https://gips2.baidu.com/it/u=1840289963,2728468038&fm=3042&app=3042&f=JPEG&wm=1,baiduai,0,0,13,9&wmo=0,0&w=480&h=640",
  staffIntroPicture: "https://gips1.baidu.com/it/u=21402277,1408661998&fm=3042&app=3042&f=JPEG&wm=1,baiduai,0,0,13,9&wmo=0,0&w=480&h=640",
  createId: 0,
  createName: "",
  createTime: "2020-01-01 00:00:00",
  updateId: 0,
  updateName: "",
  updateTime: "2020-01-01 00:00:00"
}

type StaffFormValues = z.infer<typeof staffEditSchema>

export function StaffInfo({ staff }: { staff?: Staff  }) {
  const router = useRouter()
  const form = useForm<StaffFormValues>({
    resolver: zodResolver(staffEditSchema),
    defaultValues: {
      staffId: staff?.staffId,
      staffName: staff?.staffName,
      staffNick: staff?.staffNick,
      staffAccount: staff?.staffAccount,
      staffPhone: staff?.staffPhone,
      staffIdcard: staff?.staffIdcard,
      staffAddr: staff?.staffAddr,
      staffBirthday: staff?.staffBirthday,
      staffHiredate: staff?.staffHiredate,
      staffSex: staff?.staffSex,
      staffStatus: staff?.staffStatus,
      staffIntro: staff?.staffIntro,
      staffProfilePicture: staff?.staffProfilePicture,
      staffIntroPicture: staff?.staffIntroPicture,
    },
  })
  
  const submit = form.handleSubmit(async (data) => {
    try {
      // For a real implementation, you would call updateStaff here
      console.log("Submitting staff data:", data)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Navigate back to the staff list page
      router.push("/staffs")
      router.refresh()
    } catch (error) {
      console.error("Error updating staff:", error)
    }
  })

  return (
    <Card className="overflow-hidden border border-border/50 shadow-sm transition-all hover:shadow-md">
      <CardHeader className="bg-muted/10 border-b">
        <div className="space-y-1">
          <CardTitle className="text-xl">员工信息</CardTitle>
          <CardDescription className="text-sm">更新员工的详细信息和个人资料</CardDescription>
        </div>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={submit}>
          <input type="hidden" {...form.register("staffId")} value={staff?.staffId} />
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="staffName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="staffName" className="text-sm font-medium">
                      姓名
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="staffName"
                        placeholder="请输入员工姓名"
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
                name="staffNick"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="staffNick" className="text-sm font-medium">
                      昵称
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="staffNick"
                        placeholder="请输入员工昵称"
                        {...field}
                        className="mt-1 focus-visible:ring-2 focus-visible:ring-primary/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="staffAccount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="staffAccount" className="text-sm font-medium">
                      账号
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="staffAccount"
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
                name="staffPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="staffPhone" className="text-sm font-medium">
                      电话
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="staffPhone"
                        placeholder="请输入手机号码"
                        {...field}
                        className="mt-1 focus-visible:ring-2 focus-visible:ring-primary/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="staffIdcard"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="staffIdcard" className="text-sm font-medium">
                      身份证号
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="staffIdcard"
                        placeholder="请输入身份证号码"
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
                name="staffSex"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="staffSex" className="text-sm font-medium">
                      性别
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      defaultValue={field.value?.toString()}
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
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="staffBirthday"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel htmlFor="staffBirthday" className="text-sm font-medium">
                      出生日期
                    </FormLabel>
                    <DatePicker
                      value={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => field.onChange(date ? date : '')}
                      className="mt-1"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="staffHiredate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel htmlFor="staffHiredate" className="text-sm font-medium">
                      入职日期
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <DatePicker
                      value={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) => field.onChange(date ? date : '')}
                      className="mt-1"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="staffAddr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="staffAddr" className="text-sm font-medium">
                      地址
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="staffAddr"
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
                name="staffStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="staffStatus" className="text-sm font-medium">
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
                        <SelectItem value="active">在职</SelectItem>
                        <SelectItem value="inactive">离职</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="staffIntro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="staffIntro" className="text-sm font-medium">
                    个人介绍
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      id="staffIntro"
                      placeholder="请输入个人介绍"
                      {...field}
                      className="mt-1 focus-visible:ring-2 focus-visible:ring-primary/50"
                      rows={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="staffProfilePicture"
              render={({ field }) => ( 
                <FormItem>
                  <FormLabel htmlFor="staffProfilePicture" className="text-sm font-medium">
                    头像
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      {field.value && (
                        <div className="relative w-32 h-32 rounded-full overflow-hidden">
                          <img 
                            src={field.value} 
                            alt="员工头像" 
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