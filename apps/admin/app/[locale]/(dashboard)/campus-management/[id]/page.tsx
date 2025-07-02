"use client"

import * as React from "react"
import { useRouter, useParams, notFound } from "next/navigation"
import Link from "next/link"
import { z } from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Save } from "lucide-react"

import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"
import { Textarea } from "@repo/ui/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form"
import { saveCampus } from "@/lib/actions/campus"

// 校园数据类型定义
type Campus = {
  id: string
  name: string
  address: string
  region: string
  status: "active" | "inactive"
  studentCount: number
  classroomCount: number
  createdAt: string
}

// 模拟校园数据
const mockCampuses: Campus[] = [
  {
    id: "1",
    name: "顺义校区",
    address: "北京市顺义区后沙峪镇安富街8号",
    region: "北京市-顺义区",
    status: "active",
    studentCount: 1250,
    classroomCount: 45,
    createdAt: "2020-05-15",
  },
  {
    id: "2",
    name: "昌平校区",
    address: "北京市昌平区沙河镇松兰堡村西口",
    region: "北京市-昌平区",
    status: "active",
    studentCount: 980,
    classroomCount: 32,
    createdAt: "2021-03-20",
  },
  {
    id: "3",
    name: "海淀校区",
    address: "北京市海淀区西三旗建材城西路31号",
    region: "北京市-海淀区",
    status: "active",
    studentCount: 1580,
    classroomCount: 52,
    createdAt: "2019-09-01",
  },
  {
    id: "4",
    name: "朝阳校区",
    address: "北京市朝阳区望京西园四区417号楼",
    region: "北京市-朝阳区",
    status: "inactive",
    studentCount: 750,
    classroomCount: 28,
    createdAt: "2022-01-10",
  },
  {
    id: "5",
    name: "通州校区",
    address: "北京市通州区永顺镇潞苑北大街15号",
    region: "北京市-通州区",
    status: "active",
    studentCount: 620,
    classroomCount: 25,
    createdAt: "2022-08-15",
  },
]

const campusEditSchema = z.object({
  id: z.string({
    required_error: "请输入校区ID",
  }),
  name: z.string({
    required_error: "请输入校区名称",
  }),
  address: z.string({
    required_error: "请输入详细地址",
  }),
  region: z.string({
    required_error: "请输入所属区域",
  }),
  status: z.enum(["active", "inactive"], {
    required_error: "请选择运营状态",
  }),
  studentCount: z.number({
    required_error: "请输入学生数量",
  }),
  classroomCount: z.number({
    required_error: "请输入教室数量",
  }),
})

type CampusFormValues = z.infer<typeof campusEditSchema>

export default function CampusEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  const router = useRouter()
  // 根据ID查找校区数据
  const campus = mockCampuses.find(c => c.id === id)
  
  // 如果找不到对应校区，返回404
  if (!campus && id !== "add") {
    notFound()
  }

  const form = useForm<CampusFormValues>({
      resolver: zodResolver(campusEditSchema),
      defaultValues: {
        name: campus?.name,
        address: campus?.address,
        region: campus?.region,
        status: campus?.status,
        studentCount: campus?.studentCount,
        classroomCount: campus?.classroomCount,
      },
  })
  
  const submit = form.handleSubmit(async (data) => {
    await saveCampus(data)
    router.back()
  })

  return (
    <div className="container max-w-6xl mx-auto p-4 sm:p-6 space-y-6 transition-all duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <Link 
          href="/campus-management" 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回列表
        </Link>
      </div>

      <Card className="overflow-hidden border border-border/50 shadow-sm transition-all hover:shadow-md">
        <CardHeader className="bg-muted/10 border-b">
          <div className="space-y-1">
            <CardTitle className="text-xl">校区信息</CardTitle>
            <CardDescription className="text-sm">更新校区的详细信息和运营数据</CardDescription>
          </div>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={submit}>
            <input type="hidden" {...form.register("id")} value={id} />
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="name" className="text-sm font-medium">
                          校区名称
                          <span className="text-destructive ml-1">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            id="name" 
                            type="text" 
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
                  name="region"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="region" className="text-sm font-medium">
                          所属区域
                          <span className="text-destructive ml-1">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            id="region" 
                            type="text" 
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
                name="address"
                render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="address" className="text-sm font-medium">
                        详细地址
                        <span className="text-destructive ml-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          id="address" 
                          {...field} 
                          className="mt-1 min-h-[100px] focus-visible:ring-2 focus-visible:ring-primary/50"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="status" className="text-sm font-medium">
                        运营状态
                        <span className="text-destructive ml-1">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger 
                            id="status" 
                            className="w-full focus:ring-2 focus:ring-primary/50"
                          >
                            <SelectValue placeholder="选择状态" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">正常运营</SelectItem>
                            <SelectItem value="inactive">暂停运营</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="studentCount"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="studentCount" className="text-sm font-medium">
                          学生数量
                          <span className="text-destructive ml-1">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            id="studentCount" 
                            type="number" 
                            min="0"
                            {...field} 
                            onChange={(e) => field.onChange(e.target.valueAsNumber)}
                            className="mt-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus-visible:ring-2 focus-visible:ring-primary/50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                />
                <FormField
                  control={form.control}
                  name="classroomCount"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="classroomCount" className="text-sm font-medium">
                          教室数量
                          <span className="text-destructive ml-1">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input 
                            id="classroomCount" 
                            type="number" 
                            min="0"
                            {...field} 
                            onChange={(e) => field.onChange(e.target.valueAsNumber)}
                            className="mt-1 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus-visible:ring-2 focus-visible:ring-primary/50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-end gap-3 px-6 py-4 border-t bg-muted/10">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => router.back()}
                className="border-border/50 hover:border-foreground/50"
              >
                取消
              </Button>
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 transition-colors shadow-sm hover:shadow"
              >
                <Save className="mr-2 h-4 w-4" />
                保存更改
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
