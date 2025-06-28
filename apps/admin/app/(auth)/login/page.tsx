import { LoginForm } from "@/components/auth/login-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-6">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <span className="font-bold">企业管理平台</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/online-system">演示入口</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12">
          <div className="grid gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">欢迎使用企业管理平台</h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                高效、安全的企业级管理系统，助力企业数字化转型
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-4 border p-6 rounded-lg shadow-sm">
              <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold">登录</h2>
                <p className="text-sm text-muted-foreground">输入您的账号和密码登录系统</p>
              </div>
              <LoginForm />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
