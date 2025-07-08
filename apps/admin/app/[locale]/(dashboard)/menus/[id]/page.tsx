"use client"

import * as React from "react"
import { useRouter, notFound } from "next/navigation"
import Link from "next/link"
import { z } from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Save } from "lucide-react"
import useSWR from "swr"

import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"
import { getMenu } from "@/lib/actions/menu"

// Define the menu schema for form validation
const menuEditSchema = z.object({
  menuId: z.string({
    required_error: "菜单ID是必填项",
  }),
  menuName: z.string({
    required_error: "请输入菜单名称",
  }),
  menuPath: z.string({
    required_error: "请输入菜单路径",
  }),
  menuType: z.string({
    required_error: "请选择菜单类型",
  }),
})

// Mock data for development purposes
const mockMenuData = {
  menuId: "1",
  menuName: "系统管理",
  menuPath: "/system",
  menuType: "dir",
  createId: 1,
  createName: "系统",
  createTime: "2023-01-01 00:00:00",
  updateId: 1,
  updateName: "系统",
  updateTime: "2023-01-01 00:00:00"
}

type MenuFormValues = z.infer<typeof menuEditSchema>

export default function MenuEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  const router = useRouter()

  // Fetch menu data
  const { data: menu = mockMenuData, isLoading } = useSWR(`${process.env.BASE_URL}/permission/manage/get/menu`, async (url: string) => {
    try {
      return await getMenu(id)
    } catch (error) {
      console.error("Error fetching menu:", error)
      notFound()
    }
  }, { 
    revalidateOnFocus: false
  })

  // Initialize form with menu data
  const form = useForm<MenuFormValues>({
    resolver: zodResolver(menuEditSchema),
    defaultValues: {
      menuId: menu.menuId.toString(),
      menuName: menu.menuName,
      menuPath: menu.menuPath,
      menuType: menu.menuType,
    },
  })

  // Handle form submission
  const submit = form.handleSubmit(async () => { 
    // In a real implementation, this would update the menu
    // const result = await updateMenu(form.getValues())
    router.back()
  })

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center">
        <Link 
          href="/menus" 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回列表
        </Link>
      </div>

      <Card className="border rounded-lg shadow-sm">
        <Form {...form}>
          <form onSubmit={submit}>
            <input type="hidden" {...form.register("menuId")} value={id} />
            <CardHeader>
              <CardTitle>菜单信息</CardTitle>
              <CardDescription>编辑菜单的基本信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <FormField
                control={form.control}
                name="menuName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="menuName" className="text-sm font-medium">
                      菜单名称
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="menuName"
                        placeholder="请输入菜单名称"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="menuPath"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="menuPath" className="text-sm font-medium">
                      菜单路径
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="menuPath"
                        placeholder="请输入菜单路径"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="menuType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="menuType" className="text-sm font-medium">
                      菜单类型
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="请选择菜单类型" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="dir">目录</SelectItem>
                        <SelectItem value="page">页面</SelectItem>
                        <SelectItem value="button">按钮</SelectItem>
                      </SelectContent>
                    </Select>
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
                保存更改
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}