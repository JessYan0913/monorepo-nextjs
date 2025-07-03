"use client"

import type React from "react"

import { useState } from "react"
import { Check, ChevronDown, X } from "lucide-react"

import { cn } from "@repo/ui/lib/utils"
import { Badge } from "@repo/ui/components/ui/badge"
import { Button } from "@repo/ui/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@repo/ui/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/ui/popover"

interface Option {
  label: string
  value: string
}

export interface MultiSelectProps {
  options: Option[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  className?: string
  disabled?: boolean
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "选择选项...",
  searchPlaceholder = "搜索选项...",
  className,
  disabled = false,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false)

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item))
  }

  const handleSelect = (item: string) => {
    if (selected.includes(item)) {
      onChange(selected.filter((i) => i !== item))
    } else {
      onChange([...selected, item])
    }
  }

  const selectedOptions = options.filter((option) => selected.includes(option.value))

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between text-left font-normal",
            !selected.length && "text-muted-foreground",
            className,
          )}
          disabled={disabled}
        >
          <div className="flex gap-1 flex-wrap">
            {selected.length === 0 && placeholder}
            {selectedOptions.slice(0, 2).map((option) => (
              <Badge
                variant="secondary"
                key={option.value}
                className="mr-1 mb-1"
                onClick={(e) => {
                  e.stopPropagation()
                  handleUnselect(option.value)
                }}
              >
                {option.label}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(option.value)
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    handleUnselect(option.value)
                  }}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            ))}
            {selected.length > 2 && (
              <Badge variant="secondary" className="mr-1 mb-1">
                +{selected.length - 2} 更多
              </Badge>
            )}
          </div>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>未找到选项</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem key={option.value} onSelect={() => handleSelect(option.value)}>
                  <Check
                    className={cn("mr-2 h-4 w-4", selected.includes(option.value) ? "opacity-100" : "opacity-0")}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
