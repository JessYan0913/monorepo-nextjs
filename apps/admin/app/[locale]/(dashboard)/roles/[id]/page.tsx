"use client"

import * as React from "react"
import { useRouter, notFound } from "next/navigation"
import { z } from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, Save } from "lucide-react"
import useSWR from "swr"

import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Textarea } from "@repo/ui/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form"

// Define the role schema for form validation
const roleEditSchema = z.object({
  roleId: z.string({
    required_error: "角色ID是必填项",
  }),
  roleName: z.string({
    required_error: "请输入角色名称",
  }),
  roleRemark: z.string({
    required_error: "请输入角色备注",
  }),
})

// Mock data for development purposes
const mockRoleData = {
  roleId: "1",
  roleName: "管理员",
  roleRemark: "系统管理员，拥有所有权限",
  createId: 1,
  createName: "系统",
  createTime: "2023-01-01 00:00:00",
  updateId: 1,
  updateName: "系统",
  updateTime: "2023-01-01 00:00:00"
}

type RoleFormValues = z.infer<typeof roleEditSchema>

export default function RoleEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  const router = useRouter()

  // Fetch role data
  const { data: role = mockRoleData, isLoading } = useSWR(`${process.env.BASE_URL}/permission/manage/get/role`, async (url: string) => {
    // In a real implementation, this would fetch the role by ID
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "req-device": "pc"
      },
      body: JSON.stringify({ roleId: id }),
    })
    
    if (!res.ok) {
      throw new Error("Failed to fetch role")
    }
    
    const { data } = await res.json()
    return data
  }, { 
    onError: (error) => {
      console.error("Error fetching role:", error)
      notFound()
    },
    revalidateOnFocus: false
  })

  // Initialize form with role data
  const form = useForm<RoleFormValues>({
    resolver: zodResolver(roleEditSchema),
    defaultValues: {
      roleId: role.roleId.toString(),
      roleName: role.roleName,
      roleRemark: role.roleRemark,
    },
  })

  // Handle form submission
  const submit = form.handleSubmit(async () => { 
    
    router.back()
  })

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="mr-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">编辑角色</h1>
          <p className="text-muted-foreground">修改角色信息</p>
        </div>
      </div>

      <Card className="border rounded-lg shadow-sm">
        <Form {...form}>
          <form onSubmit={submit}>
            <input type="hidden" {...form.register("roleId")} value={id} />
            <CardHeader>
              <CardTitle>角色信息</CardTitle>
              <CardDescription>编辑角色的基本信息</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="roleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="roleName" className="text-sm font-medium">
                      角色名称
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="roleName"
                        placeholder="请输入角色名称"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="roleRemark"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="roleRemark" className="text-sm font-medium">
                      角色备注
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        id="roleRemark"
                        placeholder="请输入角色备注信息"
                        className="min-h-[100px]"
                        {...field}
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
                保存更改
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}