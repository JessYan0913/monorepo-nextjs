"use client"

import * as React from "react"
import { Button } from "@repo/ui/components/ui/button"
import { Input } from "@repo/ui/components/ui/input"
import { Checkbox } from "@repo/ui/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Badge } from "@repo/ui/components/ui/badge"
import { Separator } from "@repo/ui/components/ui/separator"
import { ChevronRight, ChevronLeft, Search, Loader2, ChevronsRight, ChevronsLeft } from "lucide-react"
import { cn } from "@repo/ui/lib/utils"

// ==================== Types ====================
export interface TransferOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
}

interface TransferContextValue {
  value: string[]
  onValueChange: (value: string[]) => void
  options: TransferOption[]
  searchable: boolean
  loading: boolean
  onSearch?: (query: string) => void
}

const TransferContext = React.createContext<TransferContextValue | null>(null)

interface TransferProps {
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  options?: TransferOption[]
  searchable?: boolean
  onSearch?: (query: string) => Promise<TransferOption[]>
  titles?: [string, string]
  className?: string
  children?: React.ReactNode
}

const Transfer = React.forwardRef<HTMLDivElement, TransferProps>(
  (
    {
      value: controlledValue,
      defaultValue = [],
      onValueChange,
      options = [],
      searchable = true,
      onSearch,
      titles = ["可选项", "已选项"],
      className,
      children,
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState<string[]>(defaultValue)
    const [searchQuery, setSearchQuery] = React.useState("")
    const [searchResults, setSearchResults] = React.useState<TransferOption[]>([])
    const [loading, setLoading] = React.useState(false)
    const [leftSelected, setLeftSelected] = React.useState<string[]>([])
    const [rightSelected, setRightSelected] = React.useState<string[]>([])

    const value = controlledValue ?? internalValue
    const handleValueChange = onValueChange ?? setInternalValue

    // 处理搜索
    const handleSearch = React.useCallback(
      async (query: string) => {
        setSearchQuery(query)
        if (!onSearch || !query.trim()) {
          setSearchResults([])
          return
        }

        setLoading(true)
        try {
          const results = await onSearch(query)
          setSearchResults(results)
        } catch (error) {
          console.error("Search error:", error)
          setSearchResults([])
        } finally {
          setLoading(false)
        }
      },
      [onSearch],
    )

    // 搜索防抖
    React.useEffect(() => {
      const timer = setTimeout(() => {
        if (searchQuery !== "") {
          handleSearch(searchQuery)
        }
      }, 300)
      return () => clearTimeout(timer)
    }, [searchQuery, handleSearch])

    // 获取所有可用选项（原始选项 + 搜索结果）
    const allOptions = React.useMemo(() => {
      const optionMap = new Map<string, TransferOption>()

      // 添加原始选项
      options.forEach((option) => optionMap.set(option.value, option))

      // 添加搜索结果
      searchResults.forEach((option) => optionMap.set(option.value, option))

      return Array.from(optionMap.values())
    }, [options, searchResults])

    // 分离左右选项
    const leftOptions = allOptions.filter((option) => !value.includes(option.value))
    const rightOptions = allOptions.filter((option) => value.includes(option.value))

    // 过滤搜索
    const filteredLeftOptions = React.useMemo(() => {
      if (!searchQuery.trim()) return leftOptions
      return leftOptions.filter(
        (option) =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          option.description?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }, [leftOptions, searchQuery])

    const filteredRightOptions = React.useMemo(() => {
      if (!searchQuery.trim()) return rightOptions
      return rightOptions.filter(
        (option) =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          option.description?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }, [rightOptions, searchQuery])

    // 移动操作
    const moveToRight = () => {
      if (leftSelected.length === 0) return
      handleValueChange([...value, ...leftSelected])
      setLeftSelected([])
    }

    const moveToLeft = () => {
      if (rightSelected.length === 0) return
      handleValueChange(value.filter((v) => !rightSelected.includes(v)))
      setRightSelected([])
    }

    const moveAllToRight = () => {
      const availableValues = filteredLeftOptions.filter((option) => !option.disabled).map((option) => option.value)
      if (availableValues.length === 0) return
      handleValueChange([...value, ...availableValues])
      setLeftSelected([])
    }

    const moveAllToLeft = () => {
      const availableValues = filteredRightOptions.filter((option) => !option.disabled).map((option) => option.value)
      if (availableValues.length === 0) return
      handleValueChange(value.filter((v) => !availableValues.includes(v)))
      setRightSelected([])
    }

    const contextValue: TransferContextValue = {
      value,
      onValueChange: handleValueChange,
      options: allOptions,
      searchable,
      loading,
      onSearch: handleSearch,
    }

    return (
      <TransferContext.Provider value={contextValue}>
        <div ref={ref} className={cn("flex items-center gap-4", className)}>
          {/* 左侧面板 */}
          <Card className="flex-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{titles[0]}</CardTitle>
                <Badge variant="secondary">
                  {leftSelected.length}/{filteredLeftOptions.length}
                </Badge>
              </div>
              {searchable && (
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="搜索..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              )}
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="ml-2 text-sm text-muted-foreground">搜索中...</span>
                  </div>
                ) : filteredLeftOptions.length === 0 ? (
                  <div className="text-center py-8 text-sm text-muted-foreground">暂无数据</div>
                ) : (
                  filteredLeftOptions.map((option) => (
                    <TransferItem
                      key={option.value}
                      option={option}
                      selected={leftSelected.includes(option.value)}
                      onSelect={(selected) => {
                        if (selected) {
                          setLeftSelected([...leftSelected, option.value])
                        } else {
                          setLeftSelected(leftSelected.filter((v) => v !== option.value))
                        }
                      }}
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* 控制按钮 */}
          <div className="flex flex-col gap-2">
            <Button variant="outline" size="icon" onClick={moveToRight} disabled={leftSelected.length === 0}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={moveAllToRight}
              disabled={filteredLeftOptions.filter((option) => !option.disabled).length === 0}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
            <Separator />
            <Button
              variant="outline"
              size="icon"
              onClick={moveAllToLeft}
              disabled={filteredRightOptions.filter((option) => !option.disabled).length === 0}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={moveToLeft} disabled={rightSelected.length === 0}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>

          {/* 右侧面板 */}
          <Card className="flex-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{titles[1]}</CardTitle>
                <Badge variant="secondary">
                  {rightSelected.length}/{filteredRightOptions.length}
                </Badge>
              </div>
              {searchable && (
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="搜索已选项..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              )}
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1 max-h-64 overflow-y-auto">
                {filteredRightOptions.length === 0 ? (
                  <div className="text-center py-8 text-sm text-muted-foreground">暂无数据</div>
                ) : (
                  filteredRightOptions.map((option) => (
                    <TransferItem
                      key={option.value}
                      option={option}
                      selected={rightSelected.includes(option.value)}
                      onSelect={(selected) => {
                        if (selected) {
                          setRightSelected([...rightSelected, option.value])
                        } else {
                          setRightSelected(rightSelected.filter((v) => v !== option.value))
                        }
                      }}
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* 渲染子组件（如果有的话） */}
          {children}
        </div>
      </TransferContext.Provider>
    )
  },
)
Transfer.displayName = "Transfer"

interface TransferItemProps {
  option: TransferOption
  selected: boolean
  onSelect: (selected: boolean) => void
}

const TransferItem = ({ option, selected, onSelect }: TransferItemProps) => {
  const handleClick = () => {
    if (option.disabled) return
    onSelect(!selected)
  }

  return (
    <div
      className={cn(
        "flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors hover:bg-muted/50",
        selected && "bg-muted",
        option.disabled && "opacity-50 cursor-not-allowed",
      )}
      onClick={handleClick}
    >
      <Checkbox checked={selected} disabled={option.disabled} onChange={() => {}} />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium truncate">{option.label}</div>
        {option.description && <div className="text-xs text-muted-foreground truncate">{option.description}</div>}
      </div>
    </div>
  )
}
export { Transfer }
