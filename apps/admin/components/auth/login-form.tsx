"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useSystemStore } from "@/store/useSystemStore"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "用户名至少需要2个字符",
  }),
  password: z.string().min(6, {
    message: "密码至少需要6个字符",
  }),
  userType: z.enum(["student", "teacher"], {
    required_error: "请选择用户类型",
  }),
})

export function LoginForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showSystemDialog, setShowSystemDialog] = useState(false)
  const setSystemType = useSystemStore(state => state.setSystemType)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      userType: "student",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    // 模拟API调用
    setTimeout(() => {
      console.log(values)
      setIsLoading(false)

      // 模拟登录成功
      try {
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: "1",
            name: values.username,
            role: values.userType === "student" ? "学生" : "教师",
            userType: values.userType,
          }),
        )
      } catch (error) {
        console.error("Failed to save login state:", error)
        toast({
          title: "登录失败",
          description: "无法保存登录状态，请重试",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      toast({
        title: "登录成功",
        description: "欢迎回来，" + values.username,
      })

      // 显示系统选择对话框
      setShowSystemDialog(true)
    }, 1000)
  }

  // 处理系统选择
  const handleSystemSelect = (systemType: "online" | "offline") => {
    setShowSystemDialog(false)
    
    // 使用已获取的 setSystemType 函数
    setSystemType(systemType)
    
    // 根据系统类型跳转到不同的页面
    if (systemType === "online") {
      router.push("/online-system")
    } else {
      router.push("/offline-system")
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>密码</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input type={showPassword ? "text" : "password"} placeholder="请输入密码" {...field} />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={togglePasswordVisibility}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="sr-only">{showPassword ? "隐藏密码" : "显示密码"}</span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userType"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>用户类型</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="student" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">学生</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="teacher" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">教师</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              登录中...
            </>
          ) : (
            "登录"
          )}
        </Button>
      </form>
    </Form>

    {/* 系统选择对话框 */}
    <Dialog open={showSystemDialog} onOpenChange={setShowSystemDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>选择系统</DialogTitle>
          <DialogDescription>
            请选择您要进入的系统类型
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <Button
            onClick={() => handleSystemSelect("online")}
            className="h-24 flex flex-col items-center justify-center space-y-2"
          >
            <span className="text-lg">线上系统</span>
            <span className="text-xs text-muted-foreground">适用于远程教学和学习</span>
          </Button>
          <Button
            onClick={() => handleSystemSelect("offline")}
            variant="outline"
            className="h-24 flex flex-col items-center justify-center space-y-2"
          >
            <span className="text-lg">线下系统</span>
            <span className="text-xs text-muted-foreground">适用于课堂和实地教学</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
    </>
  )
}
