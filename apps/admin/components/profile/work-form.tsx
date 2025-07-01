"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@repo/ui/components/ui/button"
import { Input } from "@repo/ui/components/ui/input"
import { Textarea } from "@repo/ui/components/ui/textarea"
import { FileUploader } from "@repo/ui/components/file-uploader"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form"

// 定义工作信息验证规则
const workFormSchema = z.object({
  campus: z
    .string({
      required_error: "请选择所属校区",
    })
    .min(2, {
      message: "校区名称至少需要2个字符",
    })
    .max(50, {
      message: "校区名称不能超过50个字符",
    }),
  
  position: z
    .string({
      required_error: "请输入职位名称",
    })
    .min(2, {
      message: "职位名称至少需要2个字符",
    })
    .max(50, {
      message: "职位名称不能超过50个字符",
    }),
    
  role: z
    .string({
      required_error: "请选择角色",
    })
    .min(1, {
      message: "请选择角色",
    }),
    
  qualification: z
    .any()
    .optional()
    .describe("教学资质文件")
})

type WorkFormValues = z.infer<typeof workFormSchema>

interface WorkFormProps {
  user: {
    campus: string
    position: string
    role: string
    qualification: string
  }
  closeEditSection: () => void
}

export function WorkForm({ user, closeEditSection }: WorkFormProps) {
  const form = useForm<WorkFormValues>({
    resolver: zodResolver(workFormSchema),
    defaultValues: {
      campus: user.campus,
      position: user.position,
      role: user.role,
      qualification: undefined,
    },
  })

  const submit = form.handleSubmit((data) => {
    console.log(data)
    // 这里可以处理文件上传逻辑
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
              name="campus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="campus" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    所属校区
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="campus"
                      placeholder="请输入所属校区"
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
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="position" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    职位
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="position"
                      placeholder="请输入职位名称"
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
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="role" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    角色
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger id="role" className="w-full">
                        <SelectValue placeholder="请选择角色" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">管理员</SelectItem>
                        <SelectItem value="teacher">教师</SelectItem>
                        <SelectItem value="staff">员工</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="qualification"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel htmlFor="qualification" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    教学资质
                  </FormLabel>
                  <FormControl>
                    <FileUploader
                      inputId="qualification"
                      onFileChange={(file) => {
                        field.onChange(file)
                      }}
                      acceptedFileTypes=".pdf,.doc,.docx"
                      className="mt-1"
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