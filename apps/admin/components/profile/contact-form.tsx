"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@repo/ui/components/ui/button"
import { Input } from "@repo/ui/components/ui/input"
import { Textarea } from "@repo/ui/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form"

// 定义联系信息验证规则
const contactFormSchema = z.object({
  email: z
    .string({
      required_error: "请输入邮箱地址",
    })
    .email({
      message: "请输入有效的邮箱地址",
    })
    .max(100, {
      message: "邮箱地址不能超过100个字符",
    }),
  
  phone: z
    .string({
      required_error: "请输入手机号码",
    })
    .regex(/^1[3-9]\d{9}$/, {
      message: "请输入有效的手机号码",
    }),
    
  address: z
    .string({
      required_error: "请输入联系地址",
    })
    .max(200, {
      message: "联系地址不能超过200个字符",
    })
})

type ContactFormValues = z.infer<typeof contactFormSchema>

interface ContactFormProps {
  user: {
    email: string
    phone: string
    address: string
  }
  closeEditSection: () => void
}

export function ContactForm({ user, closeEditSection }: ContactFormProps) {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: user.email,
      phone: user.phone,
      address: user.address,
    },
  })

  const submit = form.handleSubmit((data) => {
    console.log(data)
    closeEditSection()
  })

  const cancel = () => {
    form.reset()
    closeEditSection()
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
      <Form {...form}>
        <form onSubmit={submit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    电子邮箱
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@domain.com"
                      className="mt-1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    手机号码
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="13800138000"
                      className="mt-1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="address" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    联系地址
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      id="address"
                      placeholder="请输入详细地址"
                      className="mt-1 min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={cancel}>
              取消
            </Button>
            <Button type="submit">
              保存
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
