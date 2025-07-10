"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { Save } from "lucide-react"

import { Button } from "@repo/ui/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/ui/card"
import { Input } from "@repo/ui/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/ui/select"
import { Textarea } from "@repo/ui/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form"
import { ImageGallery } from "@repo/ui/components/image-gallery"
import { ImageUploader } from "@repo/ui/components/image-uploader"
import { type Classroom } from "@/lib/actions/classroom"

const classroomEditSchema = z.object({
  classroomId: z.number().optional(),
  classroomName: z.string({
    required_error: "请输入教室名称",
  }),
  classroomAddr: z.string({
    required_error: "请输入教室地址",
  }),
  classroomArea: z.string({
    required_error: "请输入教室区域",
  }),
  classroomCapacity: z.number({
    required_error: "请输入教室容量",
  }).min(1, "教室容量必须大于0"),
  classroomPictures: z.array(z.string()),
  classroomRemark: z.string().optional(),
  schoolId: z.number({
    required_error: "请选择所属校区",
  }),
  schoolName: z.string().optional(),
})

type ClassroomFormValues = z.infer<typeof classroomEditSchema>

export function ClassroomInfo({ classroom }: { classroom?: Classroom }) {
  const router = useRouter()

  const form = useForm<ClassroomFormValues>({
    resolver: zodResolver(classroomEditSchema),
    defaultValues: {
      classroomId: classroom?.classroomId,
      classroomName: classroom?.classroomName,
      classroomAddr: classroom?.classroomAddr,
      classroomArea: classroom?.classroomArea,
      classroomCapacity: classroom?.classroomCapacity,
      classroomPictures: classroom?.classroomPictures || [],
      classroomRemark: classroom?.classroomRemark,
      schoolId: classroom?.schoolId,
      schoolName: classroom?.schoolName,
    },
  })
  
  const submit = form.handleSubmit(async (data) => {
    // 这里可以添加提交逻辑，例如调用API保存数据
    console.log("提交的数据:", data)
    router.back()
  })

  return (
    <Card className="overflow-hidden border border-border/50 shadow-sm transition-all hover:shadow-md">
      <CardHeader className="bg-muted/10 border-b">
        <div className="space-y-1">
          <CardTitle className="text-xl">教室信息</CardTitle>
          <CardDescription>
            管理教室基本信息，包括名称、地址、容量等
          </CardDescription>
        </div>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={submit}>
          <input type="hidden" {...form.register("classroomId")} value={classroom?.classroomId} />
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="classroomName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="classroomName" className="text-sm font-medium">
                      教室名称
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="classroomName"
                        placeholder="请输入教室名称"
                        {...field}
                        className="focus-visible:ring-2 focus-visible:ring-primary/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="schoolId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="schoolId" className="text-sm font-medium">
                      所属校区
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value?.toString()}
                        onValueChange={(value) => field.onChange(parseInt(value))}
                      >
                        <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-primary/50">
                          <SelectValue placeholder="请选择所属校区" />
                        </SelectTrigger>
                        <SelectContent>
                          {/* 这里可以动态加载校区列表 */}
                          <SelectItem value="1">总校区</SelectItem>
                          <SelectItem value="2">北校区</SelectItem>
                          <SelectItem value="3">南校区</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="classroomAddr"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="classroomAddr" className="text-sm font-medium">
                      教室地址
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="classroomAddr"
                        placeholder="请输入教室地址"
                        {...field}
                        className="focus-visible:ring-2 focus-visible:ring-primary/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="classroomArea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="classroomArea" className="text-sm font-medium">
                      教室区域
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="classroomArea"
                        placeholder="请输入教室区域"
                        {...field}
                        className="focus-visible:ring-2 focus-visible:ring-primary/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="classroomCapacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="classroomCapacity" className="text-sm font-medium">
                      教室容量
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="classroomCapacity"
                        type="number"
                        placeholder="请输入教室容量"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        className="focus-visible:ring-2 focus-visible:ring-primary/50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="classroomRemark"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="classroomRemark" className="text-sm font-medium">
                    备注
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      id="classroomRemark"
                      placeholder="请输入备注信息"
                      {...field}
                      className="min-h-[120px] focus-visible:ring-2 focus-visible:ring-primary/50"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="classroomPictures"
              render={({ field }) => ( 
                <FormItem>
                  <FormLabel htmlFor="classroomPictures" className="text-sm font-medium">
                    教室图片
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <ImageGallery 
                        images={field.value.map((url, index) => ({ src: url, alt: "教室图片", id: `${index}` }))}
                        gap={4}
                        columns={4}
                        showDeleteButton={true}
                        onImagesChange={(images) => {
                          field.onChange(images.map(image => image.src))
                        }}
                      />
                      <ImageUploader
                        className="mt-1 focus-visible:ring-2 focus-visible:ring-primary/50"
                        onImageChange={field.onChange}
                      />
                    </div>
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
              disabled={form.formState.isSubmitting}
              className="border-border/50 hover:border-foreground/50"
            >
              取消
            </Button>
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90 transition-colors shadow-sm hover:shadow"
              disabled={form.formState.isSubmitting}
            >
              <Save className="mr-2 h-4 w-4" />
              保存更改
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}