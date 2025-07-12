"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowLeft, Loader2, User } from "lucide-react"
import Link from "next/link"

import { Button } from "@repo/ui/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/ui/select"
import { Input } from "@repo/ui/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { toast } from "@repo/ui/components/ui/sonner"

import { addCashier, cashierList, type Cashier } from "@/lib/actions/cashier"
import { schoolList, type School } from "@/lib/actions/school"

// 表单验证模式
const formSchema = z.object({
  schoolId: z.string().min(1, "请选择校区"),
  cashierId: z.string().min(1, "请选择收银员"),
  status: z.enum(["active", "inactive"]),
})

export default function AddCashierPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [schools, setSchools] = useState<School[]>([])
  const [isLoadingSchools, setIsLoadingSchools] = useState(true)
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>("") 
  const [availableCashiers, setAvailableCashiers] = useState<Cashier[]>([])
  const [isLoadingCashiers, setIsLoadingCashiers] = useState(false)
  const [selectedCashier, setSelectedCashier] = useState<Cashier | null>(null)
  
  // 定义表单类型
  type FormValues = z.infer<typeof formSchema>
  
  // 初始化表单
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      schoolId: "",
      cashierId: "",
      status: "active" as const,
    },
  })
  
  // 加载校区列表
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setIsLoadingSchools(true)
        const response = await schoolList({
          page: 1,
          size: 100,
        })
        setSchools(response.data || [])
      } catch (error) {
        console.error("Failed to fetch schools:", error)
        toast.error("加载校区失败，请稍后重试")
      } finally {
        setIsLoadingSchools(false)
      }
    }
    
    fetchSchools()
  }, [])
  
  // 根据选择的校区加载收银员列表
  useEffect(() => {
    if (!selectedSchoolId) {
      setAvailableCashiers([])
      setSelectedCashier(null)
      form.setValue("cashierId", "")
      return
    }
    
    const fetchCashiers = async () => {
      try {
        setIsLoadingCashiers(true)
        const response = await cashierList({
          schoolId: selectedSchoolId,
          page: 1,
          size: 100,
        })
        setAvailableCashiers(response.data || [])
      } catch (error) {
        console.error("Failed to fetch cashiers:", error)
        toast.error("加载收银员列表失败，请稍后重试")
      } finally {
        setIsLoadingCashiers(false)
      }
    }
    
    fetchCashiers()
  }, [selectedSchoolId, form])
  
  // 当选择收银员时更新表单数据
  useEffect(() => {
    if (selectedCashier) {
      form.setValue("status", selectedCashier.status || "active")
    }
  }, [selectedCashier, form])
  // 表单提交处理
  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    try {
      setIsSubmitting(true)
      
      if (!selectedCashier) {
        toast.error("请选择收银员")
        return
      }
      
      // 校验所选校区是否存在
      const selectedSchool = schools.find(school => school.schoolId === values.schoolId)
      
      if (!selectedSchool) {
        toast.error("所选校区不存在或已被删除，请重新选择")
        return
      }
      
      // 构建收银员数据
      const cashierData: Omit<Cashier, 'id' | 'createTime' | 'updateTime' | 'createId' | 'createName' | 'updateId' | 'updateName'> = {
        name: selectedCashier.name,
        phone: selectedCashier.phone,
        email: selectedCashier.email,
        status: values.status,
        school: {
          schoolId: values.schoolId,
          schoolName: selectedSchool.schoolName,
          schoolAddr: selectedSchool.schoolAddr || '',
        },
        avatar: selectedCashier.avatar || ""
      }
      
      // 调用添加收银员API
      const result = await addCashier(cashierData)
      
      if (result) {
        toast.success(`收银员 ${selectedCashier.name} 已成功添加`)
        
        // 跳转回收银员列表页
        router.push("/cashiers")
        router.refresh()
      } else {
        toast.error("添加收银员失败，请检查网络连接并重试")
      }
    } catch (error) {
      console.error("Failed to add cashier:", error)
      
      // 错误处理
      if (error instanceof Error) {
        if (error.message.includes("duplicate") || error.message.includes("重复")) {
          toast.error("收银员信息重复，可能手机号或邮箱已被使用")
        } else {
          toast.error(error.message)
        }
      } else {
        toast.error("添加失败，请稍后重试")
      }
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-2">
        <Link 
          href="/cashiers" 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="sr-only">返回</span>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">添加收银员</h1>
          <p className="text-muted-foreground">创建新的收银员账号</p>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>收银员信息</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form as any}>
            <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 校区选择 */}
                <FormField
                  control={form.control as any}
                  name="schoolId"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>所属校区</FormLabel>
                      <Select
                        disabled={isLoadingSchools || isSubmitting}
                        onValueChange={(value) => {
                          field.onChange(value)
                          setSelectedSchoolId(value)
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="请选择校区" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {isLoadingSchools ? (
                            <SelectItem value="loading" disabled>
                              <div className="flex items-center">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                <span>加载中...</span>
                              </div>
                            </SelectItem>
                          ) : schools.length === 0 ? (
                            <SelectItem value="empty" disabled>暂无校区数据</SelectItem>
                          ) : (
                            schools.map((school) => (
                              <SelectItem key={school.schoolId} value={school.schoolId}>
                                {school.schoolName}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* 收银员选择 */}
                {selectedSchoolId && (
                  <FormField
                    control={form.control as any}
                    name="cashierId"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>选择收银员</FormLabel>
                        <Select
                          disabled={isLoadingCashiers || isSubmitting}
                          onValueChange={(value) => {
                            field.onChange(value)
                            const cashier = availableCashiers.find(c => String(c.id) === value)
                            setSelectedCashier(cashier || null)
                          }}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="请选择收银员" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {isLoadingCashiers ? (
                              <SelectItem value="loading" disabled>
                                <div className="flex items-center">
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  <span>加载中...</span>
                                </div>
                              </SelectItem>
                            ) : availableCashiers.length === 0 ? (
                              <SelectItem value="empty" disabled>该校区暂无收银员</SelectItem>
                            ) : (
                              availableCashiers.map((cashier) => (
                                <SelectItem key={String(cashier.id)} value={String(cashier.id)}>
                                  <div className="flex items-center">
                                    <span>{cashier.name}</span>
                                    <span className="ml-2 text-xs text-muted-foreground">{cashier.phone}</span>
                                  </div>
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                {/* 收银员信息展示 */}
                {selectedCashier && (
                  <>
                    <div className="md:col-span-2">
                      <div className="border-b pb-2 mb-4">
                        <h3 className="text-sm font-medium">收银员信息</h3>
                      </div>
                    </div>
                    
                    {/* 姓名 - 只读 */}
                    <div className="space-y-2">
                      <div className="text-sm font-medium">姓名</div>
                      <div className="p-2 border rounded-md bg-muted/5">
                        {selectedCashier.name}
                      </div>
                    </div>
                    
                    {/* 手机号 - 只读 */}
                    <div className="space-y-2">
                      <div className="text-sm font-medium">手机号</div>
                      <div className="p-2 border rounded-md bg-muted/5">
                        {selectedCashier.phone}
                      </div>
                    </div>
                    
                    {/* 邮箱 - 只读 */}
                    <div className="space-y-2">
                      <div className="text-sm font-medium">邮箱</div>
                      <div className="p-2 border rounded-md bg-muted/5">
                        {selectedCashier.email}
                      </div>
                    </div>
                    
                    {/* 状态 - 可编辑 */}
                    <FormField
                      control={form.control as any}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>状态</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            disabled={isSubmitting}
                          >
                            <FormControl>
                              <SelectTrigger>
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
                  </>
                )}
              </div>
              
              <div className="flex justify-between items-center mt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => router.push("/cashiers")}
                  disabled={isSubmitting}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  返回列表
                </Button>
                
                <Button type="submit" disabled={isSubmitting || isLoadingSchools}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      正在添加...
                    </>
                  ) : (
                    "添加收银员"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}