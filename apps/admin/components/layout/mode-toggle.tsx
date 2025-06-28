"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"

export function ModeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)

  // 避免水合不匹配
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)

    const themeName = newTheme === "system" ? "系统" : newTheme === "dark" ? "深色" : "浅色"

    toast({
      title: "主题已更改",
      description: `已切换至${themeName}主题`,
      duration: 2000,
    })
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon">
        <span className="h-[1.2rem] w-[1.2rem]"></span>
        <span className="sr-only">切换主题</span>
      </Button>
    )
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">切换主题</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => handleThemeChange("light")}
          className={currentTheme === "light" ? "bg-accent" : ""}
        >
          浅色
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange("dark")}
          className={currentTheme === "dark" ? "bg-accent" : ""}
        >
          深色
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("system")} className={theme === "system" ? "bg-accent" : ""}>
          系统
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
