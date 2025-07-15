"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowLeft, Loader2, Shield } from "lucide-react"
import Link from "next/link"

import { Button } from "@repo/ui/components/ui/button"
import { TransferList, type TransferListItem } from "@repo/ui/components/transfer-list"
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
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { toast } from "@repo/ui/components/ui/sonner"

import { type Cashier } from "@/lib/actions/cashier"
import { type School } from "@/lib/actions/school"

// 模拟校区数据，匹配原有API返回的School类型结构
const mockSchools: Omit<School, 'schoolStatus' | 'schoolMvs' | 'schoolPictures' | 'schoolIntro' | 'director'>[] = [
  { schoolId: "school1", schoolName: "总部校区", schoolAddr: "北京市朝阳区建国路88号", createId: "1", createName: "管理员", createTime: "2025-07-01" },
  { schoolId: "school2", schoolName: "西城校区", schoolAddr: "北京市西城区西长安街1号", createId: "1", createName: "管理员", createTime: "2025-07-01" },
  { schoolId: "school3", schoolName: "海淀校区", schoolAddr: "北京市海淀区中关村大街15号", createId: "1", createName: "管理员", createTime: "2025-07-01" },
  { schoolId: "school4", schoolName: "东城校区", schoolAddr: "北京市东城区东长安街9号", createId: "1", createName: "管理员", createTime: "2025-07-01" },
]

// 模拟收银员数据
// 注意：由于原始Cashier类型中没有cashierId字段，这里使用自定义类型扩展
interface MockCashier extends Omit<Cashier, 'id'> {
  id: number;
  cashierId: string;
}

const mockCashiers: MockCashier[] = [
  { 
    id: 1, 
    cashierId: "cashier1", 
    name: "张三", 
    phone: "13800138001", 
    email: "zhangsan@example.com", 
    status: "active", 
    avatar: "", 
    school: { schoolId: "school1", schoolName: "总部校区", schoolAddr: "北京市朝阳区建国路88号" },
    createTime: "2025-07-01", 
    updateTime: "2025-07-01" 
  },
  { 
    id: 2, 
    cashierId: "cashier2", 
    name: "李四", 
    phone: "13800138002", 
    email: "lisi@example.com", 
    status: "active", 
    avatar: "", 
    school: { schoolId: "school1", schoolName: "总部校区", schoolAddr: "北京市朝阳区建国路88号" },
    createTime: "2025-07-01", 
    updateTime: "2025-07-01" 
  },
  { 
    id: 3, 
    cashierId: "cashier3", 
    name: "王五", 
    phone: "13800138003", 
    email: "wangwu@example.com", 
    status: "active", 
    avatar: "", 
    school: { schoolId: "school2", schoolName: "西城校区", schoolAddr: "北京市西城区西长安街1号" },
    createTime: "2025-07-01", 
    updateTime: "2025-07-01" 
  },
  { 
    id: 4, 
    cashierId: "cashier4", 
    name: "赵六", 
    phone: "13800138004", 
    email: "zhaoliu@example.com", 
    status: "inactive", 
    avatar: "", 
    school: { schoolId: "school3", schoolName: "海淀校区", schoolAddr: "北京市海淀区中关村大街15号" },
    createTime: "2025-07-01", 
    updateTime: "2025-07-01" 
  },
]

// 模拟权限数据
interface PermissionItem {
  key: string;
  label: string;
  description: string;
}

const mockPermissions: PermissionItem[] = [
  { key: "dashboard", label: "控制台", description: "查看系统概览和统计数据" },
  { key: "cashier_management", label: "收银员管理", description: "管理收银员账号和权限" },
  { key: "course_management", label: "课程管理", description: "创建和管理课程信息" },
  { key: "student_management", label: "学员管理", description: "管理学员信息和报名记录" },
  { key: "teacher_management", label: "教师管理", description: "管理教师信息和课程安排" },
  { key: "finance_management", label: "财务管理", description: "处理收款和退款业务" },
  { key: "report_view", label: "报表查看", description: "查看各类统计报表" },
  { key: "system_settings", label: "系统设置", description: "配置系统参数和选项" },
]

// 表单验证模式
const formSchema = z.object({
  schoolId: z.string().min(1, "请选择校区"),
  cashierId: z.string().min(1, "请选择收银员"),
  status: z.enum(["active", "inactive"]),
  permissions: z.array(z.string()).min(1, "请至少分配一个权限")
})

export default function AddCashierPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [schools, setSchools] = useState(mockSchools)
  const [isLoadingSchools, setIsLoadingSchools] = useState(false)
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>("") 
  const [availableCashiers, setAvailableCashiers] = useState(mockCashiers)
  const [isLoadingCashiers, setIsLoadingCashiers] = useState(false)
  const [selectedCashier, setSelectedCashier] = useState<MockCashier | null>(null)
  
  // 定义表单类型
  type FormValues = z.infer<typeof formSchema>
  
  // 转换权限数据为TransferListItem格式
  const permissionItems: TransferListItem<{description: string}>[] = mockPermissions.map(permission => ({
    key: permission.key,
    label: permission.label,
    description: permission.description
  }))
  
  // 初始化表单
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      schoolId: "",
      cashierId: "",
      status: "active" as const,
      permissions: [],
    },
  })
  
  // 使用模拟数据，不需要加载校区列表
  useEffect(() => {
    // 模拟加载过程
    setIsLoadingSchools(true)
    setTimeout(() => {
      setIsLoadingSchools(false)
    }, 500)
  }, [])
  
  // 使用模拟数据，根据选择的校区筛选收银员列表
  useEffect(() => {
    if (!selectedSchoolId) {
      setAvailableCashiers([])
      setSelectedCashier(null)
      form.setValue("cashierId", "")
      return
    }
    
    // 模拟加载过程
    setIsLoadingCashiers(true)
    
    // 模拟API调用延迟
    setTimeout(() => {
      // 实际项目中，这里应该根据schoolId过滤收银员
      // 这里简单模拟返回所有收银员
      setAvailableCashiers(mockCashiers)
      setIsLoadingCashiers(false)
    }, 500)
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
      
      // 构建收银员数据，包含权限信息
      const cashierSubmitData = {
        name: selectedCashier.name,
        phone: selectedCashier.phone,
        email: selectedCashier.email,
        status: values.status,
        school: {
          schoolId: values.schoolId,
          schoolName: selectedSchool.schoolName,
          schoolAddr: selectedSchool.schoolAddr || '',
        },
        avatar: selectedCashier.avatar || "",
        permissions: values.permissions
      }
      
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 模拟成功响应
      const mockResult = {
        id: Math.floor(Math.random() * 1000) + 5,
        ...cashierSubmitData,
        createTime: new Date().toISOString(),
        updateTime: new Date().toISOString(),
      }
      
      // 模拟成功响应
      toast.success(`收银员 ${selectedCashier.name} 已成功添加`)
      
      // 延迟一下再跳转，让用户看到成功提示
      setTimeout(() => {
        router.push("/cashiers")
      }, 1500)
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
                      <Card className="overflow-hidden border shadow-sm">
                        <div className="flex flex-col md:flex-row">
                          {/* 左侧头像区域 */}
                          <div className="w-full md:w-1/3 p-6 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-muted/20">
                            <div className="h-24 w-24 rounded-full bg-background shadow-sm border-4 border-background flex items-center justify-center mb-4">
                              <span className="text-primary text-3xl font-bold">{selectedCashier.name.slice(0, 1)}</span>
                            </div>
                            <h3 className="text-xl font-bold">{selectedCashier.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">收银员</p>
                            
                            <div className="mt-4 w-full">
                              <FormField
                                control={form.control as any}
                                name="status"
                                render={({ field }) => (
                                  <FormItem>
                                    <Select
                                      onValueChange={field.onChange}
                                      value={field.value}
                                      disabled={isSubmitting}
                                    >
                                      <FormControl>
                                        <SelectTrigger className="bg-background/80 w-full">
                                          <SelectValue placeholder="请选择状态" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="active">可用</SelectItem>
                                        <SelectItem value="inactive">禁用</SelectItem>
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </div>
                          
                          {/* 右侧联系信息 */}
                          <div className="w-full md:w-2/3 p-6">
                            <h4 className="text-sm font-medium text-muted-foreground mb-4">联系信息</h4>
                            
                            <div className="space-y-4">
                              {/* 手机号 */}
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                  </svg>
                                </div>
                                <div>
                                  <div className="text-xs text-muted-foreground">手机号</div>
                                  <div className="font-medium">{selectedCashier.phone}</div>
                                </div>
                              </div>
                              
                              {/* 邮箱 */}
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                  </svg>
                                </div>
                                <div>
                                  <div className="text-xs text-muted-foreground">邮箱</div>
                                  <div className="font-medium truncate max-w-[220px]" title={selectedCashier.email}>
                                    {selectedCashier.email}
                                  </div>
                                </div>
                              </div>
                              
                              {/* 所属校区 */}
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                                    <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path>
                                    <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path>
                                    <path d="M12 3v6"></path>
                                  </svg>
                                </div>
                                <div>
                                  <div className="text-xs text-muted-foreground">所属校区</div>
                                  <div className="font-medium">
                                    {selectedCashier.school.schoolName}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </>
                )}
                {/* 权限分配 */}
                <div className="md:col-span-2 mt-6">
                  <div className="border-b pb-2 mb-4">
                    <h3 className="text-sm font-medium flex items-center">
                      <Shield className="h-4 w-4 mr-1" />
                      权限分配
                    </h3>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="permissions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>请选择要分配的权限</FormLabel>
                        <FormControl>
                          <div className="border rounded-md p-4">
                            <TransferList<{description: string}>
                              items={permissionItems}
                              onChange={({ reduceRight }) => { 
                                field.onChange(reduceRight)
                              }}
                              titles={["可用权限", "已分配权限"]}
                              searchPlaceholders={["搜索可用权限", "搜索已分配权限"]}
                              height={300}
                              renderItem={(item) => (
                                <div>
                                  <div className="font-medium">{item.label}</div>
                                  {item.description && (
                                    <div className="text-xs text-muted-foreground">{item.description}</div>
                                  )}
                                </div>
                              )}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-6">
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