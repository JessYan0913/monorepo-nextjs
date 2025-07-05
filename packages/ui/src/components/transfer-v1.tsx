"use client"

import { createContext, useContext, useState, useMemo, ReactNode } from "react"
import { Card } from "@repo/ui/components/ui/card"
import { cn } from "@repo/ui/lib/utils"
import { Input } from "@repo/ui/components/ui/input"
import { ScrollArea } from "@repo/ui/components/ui/scroll-area"
import { Checkbox } from "@repo/ui/components/ui/checkbox"

// Create a context for the current side
const TransferSideContext = createContext<TransferSide>('left')

// Helper hook to use the side context
const useTransferSide = () => {
  const contextSide = useContext(TransferSideContext)
  return contextSide || 'left'
}

export interface TransferProps<T> {
  options: T[]
  values: T[]
  onChange: (values: T[]) => void
  getValue: (item: T) => string
  children: React.ReactNode
}

export interface TransferContextValue<T> {
  options: T[]
  values: T[]
  onChange: (values: T[]) => void
  getValue: (item: T) => string
  leftSearch: string
  rightSearch: string
  setLeftSearch: (val: string) => void
  setRightSearch: (val: string) => void
  leftSelected: Set<string>
  rightSelected: Set<string>
  toggleLeftSelect: (id: string, checked: boolean) => void
  toggleRightSelect: (id: string, checked: boolean) => void
}

export type TransferSide = 'left' | 'right'

export const TransferContext = createContext<TransferContextValue<any> | null>(null)

export function useTransferContext<T>() {
  const ctx = useContext(TransferContext)
  if (!ctx) throw new Error("Transfer components must be used inside <Transfer>")
  return ctx as TransferContextValue<T>
}

export function Transfer<T>({
  options,
  values,
  onChange,
  getValue,
  children,
}: TransferProps<T>) {
  const [leftSearch, setLeftSearch] = useState("")
  const [rightSearch, setRightSearch] = useState("")
  const [leftSelected, setLeftSelected] = useState<Set<string>>(new Set())
  const [rightSelected, setRightSelected] = useState<Set<string>>(new Set())

  const ctxValue = useMemo(
    () => ({
      options,
      values,
      onChange,
      getValue,
      leftSearch,
      rightSearch,
      setLeftSearch,
      setRightSearch,
      leftSelected,
      rightSelected,
      toggleLeftSelect: (id: string, checked: boolean) => {
        setLeftSelected((prev) => {
          const set = new Set(prev)
          if (checked) {
            set.add(id)
          } else {
            set.delete(id)
          }
          return set
        })
      },
      toggleRightSelect: (id: string, checked: boolean) => {
        setRightSelected((prev) => {
          const set = new Set(prev)
          if (checked) {
            set.add(id)
          } else {
            set.delete(id)
          }
          return set
        })
      }
    }),
    [options, values, onChange, getValue, leftSearch, rightSearch, leftSelected, rightSelected]
  )

  return <TransferContext.Provider value={ctxValue}>{children}</TransferContext.Provider>
}

interface TransferPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: TransferSide
  children: ReactNode
}

export function TransferPanel({ className, side = 'left', children, ...props }: TransferPanelProps) {
  return (
    <TransferSideContext.Provider value={side}>
      <Card className={cn("w-64 p-2", className)} {...props}>
        {children}
      </Card>
    </TransferSideContext.Provider>
  )
}

export function TransferInput() {
  const ctx = useTransferContext()
  const side = useTransferSide()
  const val = side === "left" ? ctx.leftSearch : ctx.rightSearch
  const setVal = side === "left" ? ctx.setLeftSearch : ctx.setRightSearch

  return <Input placeholder="搜索..." value={val} onChange={(e) => setVal(e.target.value)} />
}

export function TransferContent({ children }: { children: (props: { item: any, selected: Set<string>, toggle: (id: string, checked: boolean) => void }) => React.ReactNode }) {
  const ctx = useTransferContext()
  const side = useTransferSide()
  const data = side === "left"
    ? ctx.options.filter((item) => !ctx.values.some((v) => ctx.getValue(v) === ctx.getValue(item)))
    : ctx.values

  const filtered = data.filter((item) => {
    const text = JSON.stringify(item).toLowerCase()
    const keyword = (side === "left" ? ctx.leftSearch : ctx.rightSearch).toLowerCase()
    return text.includes(keyword)
  })

  return (
    <ScrollArea className="h-64 mt-2">
      {filtered.map((item) => (
        <div key={ctx.getValue(item)}>
          {
            children({
            item,
            selected: side === "left" ? ctx.leftSelected : ctx.rightSelected,
            toggle: side === "left" ? ctx.toggleLeftSelect : ctx.toggleRightSelect
            })
          }
        </div>
      ))}
    </ScrollArea>
  )
}

export function TransferControl({ side, children }: { side: TransferSide; children: React.ReactNode }) {
  const ctx = useTransferContext()

  const moveRight = () => {
    const toAdd = ctx.options.filter((item) => ctx.leftSelected.has(ctx.getValue(item)))
    ctx.onChange([...ctx.values, ...toAdd])
  }

  const moveLeft = () => {
    const toRemove = new Set(ctx.rightSelected)
    ctx.onChange(ctx.values.filter((item) => !toRemove.has(ctx.getValue(item))))
  }

  return (
    <div onClick={() => side === "left" ? moveRight() : moveLeft()}>
      {children}
    </div>
  )
}
