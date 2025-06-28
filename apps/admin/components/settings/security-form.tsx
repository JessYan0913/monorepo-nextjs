"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(6, {
      message: "密码至少需要6个字符",
    }),
    newPassword: z.string().min(6, {
      message: "密码至少需要6个字符",
    }),
    confirmPassword: z.string().min(6, {
      message: "密码至少需要6个字符",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "新密码和确认密码不匹配",
    path: ["confirmPassword"],
  })

export function SecurityForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [loginNotificationsEnabled, setLoginNotificationsEnabled] = useState(true)

  const form = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  function onSubmit(values: z.infer<typeof passwordFormSchema>) {
    setIsLoading(true)

    // 模拟API调用
    setTimeout(() => {
      setIsLoading(false)
      console.log(values)

      toast({
        title: "密码已更新",
        description: "您的密码已成功更新",
      })

      form.reset()
    }, 1000)
  }

  const handleTwoFactorChange = (checked: boolean) => {
    setTwoFactorEnabled(checked)

    toast({
      title: checked ? "两步验证已启用" : "两步验证已禁用",
      description: checked ? "您的账户现在受到两步验证的保护" : "您的账户不再使用两步验证",
    })
  }

  const handleLoginNotificationsChange = (checked: boolean) => {
    setLoginNotificationsEnabled(checked)

    toast({
      title: checked ? "登录通知已启用" : "登录通知已禁用",
      description: checked ? "您将在每次登录时收到通知" : "您将不再收到登录通知",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">修改密码</h3>
        <p className="text-sm text-muted-foreground">更新您的账户密码</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>当前密码</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="请输入当前密码" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>新密码</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="请输入新密码" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>确认新密码</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="请再次输入新密码" {...field} />
                </FormControl>
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
                  更新中...
                </>
              ) : (
                "更新密码"
              )}
            </Button>
          </div>
        </form>
      </Form>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">安全选项</h3>
          <p className="text-sm text-muted-foreground">配置账户安全选项</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <FormLabel>两步验证</FormLabel>
              <FormDescription>启用两步验证以增强账户安全性</FormDescription>
            </div>
            <Switch checked={twoFactorEnabled} onCheckedChange={handleTwoFactorChange} />
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <FormLabel>登录通知</FormLabel>
              <FormDescription>在每次登录时发送电子邮件通知</FormDescription>
            </div>
            <Switch checked={loginNotificationsEnabled} onCheckedChange={handleLoginNotificationsChange} />
          </div>
        </div>
      </div>
    </div>
  )
}
