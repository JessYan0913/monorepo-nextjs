"use client"

import { createContext, useContext, useState, useMemo } from "react"
import { Card } from "@repo/ui/components/ui/card"
import { cn } from "@repo/ui/lib/utils"
import { Input } from "@repo/ui/components/ui/input"
import { ScrollArea } from "@repo/ui/components/ui/scroll-area"
import { Checkbox } from "@repo/ui/components/ui/checkbox"
import { Button } from "@repo/ui/components/ui/button"

export interface TransferProps<T> {
  options: T[]
  values: T[]
  onChange: (values: T[]) => void
  getValue: (item: T) => string
  renderItem?: (item: T, checked: boolean) => React.ReactNode
  children: React.ReactNode
}

export interface TransferContextValue<T> {
  options: T[]
  values: T[]
  onChange: (values: T[]) => void
  getValue: (item: T) => string
  renderItem: (item: T, checked: boolean) => React.ReactNode
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
  renderItem = (item) => <div>{String(getValue(item))}</div>,
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
      renderItem,
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
    [options, values, onChange, getValue, renderItem, leftSearch, rightSearch, leftSelected, rightSelected]
  )

  return <TransferContext.Provider value={ctxValue}>{children}</TransferContext.Provider>
}

export function TransferPanel({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  return <Card className={cn("w-64 p-2", className)}>{children}</Card>
}

export function TransferInput({ side = "left" }: { side?: TransferSide }) {
  const ctx = useTransferContext()
  const val = side === "left" ? ctx.leftSearch : ctx.rightSearch
  const setVal = side === "left" ? ctx.setLeftSearch : ctx.setRightSearch

  return <Input placeholder="搜索..." value={val} onChange={(e) => setVal(e.target.value)} />
}

export function TransferContent({ side = "left" }: { side?: TransferSide }) {
  const ctx = useTransferContext()
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
        <TransferItem key={ctx.getValue(item)} item={item} side={side} />
      ))}
    </ScrollArea>
  )
}

export function TransferItem<T>({ item, side }: { item: T; side: TransferSide }) {
  const ctx = useTransferContext<T>()
  const id = ctx.getValue(item)
  const selected = side === "left" ? ctx.leftSelected.has(id) : ctx.rightSelected.has(id)
  const toggle = side === "left" ? ctx.toggleLeftSelect : ctx.toggleRightSelect

  return (
    <div className="flex items-center gap-2 px-2 py-1">
      <Checkbox checked={selected} onCheckedChange={(c) => toggle(id, !!c)} />
      {ctx.renderItem(item, selected)}
    </div>
  )
}


export function TransferControl() {
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
    <div className="flex flex-col justify-center gap-2">
      <Button onClick={moveRight} disabled={ctx.leftSelected.size === 0}>→</Button>
      <Button onClick={moveLeft} disabled={ctx.rightSelected.size === 0}>←</Button>
    </div>
  )
}
