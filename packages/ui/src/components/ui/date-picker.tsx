"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@repo/ui/lib/utils"
import { Button } from "@repo/ui/components/ui/button"
import { Calendar } from "@repo/ui/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/ui/popover"

export interface DatePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: Date
  onChange?: (date: Date | undefined) => void
  disabled?: boolean
  placeholder?: string
  fromYear?: number
  toYear?: number
  showYearSelect?: boolean
  className?: string
}

export function DatePicker({
  value,
  onChange,
  disabled = false,
  placeholder = "选择日期",
  fromYear = 1900,
  toYear = new Date().getFullYear() + 10,
  showYearSelect = true,
  className,
  ...props
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className={cn("grid gap-2", className)} {...props}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, "yyyy-MM-dd") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              onChange?.(date)
              setOpen(false)
            }}
            disabled={disabled}
            initialFocus
            fromYear={fromYear}
            toYear={toYear}
            captionLayout={showYearSelect ? "dropdown" : "label"}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}