"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Settings,
  BarChart4,
  FileText,
  Bell,
  HelpCircle,
  Search,
  Calendar,
  CheckSquare,
  MessageSquare,
} from "lucide-react"
import { Button } from "@/components/ui/button"

// 搜索结果类型
type SearchResult = {
  id: string
  title: string
  category: string
  url: string
  icon: React.ElementType
  keywords?: string[] // 添加关键词以提高搜索匹配度
}

// 搜索数据
const searchData: SearchResult[] = [
  // 页面
  {
    id: "dashboard",
    title: "仪表盘",
    category: "页面",
    url: "/online-system",
    icon: LayoutDashboard,
    keywords: ["首页", "概览", "统计", "数据"],
  },
  {
    id: "users",
    title: "用户管理",
    category: "页面",
    url: "/users",
    icon: Users,
    keywords: ["用户", "账号", "人员"],
  },
  {
    id: "permissions",
    title: "权限管理",
    category: "页面",
    url: "/permissions",
    icon: ShieldCheck,
    keywords: ["权限", "角色", "安全"],
  },
  {
    id: "analytics",
    title: "数据分析",
    category: "页面",
    url: "/analytics",
    icon: BarChart4,
    keywords: ["分析", "统计", "图表"],
  },
  {
    id: "content",
    title: "内容管理",
    category: "页面",
    url: "/content",
    icon: FileText,
    keywords: ["内容", "文章", "资料"],
  },
  {
    id: "notifications",
    title: "通知中心",
    category: "页面",
    url: "/notifications",
    icon: Bell,
    keywords: ["通知", "消息", "提醒"],
  },
  {
    id: "tasks",
    title: "任务管理",
    category: "页面",
    url: "/tasks",
    icon: CheckSquare,
    keywords: ["任务", "待办", "工作"],
  },
  {
    id: "calendar",
    title: "日程安排",
    category: "页面",
    url: "/calendar",
    icon: Calendar,
    keywords: ["日程", "日历", "安排", "计划"],
  },
  {
    id: "messages",
    title: "消息中心",
    category: "页面",
    url: "/messages",
    icon: MessageSquare,
    keywords: ["消息", "聊天", "交流"],
  },
  {
    id: "settings",
    title: "系统设置",
    category: "页面",
    url: "/settings",
    icon: Settings,
    keywords: ["设置", "配置", "选项"],
  },
  {
    id: "help",
    title: "帮助中心",
    category: "页面",
    url: "/help",
    icon: HelpCircle,
    keywords: ["帮助", "支持", "指南"],
  },

  // 功能
  {
    id: "add-user",
    title: "添加用户",
    category: "功能",
    url: "/users?action=add",
    icon: Users,
    keywords: ["添加", "创建", "新建", "用户"],
  },
  {
    id: "add-role",
    title: "添加角色",
    category: "功能",
    url: "/permissions?action=add",
    icon: ShieldCheck,
    keywords: ["添加", "创建", "新建", "角色", "权限"],
  },
  {
    id: "profile",
    title: "个人资料",
    category: "功能",
    url: "/profile",
    icon: Users,
    keywords: ["个人", "资料", "信息", "账号"],
  },
  {
    id: "security",
    title: "安全设置",
    category: "功能",
    url: "/settings?tab=security",
    icon: Settings,
    keywords: ["安全", "密码", "保护"],
  },
  {
    id: "notifications-settings",
    title: "通知设置",
    category: "功能",
    url: "/settings?tab=notifications",
    icon: Bell,
    keywords: ["通知", "提醒", "设置"],
  },

  // 文档
  {
    id: "user-guide",
    title: "用户指南",
    category: "文档",
    url: "/help?doc=user-guide",
    icon: FileText,
    keywords: ["指南", "教程", "说明"],
  },
  {
    id: "api-docs",
    title: "API文档",
    category: "文档",
    url: "/help?doc=api",
    icon: FileText,
    keywords: ["API", "接口", "开发"],
  },
  {
    id: "faq",
    title: "常见问题",
    category: "文档",
    url: "/help?doc=faq",
    icon: HelpCircle,
    keywords: ["问题", "FAQ", "解答"],
  },
]

export function GlobalSearch() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const router = useRouter()

  // 快捷键监听
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSelect = (result: SearchResult) => {
    setOpen(false)
    router.push(result.url)
  }

  // 高级搜索过滤
  const filteredResults =
    search.trim() === ""
      ? searchData
      : searchData.filter((item) => {
          const searchLower = search.toLowerCase()

          // 检查标题
          if (item.title.toLowerCase().includes(searchLower)) {
            return true
          }

          // 检查关键词
          if (item.keywords?.some((keyword) => keyword.toLowerCase().includes(searchLower))) {
            return true
          }

          return false
        })

  // 按类别分组
  const groupedResults = {
    pages: filteredResults.filter((item) => item.category === "页面"),
    features: filteredResults.filter((item) => item.category === "功能"),
    docs: filteredResults.filter((item) => item.category === "文档"),
  }

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 xl:mr-2" />
        <span className="hidden xl:inline-flex">搜索...</span>
        <span className="sr-only">搜索</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 xl:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="搜索页面、功能、文档..." value={search} onValueChange={setSearch} />
        <CommandList>
          <CommandEmpty>没有找到结果</CommandEmpty>

          {groupedResults.pages.length > 0 && (
            <CommandGroup heading="页面">
              {groupedResults.pages.map((result) => (
                <CommandItem key={result.id} onSelect={() => handleSelect(result)} className="flex items-center">
                  <result.icon className="mr-2 h-4 w-4" />
                  <span>{result.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {groupedResults.features.length > 0 && (
            <CommandGroup heading="功能">
              {groupedResults.features.map((result) => (
                <CommandItem key={result.id} onSelect={() => handleSelect(result)} className="flex items-center">
                  <result.icon className="mr-2 h-4 w-4" />
                  <span>{result.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {groupedResults.docs.length > 0 && (
            <CommandGroup heading="文档">
              {groupedResults.docs.map((result) => (
                <CommandItem key={result.id} onSelect={() => handleSelect(result)} className="flex items-center">
                  <result.icon className="mr-2 h-4 w-4" />
                  <span>{result.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
