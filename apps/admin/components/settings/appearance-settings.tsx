"use client"

import { useState, useEffect } from "react"
import { Button } from "@repo/ui/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@repo/ui/components/ui/radio-group"
import { Label } from "@repo/ui/components/ui/label"
import { Separator } from "@repo/ui/components/ui/separator"
import { useTheme } from "next-themes"
import { toast } from "@repo/ui/components/ui/sonner"
import { Loader2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"
import { Slider } from "@repo/ui/components/ui/slider"

export function AppearanceSettings() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [isLoading, setIsLoading] = useState(false)
  const [fontSize, setFontSize] = useState("medium")
  const [density, setDensity] = useState(1)
  const [animationsEnabled, setAnimationsEnabled] = useState(true)
  const [mounted, setMounted] = useState(false)

  // 避免水合不匹配
  useEffect(() => {
    setMounted(true)

    // 从localStorage加载设置
    try {
      const savedFontSize = localStorage.getItem("fontSize")
      if (savedFontSize) setFontSize(savedFontSize)

      const savedDensity = localStorage.getItem("density")
      if (savedDensity) setDensity(Number.parseInt(savedDensity))

      const savedAnimations = localStorage.getItem("animationsEnabled")
      if (savedAnimations) setAnimationsEnabled(savedAnimations === "true")
    } catch (error) {
      console.error("Failed to load appearance settings:", error)
    }
  }, [])

  const handleSave = () => {
    setIsLoading(true)

    // 保存设置到localStorage
    try {
      localStorage.setItem("fontSize", fontSize)
      localStorage.setItem("density", density.toString())
      localStorage.setItem("animationsEnabled", animationsEnabled.toString())

      // 应用字体大小
      document.documentElement.style.fontSize = fontSize === "small" ? "14px" : fontSize === "large" ? "18px" : "16px"

      // 应用动画设置
      if (!animationsEnabled) {
        document.documentElement.classList.add("reduce-motion")
      } else {
        document.documentElement.classList.remove("reduce-motion")
      }
    } catch (error) {
      console.error("Failed to save appearance settings:", error)
    }

    // 模拟API调用
    setTimeout(() => {
      setIsLoading(false)

      toast.success("外观设置已更新")
    }, 500)
  }

  if (!mounted) {
    return <div>加载中...</div>
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">主题</h3>
          <p className="text-sm text-muted-foreground">选择系统的显示主题</p>
        </div>

        <RadioGroup
          value={theme || "system"}
          onValueChange={(value) => setTheme(value)}
          className="grid grid-cols-3 gap-4"
        >
          <div>
            <RadioGroupItem value="light" id="light" className="sr-only" />
            <Label
              htmlFor="light"
              className={`flex flex-col items-center justify-between rounded-md border-2 ${
                currentTheme === "light" ? "border-primary" : "border-muted"
              } bg-popover p-4 hover:bg-accent hover:text-accent-foreground`}
            >
              <div className="mb-2 h-16 w-16 rounded-md border border-muted bg-background"></div>
              浅色
            </Label>
          </div>
          <div>
            <RadioGroupItem value="dark" id="dark" className="sr-only" />
            <Label
              htmlFor="dark"
              className={`flex flex-col items-center justify-between rounded-md border-2 ${
                currentTheme === "dark" ? "border-primary" : "border-muted"
              } bg-popover p-4 hover:bg-accent hover:text-accent-foreground`}
            >
              <div className="mb-2 h-16 w-16 rounded-md border border-muted bg-slate-950"></div>
              深色
            </Label>
          </div>
          <div>
            <RadioGroupItem value="system" id="system" className="sr-only" />
            <Label
              htmlFor="system"
              className={`flex flex-col items-center justify-between rounded-md border-2 ${
                theme === "system" ? "border-primary" : "border-muted"
              } bg-popover p-4 hover:bg-accent hover:text-accent-foreground`}
            >
              <div className="mb-2 h-16 w-16 rounded-md border border-muted bg-background [mask-image:linear-gradient(to_right,white_50%,transparent_50%)] dark:[mask-image:linear-gradient(to_right,black_50%,transparent_50%)]"></div>
              跟随系统
            </Label>
          </div>
        </RadioGroup>

        <Separator className="my-4" />

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">字体大小</h3>
            <p className="text-sm text-muted-foreground">调整系统的字体大小</p>
          </div>

          <Select value={fontSize} onValueChange={setFontSize}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="选择字体大小" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="small">小</SelectItem>
              <SelectItem value="medium">中</SelectItem>
              <SelectItem value="large">大</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator className="my-4" />

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">界面密度</h3>
            <p className="text-sm text-muted-foreground">调整界面元素的密度</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>紧凑</span>
              <span>舒适</span>
            </div>
            <Slider value={[density]} min={0} max={2} step={1} onValueChange={(value) => setDensity(value[0])} />
          </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">动画效果</h3>
            <p className="text-sm text-muted-foreground">控制界面动画效果</p>
          </div>

          <RadioGroup
            value={animationsEnabled ? "enabled" : "disabled"}
            onValueChange={(value) => setAnimationsEnabled(value === "enabled")}
            className="grid grid-cols-2 gap-4"
          >
            <div>
              <RadioGroupItem value="enabled" id="animations-enabled" className="sr-only" />
              <Label
                htmlFor="animations-enabled"
                className={`flex flex-col items-center justify-between rounded-md border-2 ${
                  animationsEnabled ? "border-primary" : "border-muted"
                } bg-popover p-4 hover:bg-accent hover:text-accent-foreground`}
              >
                启用
              </Label>
            </div>
            <div>
              <RadioGroupItem value="disabled" id="animations-disabled" className="sr-only" />
              <Label
                htmlFor="animations-disabled"
                className={`flex flex-col items-center justify-between rounded-md border-2 ${
                  !animationsEnabled ? "border-primary" : "border-muted"
                } bg-popover p-4 hover:bg-accent hover:text-accent-foreground`}
              >
                禁用
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button
          variant="outline"
          onClick={() => {
            setTheme("system")
            setFontSize("medium")
            setDensity(1)
            setAnimationsEnabled(true)
          }}
        >
          重置
        </Button>
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              保存中...
            </>
          ) : (
            "保存设置"
          )}
        </Button>
      </div>
    </div>
  )
}
