"use client"

import { z } from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "@repo/ui/components/ui/input"
import { Label } from "@repo/ui/components/ui/label"
import { Button } from "@repo/ui/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@repo/ui/components/ui/input-otp"
import { DatePicker } from "@repo/ui/components/ui/date-picker"
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/ui/radio-group"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form"
import { validateIdNumber } from "@repo/ui/lib/utils"

const imageEditSchema = z.object({
  name: z.string({
      required_error: "请输入姓名"
    })
    .min(2, {
      message: "姓名至少需要2个字符"
    })
    .max(30, {
      message: "姓名不能超过30个字符"
    })
    .regex(/^[\u4e00-\u9fa5\·\•\·]+$/, {
      message: "请输入有效的中文姓名"
    }),
  
  nickname: z.string()
    .max(20, {
      message: "昵称不能超过20个字符"
    })
    .optional()
    .or(z.literal('')),
  
  gender: z.enum(['男', '女'], {
      required_error: "请选择性别",
      invalid_type_error: "性别必须为'男'或'女'"
    }),
  
  birthdate: z.date({
      required_error: "请选择出生日期",
      invalid_type_error: "请选择有效日期"
    })
    .max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)), {
      message: "必须年满18岁"
    })
    .min(new Date('1900-01-01'), {
      message: "出生日期无效"
    }),
  
  idNumber: z.string({
      required_error: "请输入身份证号"
    })
    .min(15, {
      message: "身份证号格式不正确"
    })
    .max(18, {
      message: "身份证号格式不正确"
    })
    .refine(validateIdNumber, {
      message: "请输入有效的身份证号"
    })
})

type BaseFormValues = z.infer<typeof imageEditSchema>

interface BaseFormProps {
  user: {
    name: string
    nickname: string
    gender: string
    birthdate: string
    idNumber: string
  };
  closeEditSection: () => void;
}

export function BaseForm({ user, closeEditSection }: BaseFormProps) {
  const form = useForm<BaseFormValues>({
    resolver: zodResolver(imageEditSchema),
    defaultValues: {
      name: user.name,
      nickname: user.nickname,
      gender: user.gender as "男" | "女",
      birthdate: new Date(user.birthdate),
      idNumber: user.idNumber
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
              name="name"
              render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name" className="text-sm font-medium text-gray-700">
                      姓名
                    </FormLabel>
                    <FormControl>
                      <Input id="name" type="text" {...field} className="mt-1" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="nickname" className="text-sm font-medium text-gray-700">
                      昵称
                    </FormLabel>
                    <FormControl>
                      <Input id="nickname" type="text" {...field} className="mt-1" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="gender" className="text-sm font-medium text-gray-700">
                      性别
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        id="gender"
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="男" />
                            <Label htmlFor="gender" className="text-sm font-medium text-gray-700">
                              男
                            </Label>
                          </div>  
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="女" />
                            <Label htmlFor="gender" className="text-sm font-medium text-gray-700">
                              女
                            </Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <FormField
              control={form.control}
              name="birthdate"
              render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="birthdate" className="text-sm font-medium text-gray-700">
                      出生日期
                    </FormLabel>
                    <FormControl>
                      <DatePicker id="birthdate" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <div className="md:col-span-2">
              <FormField
                control={form.control}
                name="idNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="idNumber" className="text-sm font-medium text-gray-700">
                      身份证号
                    </FormLabel>
                    <FormControl>
                    <InputOTP maxLength={18} {...field}>
                      <InputOTPGroup>
                        {Array.from({ length: 18 }).map((_, i) => (
                          <InputOTPSlot key={i} index={i} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
