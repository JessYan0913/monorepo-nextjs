import Link from "next/link"
import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { FileQuestion, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileQuestion className="h-6 w-6 text-muted-foreground" />
            <CardTitle>页面未找到</CardTitle>
          </div>
          <CardDescription>抱歉，您访问的页面不存在或已被移除。</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8">
            <p className="text-8xl font-bold text-muted-foreground">404</p>
            <p className="mt-4 text-center text-muted-foreground">请检查您输入的URL是否正确，或返回首页继续浏览。</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              返回首页
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
