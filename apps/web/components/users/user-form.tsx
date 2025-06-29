"use client"

import { useState } from "react"
import { Button } from "@repo/ui/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form"
import { Input } from "@repo/ui/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "用户名至少需要2个字符",
  }),
  email: z.string().email({
    message: "请输入有效的邮箱地址",
  }),
  role: z.string({
    required_error: "请选择用户角色",
  }),
})

type UserFormProps = {
  onSubmit: (data: z.infer<typeof formSchema>) => void
  defaultValues?: Partial<z.infer<typeof formSchema>>
}

export function UserForm({ onSubmit, defaultValues }: UserFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      username: "",
      email: "",
      role: "",
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>用户名</FormLabel>
              <FormControl>
                <Input placeholder="请输入用户名" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>邮箱</FormLabel>
              <FormControl>
                <Input type="email" placeholder="请输入邮箱" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>角色</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="选择用户角色" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="admin">管理员</SelectItem>
                  <SelectItem value="editor">编辑</SelectItem>
                  <SelectItem value="user">普通用户</SelectItem>
                  <SelectItem value="guest">访客</SelectItem>
                </SelectContent>
              </Select>
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
