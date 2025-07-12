"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { Save } from "lucide-react"

import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form"
import { TransferList, BaseTransferListItem } from "@repo/ui/components/transfer-list"
import { getStaff, type Staff } from "@/lib/actions/staff"

// 定义包含权限属性的自定义项目类型
type RoleItem = BaseTransferListItem & {
  description?: string
}

const RoleTransferList = TransferList<RoleItem>

// 角色选项示例数据
const roleOptions: RoleItem[] = [
  { key: "admin", label: "管理员", description: "系统全部权限", selected: false },
  { key: "manager", label: "经理", description: "管理校区和员工", selected: false },
  { key: "teacher", label: "教师", description: "管理课程和学生", selected: false },
  { key: "finance", label: "财务", description: "管理财务和账单", selected: false },
  { key: "reception", label: "前台", description: "管理预约和接待", selected: false },
  { key: "marketing", label: "市场", description: "管理营销和活动", selected: false },
  { key: "hr", label: "人事", description: "管理招聘和培训", selected: false },
  { key: "viewer", label: "查看者", description: "只读权限", selected: false },
]

// 表单验证模式
const staffPermissionSchema = z.object({
  staffId: z.string({
    required_error: "员工ID不能为空",
  }),
  roles: z.array(z.object({
    key: z.string(),
    label: z.string(),
    description: z.string().optional(),
  }), {
    required_error: "请至少选择一个角色",
  }),
})

type StaffPermissionFormValues = z.infer<typeof staffPermissionSchema>

interface StaffPermissionProps {
  staff?: Staff
  currentRoles?: string[]
}

export function StaffPermission({ staff, currentRoles = [] }: StaffPermissionProps) {
  const router = useRouter()
  
  // 预选当前角色
  const [initialRoles, setInitialRoles] = React.useState(() => {
    return roleOptions.map(role => {
      if (currentRoles.includes(role.key)) {
        return { ...role, selected: true }
      }
      return role
    })
  })

  const form = useForm<StaffPermissionFormValues>({
    resolver: zodResolver(staffPermissionSchema),
    defaultValues: {
      staffId: `${staff?.staffId}`,
      roles: initialRoles.filter(role => role.selected),
    },
  })
  
  const submit = form.handleSubmit(async (data) => {
    console.log("提交的数据:", data)
    // 这里可以添加保存权限的API调用
    // await saveStaffPermissions(data)
    router.back()
  })

  return (
    <Card className="overflow-hidden border border-border/50 shadow-sm transition-all hover:shadow-md">
      <CardHeader className="bg-muted/10 border-b">
        <div className="space-y-1">
          <CardTitle className="text-xl">员工权限配置</CardTitle>
          <CardDescription className="text-sm">
            {staff?.staffName ? `配置 ${staff.staffName} 的角色和权限` : "配置员工的角色和权限"}
          </CardDescription>
        </div>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={submit}>
          <input type="hidden" {...form.register("staffId")} value={staff?.staffId} />
          <CardContent className="p-6 space-y-6">
            <FormField
              control={form.control}
              name="roles"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="roles" className="text-sm font-medium">
                    角色配置
                    <span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <RoleTransferList
                      items={initialRoles}
                      onChange={(leftItems, rightItems) => {
                        console.log('已选角色:', rightItems);
                        field.onChange(rightItems)
                      }}
                      renderItem={(item) => (
                        <div>
                          <div className="flex items-center"> 
                            {item.label}
                          </div>
                          {item.description && (
                            <div className="text-xs text-muted-foreground mt-1">
                              {item.description}
                            </div>
                          )}
                        </div>
                      )}
                    />
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
              保存权限
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}