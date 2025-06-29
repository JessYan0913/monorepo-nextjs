"use client"

import { useState } from "react"
import { Button } from "@repo/ui/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form"
import { Input } from "@repo/ui/components/ui/input"
import { Textarea } from "@repo/ui/components/ui/textarea"
import { Checkbox } from "@repo/ui/components/ui/checkbox"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "角色名称至少需要2个字符",
  }),
  description: z.string().min(5, {
    message: "描述至少需要5个字符",
  }),
  permissions: z.array(z.string()).min(1, {
    message: "至少选择一个权限",
  }),
})

const availablePermissions = [
  { id: "user_view", label: "查看用户" },
  { id: "user_create", label: "创建用户" },
  { id: "user_edit", label: "编辑用户" },
  { id: "user_delete", label: "删除用户" },
  { id: "role_view", label: "查看角色" },
  { id: "role_create", label: "创建角色" },
  { id: "role_edit", label: "编辑角色" },
  { id: "role_delete", label: "删除角色" },
  { id: "system_settings", label: "系统设置" },
  { id: "audit_logs", label: "审计日志" },
]

type RoleFormProps = {
  onSubmit: (data: z.infer<typeof formSchema>) => void
  defaultValues?: Partial<z.infer<typeof formSchema>>
}

export function RoleForm({ onSubmit, defaultValues }: RoleFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      name: "",
      description: "",
      permissions: [],
    },
  })

  function handleSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    // 模拟API调用
    setTimeout(() => {
      setIsLoading(false)
      onSubmit(values)
    }, 1000)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>角色名称</FormLabel>
              <FormControl>
                <Input placeholder="请输入角色名称" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>描述</FormLabel>
              <FormControl>
                <Textarea placeholder="请输入角色描述" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="permissions"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>权限</FormLabel>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {availablePermissions.map((permission) => (
                  <FormField
                    key={permission.id}
                    control={form.control}
                    name="permissions"
                    render={({ field }) => {
                      return (
                        <FormItem key={permission.id} className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(permission.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, permission.id])
                                  : field.onChange(field.value?.filter((value) => value !== permission.id))
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{permission.label}</FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            重置
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                提交中...
              </>
            ) : (
              "提交"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
