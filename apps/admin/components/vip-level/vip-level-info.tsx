"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Save } from "lucide-react"

import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Textarea } from "@repo/ui/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form"
import { type VipLevel } from "@/lib/actions/vip-level"
import { updateVipLevel } from "@/lib/actions/vip-level"

// Define the form schema for VIP level editing
const vipLevelEditSchema = z.object({
  id: z.number(),
  level: z.number(),
  consumptionAmount: z.number({
    required_error: "请输入累计消费金额",
  }).min(0, "累计消费金额不能为负数"),
  discountPercentage: z.number({
    required_error: "请输入折扣百分比",
  }).min(1, "折扣百分比必须大于0").max(100, "折扣百分比不能超过100"),
  benefitsDescription: z.string({
    required_error: "请输入会员权益描述",
  }),
})

type VipLevelFormValues = z.infer<typeof vipLevelEditSchema>

export function VipLevelInfo({ vipLevel }: { vipLevel?: VipLevel }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const form = useForm<VipLevelFormValues>({
    resolver: zodResolver(vipLevelEditSchema),
    defaultValues: {
      id: vipLevel?.id,
      level: vipLevel?.level,
      consumptionAmount: vipLevel?.consumptionAmount,
      discountPercentage: vipLevel?.discountPercentage,
      benefitsDescription: vipLevel?.benefitsDescription || "",
    },
  })
  
  const submit = form.handleSubmit(async (data) => {
    setIsSubmitting(true)
    setError(null)
    
    try {
      // Call the update API
      await updateVipLevel({
        id: data.id,
        level: data.level,
        consumptionAmount: data.consumptionAmount,
        discountPercentage: data.discountPercentage,
        benefitsDescription: data.benefitsDescription,
      })
      
      // Navigate back on success
      router.back()
      router.refresh()
    } catch (err) {
      setError("更新VIP等级信息失败，请稍后重试")
      console.error("Failed to update VIP level:", err)
    } finally {
      setIsSubmitting(false)
    }
  })

  return (
    <Card className="overflow-hidden border border-border/50 shadow-sm transition-all hover:shadow-md">
      <CardHeader className="bg-muted/10 border-b">
        <div className="space-y-1">
          <CardTitle className="text-xl">VIP等级信息</CardTitle>
          <CardDescription>编辑VIP等级信息及权益</CardDescription>
        </div>
      </CardHeader>
      
      <Form {...form}>
        <form onSubmit={submit} className="space-y-6">
          <CardContent className="space-y-6 pt-6">
            {/* Display error message if any */}
            {error && (
              <div className="p-3 text-sm rounded-md bg-destructive/15 text-destructive">
                {error}
              </div>
            )}
            
            {/* ID field - read only */}
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="id" className="text-sm font-medium">
                    VIP等级ID
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="id"
                      placeholder="VIP等级ID"
                      {...field}
                      value={field.value?.toString() || ""}
                      disabled={true}
                      className="bg-muted/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Level field - read only */}
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="level" className="text-sm font-medium">
                    VIP等级
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="level"
                      placeholder="VIP等级"
                      {...field}
                      value={field.value?.toString() || ""}
                      disabled={true}
                      className="bg-muted/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Consumption Amount field */}
            <FormField
              control={form.control}
              name="consumptionAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="consumptionAmount" className="text-sm font-medium">
                    累计消费金额
                    <span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="consumptionAmount"
                      placeholder="请输入达到此等级所需的累计消费金额"
                      {...field}
                      value={field.value?.toString() || ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      type="number"
                      min={0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Discount Percentage field */}
            <FormField
              control={form.control}
              name="discountPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="discountPercentage" className="text-sm font-medium">
                    折扣百分比
                    <span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="discountPercentage"
                      placeholder="请输入折扣百分比（如95表示95折，即5%的折扣）"
                      {...field}
                      value={field.value?.toString() || ""}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      type="number"
                      min={1}
                      max={100}
                    />
                  </FormControl>
                  <p className="text-xs text-muted-foreground mt-1">
                    例如：95表示95%的原价，即5%的折扣
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Benefits Description field */}
            <FormField
              control={form.control}
              name="benefitsDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="benefitsDescription" className="text-sm font-medium">
                    会员权益描述
                    <span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      id="benefitsDescription"
                      placeholder="请输入此VIP等级的会员权益描述"
                      className="min-h-[120px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          
          <CardFooter className="flex flex-col sm:flex-row justify-end gap-3 px-6 py-4 border-t bg-muted/10">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => router.back()}
              disabled={isSubmitting}
              className="border-border/50 hover:border-foreground/50"
            >
              取消
            </Button>
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90 transition-colors shadow-sm hover:shadow"
              disabled={isSubmitting}
            >
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? '保存中...' : '保存更改'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}