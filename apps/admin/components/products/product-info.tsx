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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/ui/form"
import { TransferList, BaseTransferListItem } from "@repo/ui/components/transfer-list"
import { ImageUploader } from "@repo/ui/components/image-uploader"
import { ImageGallery } from "@repo/ui/components/image-gallery"
import { type Product } from "@/lib/actions/product"
import { type Course } from "@/lib/actions/course"

// 定义包含课程信息的自定义项目类型
type CourseItem = BaseTransferListItem & {
  type: string
  duration: number
}

// 模拟课程数据，实际应用中应该从API获取
const courseOptions: CourseItem[] = [
  { key: "1", label: "篮球基础", type: "体育", duration: 60 },
  { key: "2", label: "英语启蒙", type: "语言", duration: 45 },
  { key: "3", label: "数学思维", type: "学科", duration: 60 },
  { key: "4", label: "音乐欣赏", type: "艺术", duration: 45 },
  { key: "5", label: "编程入门", type: "科技", duration: 90 },
  { key: "6", label: "绘画基础", type: "艺术", duration: 60 },
  { key: "7", label: "科学实验", type: "科学", duration: 75 },
  { key: "8", label: "阅读理解", type: "语言", duration: 45 },
  { key: "9", label: "舞蹈基础", type: "艺术", duration: 60 },
]

// 产品分类选项
const productTypeOptions = [
  { value: "基础课包", label: "基础课包" },
  { value: "课季专享", label: "课季专享" },
  { value: "体验专用", label: "体验专用" },
]

// 计费类型选项
const billingTypeOptions = [
  { value: "按课时", label: "按课时" },
  { value: "按时长", label: "按时长" },
  { value: "不限制", label: "不限制" },
]

// 销售渠道选项
const salesChannelOptions = [
  { value: "网店", label: "网店" },
  { value: "实体店", label: "实体店" },
  { value: "网店、实体店", label: "网店、实体店" },
]

// 产品状态选项
const productStatusOptions = [
  { value: "可用", label: "可用" },
  { value: "停用", label: "停用" },
]

// 表单验证模式
const productEditSchema = z.object({
  id: z.number().optional(),
  name: z.string({
    required_error: "请输入课程包名称",
  }),
  source: z.string({
    required_error: "请输入课程包来源",
  }),
  type: z.string({
    required_error: "请选择课程包分类",
  }),
  price: z.coerce.number({
    required_error: "请输入销售价格",
    invalid_type_error: "请输入有效的价格数字",
  }).min(0, "价格不能为负数"),
  validPeriod: z.coerce.number({
    required_error: "请输入有效期",
    invalid_type_error: "请输入有效的天数",
  }).min(0, "有效期不能为负数"),
  usageLimit: z.string({
    required_error: "请选择计费类型",
  }),
  salesChannel: z.string({
    required_error: "请选择销售渠道",
  }),
  status: z.string({
    required_error: "请选择产品状态",
  }),
  productPictures: z.array(z.string()).optional(),
  includedCourses: z.array(z.object({
    courseId: z.string(),
    courseName: z.string(),
  }), {
    required_error: "请选择包含的课程",
  }).optional(),
})

type ProductFormValues = z.infer<typeof productEditSchema>

export function ProductInfo({ product }: { product?: Product }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productEditSchema),
    defaultValues: {
      id: product?.id,
      name: product?.name || "",
      source: product?.source || "",
      type: product?.type || "",
      price: product?.price || 0,
      validPeriod: product?.validPeriod || 30,
      usageLimit: product?.usageLimit || "",
      salesChannel: product?.salesChannel || "",
      status: product?.status || "可用",
      // Product 类型中没有 productPictures 字段，使用空数组作为默认值
      productPictures: [],
      includedCourses: [],
    },
  })

  // 处理表单提交
  const onSubmit = async (values: ProductFormValues) => {
    try {
      setIsSubmitting(true)
      setError(null)
      console.log("提交的表单数据:", values)
      
      // TODO: 调用API保存数据
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // 成功后返回上一页
      router.back()
    } catch (err) {
      console.error("保存产品信息失败:", err)
      setError(err instanceof Error ? err.message : "保存失败，请稍后重试")
    } finally {
      setIsSubmitting(false)
    }
  }

  // 处理课程选择变化
  const handleCoursesChange = (leftItems: CourseItem[], rightItems: CourseItem[]) => {
    const includedCourses = rightItems.map(item => ({
      courseId: item.key,
      courseName: item.label
    }))
    form.setValue("includedCourses", includedCourses)
  }

  return (
    <Card className="overflow-hidden border border-border/50 shadow-sm transition-all hover:shadow-md">
      <CardHeader className="bg-muted/10 border-b">
        <div className="space-y-1">
          <CardTitle className="text-xl">商品详情</CardTitle>
          <CardDescription className="text-sm">编辑课程包的详细信息和销售数据</CardDescription>
        </div>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {product?.id && <input type="hidden" {...form.register("id")} value={product.id} />}
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name" className="text-sm font-medium">
                      课程包名称
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="请输入课程包名称"
                        className="focus-visible:ring-2 focus-visible:ring-primary/50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="source" className="text-sm font-medium">
                      课程包来源
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="source"
                        placeholder="请输入课程包来源"
                        className="focus-visible:ring-2 focus-visible:ring-primary/50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="type" className="text-sm font-medium">
                      课程包分类
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-primary/50">
                          <SelectValue placeholder="请选择课程包分类" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {productTypeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="price" className="text-sm font-medium">
                      销售价格 (元)
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="price"
                        type="number"
                        placeholder="请输入销售价格"
                        className="focus-visible:ring-2 focus-visible:ring-primary/50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="validPeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="validPeriod" className="text-sm font-medium">
                      有效期 (天)
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="validPeriod"
                        type="number"
                        placeholder="请输入有效期天数，0表示永久有效"
                        className="focus-visible:ring-2 focus-visible:ring-primary/50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="usageLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="usageLimit" className="text-sm font-medium">
                      计费类型
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-primary/50">
                          <SelectValue placeholder="请选择计费类型" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {billingTypeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="salesChannel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="salesChannel" className="text-sm font-medium">
                      销售渠道
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-primary/50">
                          <SelectValue placeholder="请选择销售渠道" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {salesChannelOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="status" className="text-sm font-medium">
                      产品状态
                      <span className="text-destructive ml-1">*</span>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-primary/50">
                          <SelectValue placeholder="请选择产品状态" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {productStatusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="productPictures"
              render={({ field }) => ( 
                <FormItem>
                  <FormLabel htmlFor="productPictures" className="text-sm font-medium">
                    课程包图片
                    <span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <ImageGallery 
                        images={field.value?.map((url, index) => ({ src: url, alt: "课程包图片", id: `${index}` })) || []}
                        gap={4}
                        columns={4}
                        showDeleteButton={true}
                        onImagesChange={(images) => {
                          field.onChange(images?.map(image => image.src))
                        }}
                      />
                      <ImageUploader
                        className="mt-1 focus-visible:ring-2 focus-visible:ring-primary/50"
                        onImageChange={(file) => {
                          if (file) {
                            // 创建临时URL并添加到图片列表
                            const imageUrl = URL.createObjectURL(file);
                            field.onChange([...(field.value || []), imageUrl]);
                          }
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="includedCourses"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="includedCourses" className="text-sm font-medium">
                    包含课程
                    <span className="text-destructive ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <TransferList<CourseItem>
                      items={courseOptions}
                      initialRightItems={courseOptions.filter(item => 
                        form.watch("includedCourses")?.some(course => course.courseId === item.key)
                      )}
                      onChange={handleCoursesChange}
                      titles={["可选课程", "已选课程"]}
                      searchable
                      renderItem={(item: CourseItem) => (
                        <div className="flex flex-col py-1">
                          <span className="font-medium">{item.label}</span>
                          <span className="text-xs text-muted-foreground">
                            {item.type} | {item.duration}分钟
                          </span>
                        </div>
                      )}
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
